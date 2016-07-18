<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateTimesAPIRequest;
use App\Http\Requests\API\UpdateTimesAPIRequest;
use App\Models\Times;
use App\Repositories\TimesRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use InfyOm\Generator\Utils\ResponseUtil;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class TimesController
 * @package App\Http\Controllers\API
 */

class TimesAPIController extends AppBaseController
{
    /** @var  TimesRepository */
    private $timesRepository;

    public function __construct(TimesRepository $timesRepo)
    {
        $this->middleware('jwt.auth');
        $this->timesRepository = $timesRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/times",
     *      summary="Get a listing of the Times.",
     *      tags={"Times"},
     *      description="Get all Times",
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
     *                  @SWG\Items(ref="#/definitions/Times")
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
        $this->timesRepository->pushCriteria(new RequestCriteria($request));
        $this->timesRepository->pushCriteria(new LimitOffsetCriteria($request));
        $times = $this->timesRepository->all();

        return $this->sendResponse($times->toArray(), 'Times retrieved successfully');
    }

    /**
     * @param CreateTimesAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/times",
     *      summary="Store a newly created Times in storage",
     *      tags={"Times"},
     *      description="Store Times",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Times that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Times")
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
     *                  ref="#/definitions/Times"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateTimesAPIRequest $request)
    {
        $input = $request->all();

        $times = $this->timesRepository->create($input);

        return $this->sendResponse($times->toArray(), 'Times saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/times/{id}",
     *      summary="Display the specified Times",
     *      tags={"Times"},
     *      description="Get Times",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Times",
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
     *                  ref="#/definitions/Times"
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
        /** @var Times $times */
        $times = $this->timesRepository->find($id);

        if (empty($times)) {
            return Response::json(ResponseUtil::makeError('Times not found'), 400);
        }

        return $this->sendResponse($times->toArray(), 'Times retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateTimesAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/times/{id}",
     *      summary="Update the specified Times in storage",
     *      tags={"Times"},
     *      description="Update Times",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Times",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Times that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Times")
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
     *                  ref="#/definitions/Times"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateTimesAPIRequest $request)
    {
        $input = $request->all();

        /** @var Times $times */
        $times = $this->timesRepository->find($id);

        if (empty($times)) {
            return Response::json(ResponseUtil::makeError('Times not found'), 400);
        }

        $times = $this->timesRepository->update($input, $id);

        return $this->sendResponse($times->toArray(), 'Times updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/times/{id}",
     *      summary="Remove the specified Times from storage",
     *      tags={"Times"},
     *      description="Delete Times",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Times",
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
        /** @var Times $times */
        $times = $this->timesRepository->find($id);

        if (empty($times)) {
            return Response::json(ResponseUtil::makeError('Times not found'), 400);
        }

        $times->delete();

        return $this->sendResponse($id, 'Times deleted successfully');
    }
}
