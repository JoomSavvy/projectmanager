<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateProjectsAPIRequest;
use App\Http\Requests\API\UpdateProjectsAPIRequest;
//use App\Models\Projects;
use App\Models\Tasks;
use App\Models\Projects;
use App\Repositories\ProjectsRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use InfyOm\Generator\Utils\ResponseUtil;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class ProjectsController
 * @package App\Http\Controllers\API
 */

class ProjectsAPIController extends AppBaseController
{
    /** @var  ProjectsRepository */
    private $projectsRepository;

    public function __construct(ProjectsRepository $projectsRepo)
    {
        $this->middleware('jwt.auth');
        $this->projectsRepository = $projectsRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/projects",
     *      summary="Get a listing of the Projects.",
     *      tags={"Projects"},
     *      description="Get all Projects",
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
     *                  @SWG\Items(ref="#/definitions/Projects")
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
        $this->projectsRepository->pushCriteria(new RequestCriteria($request));
        $this->projectsRepository->pushCriteria(new LimitOffsetCriteria($request));
        $projects = $this->projectsRepository->orderBy('order_by')->withTrashed(true)->with(['comments','tasks','tasks.assignee'])->all();

        return $this->sendResponse($projects->toArray(), 'Projects retrieved successfully');
    }

    /**
     * @param CreateProjectsAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/projects",
     *      summary="Store a newly created Projects in storage",
     *      tags={"Projects"},
     *      description="Store Projects",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Projects that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Projects")
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
     *                  ref="#/definitions/Projects"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateProjectsAPIRequest $request)
    {
        $input = $request->all();

        $projects = $this->projectsRepository->create($input);

        return $this->sendResponse($projects->toArray(), 'Projects saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/projects/{id}",
     *      summary="Display the specified Projects",
     *      tags={"Projects"},
     *      description="Get Projects",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Projects",
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
     *                  ref="#/definitions/Projects"
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
        /** @var Projects $projects */
        $projects = $this->projectsRepository->with(['tasks','comments'])->find($id);

        if (empty($projects)) {
            return Response::json(ResponseUtil::makeError('Projects not found'), 400);
        }

        return $this->sendResponse($projects->toArray(), 'Projects retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateProjectsAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/projects/{id}",
     *      summary="Update the specified Projects in storage",
     *      tags={"Projects"},
     *      description="Update Projects",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Projects",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Projects that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Projects")
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
     *                  ref="#/definitions/Projects"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateProjectsAPIRequest $request)
    {
        $input = $request->all();

        /** @var Projects $projects */
        $projects = $this->projectsRepository->find($id);

        if (empty($projects)) {
            return Response::json(ResponseUtil::makeError('Projects not found'), 400);
        }

        $projects = $this->projectsRepository->update($input, $id);

        return $this->sendResponse($projects->toArray(), 'Projects updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/projects/{id}",
     *      summary="Remove the specified Projects from storage",
     *      tags={"Projects"},
     *      description="Delete Projects",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Projects",
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
        /** @var Projects $projects */
        $projects = $this->projectsRepository->find($id);

        if (empty($projects)) {
            return Response::json(ResponseUtil::makeError('Projects not found'), 400);
        }

        $projects->delete();

        return $this->sendResponse($id, 'Projects deleted successfully');
    }
}
