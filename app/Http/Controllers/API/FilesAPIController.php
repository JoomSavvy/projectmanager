<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateFilesAPIRequest;
use App\Http\Requests\API\UpdateFilesAPIRequest;
use App\Models\Files;
use App\Repositories\FilesRepository;

use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use InfyOm\Generator\Utils\ResponseUtil;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class CommentsController
 * @package App\Http\Controllers\API
 */

class FilesAPIController extends AppBaseController
{
    /** @var  FilesRepository */
    private $filesRepository;

    public function __construct(FilesRepository $filesRepo)
    {
        $this->middleware('jwt.auth',['except'=>['show']]);
        $this->filesRepository = $filesRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/files",
     *      summary="Get a listing of the Files.",
     *      tags={"Files"},
     *      description="Get all Files",
     *      produces={"application/json"},
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="array",
     *                  @SWG\Items(ref="#/definitions/Files")
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function index(Request $request)
    {
        $this->filesRepository->pushCriteria(new RequestCriteria($request));
        $this->filesRepository->pushCriteria(new LimitOffsetCriteria($request));
        $files = $this->filesRepository->all();

        return $this->sendResponse($files->toArray(), 'Files retrieved successfully');
    }

    /**
     * @param CreateFilesAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/files",
     *      summary="Store a newly created Files in storage",
     *      tags={"Files"},
     *      description="Store Files",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Files that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Files")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Files"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateFilesAPIRequest $request)
    {
        $input = $request->all();

        $files = $this->filesRepository->create($input);

        $files::notify($files);

        return $this->sendResponse($files->toArray(), 'Files saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/files/{id}",
     *      summary="Display the specified Files",
     *      tags={"Files"},
     *      description="Get Files",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Files",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Files"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function show($id)
    {
        /** @var Files $files */
        $file = $this->filesRepository->download($id);

        if (empty($file)) {
            return Response::json(ResponseUtil::makeError('Files not found'), 400);
        }
        
        return Response::download($file['path'],$file['filename'],['Content-Type'=>$file['mimetype']]);
        //return (new Response($file, 200))
        //    ->header('Content-Type', $file->mimeType());
    }

    /**
     * @param int $id
     * @param UpdateFilesAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/files/{id}",
     *      summary="Update the specified Files in storage",
     *      tags={"Files"},
     *      description="Update Files",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Files",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Files that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Files")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Files"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateFilesAPIRequest $request)
    {
        $input = $request->all();

        /** @var Files $files */
        $files = $this->filesRepository->find($id);

        if (empty($files)) {
            return Response::json(ResponseUtil::makeError('Files not found'), 400);
        }

        $files = $this->filesRepository->update($input, $id);

        return $this->sendResponse($files->toArray(), 'Files updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/files/{id}",
     *      summary="Remove the specified Files from storage",
     *      tags={"Files"},
     *      description="Delete Files",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Files",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="string"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function destroy($id)
    {
        /** @var Files $files */
        $files = $this->filesRepository->find($id);

        if (empty($files)) {
            return Response::json(ResponseUtil::makeError('Files not found'), 400);
        }

        $files->delete();

        return $this->sendResponse($id, 'Files deleted successfully');
    }
}
