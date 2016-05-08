<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateTasksAPIRequest;
use App\Http\Requests\API\UpdateTasksAPIRequest;
use App\Models\Tasks;
use App\Repositories\TasksRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use InfyOm\Generator\Utils\ResponseUtil;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class TasksController
 * @package App\Http\Controllers\API
 */

class TasksAPIController extends AppBaseController
{
    /** @var  TasksRepository */
    private $tasksRepository;

    public function __construct(TasksRepository $tasksRepo)
    {
        $this->tasksRepository = $tasksRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/tasks",
     *      summary="Get a listing of the Tasks.",
     *      tags={"Tasks"},
     *      description="Get all Tasks",
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
     *                  @SWG\Items(ref="#/definitions/Tasks")
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
        $this->tasksRepository->pushCriteria(new RequestCriteria($request));
        $this->tasksRepository->pushCriteria(new LimitOffsetCriteria($request));
        $tasks = $this->tasksRepository->with(['assignee'])->all();

        return $this->sendResponse($tasks->toArray(), 'Tasks retrieved successfully');
    }

    /**
     * @param CreateTasksAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/tasks",
     *      summary="Store a newly created Tasks in storage",
     *      tags={"Tasks"},
     *      description="Store Tasks",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Tasks that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Tasks")
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
     *                  ref="#/definitions/Tasks"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateTasksAPIRequest $request)
    {
        $input = $request->all();

        $tasks = $this->tasksRepository->create($input);

        return $this->sendResponse($tasks->toArray(), 'Tasks saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/tasks/{id}",
     *      summary="Display the specified Tasks",
     *      tags={"Tasks"},
     *      description="Get Tasks",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Tasks",
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
     *                  ref="#/definitions/Tasks"
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
        /** @var Tasks $tasks */
        $tasks = $this->tasksRepository->find($id);

        if (empty($tasks)) {
            return Response::json(ResponseUtil::makeError('Tasks not found'), 400);
        }

        return $this->sendResponse($tasks->toArray(), 'Tasks retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateTasksAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/tasks/{id}",
     *      summary="Update the specified Tasks in storage",
     *      tags={"Tasks"},
     *      description="Update Tasks",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Tasks",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Tasks that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Tasks")
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
     *                  ref="#/definitions/Tasks"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateTasksAPIRequest $request)
    {
        $input = $request->all();

        /** @var Tasks $tasks */
        $tasks = $this->tasksRepository->find($id);

        if (empty($tasks)) {
            return Response::json(ResponseUtil::makeError('Tasks not found'), 400);
        }

        $tasks = $this->tasksRepository->update($input, $id);

        return $this->sendResponse($tasks->toArray(), 'Tasks updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/tasks/{id}",
     *      summary="Remove the specified Tasks from storage",
     *      tags={"Tasks"},
     *      description="Delete Tasks",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Tasks",
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
        /** @var Tasks $tasks */
        $tasks = $this->tasksRepository->find($id);

        if (empty($tasks)) {
            return Response::json(ResponseUtil::makeError('Tasks not found'), 400);
        }

        $tasks->delete();

        return $this->sendResponse($id, 'Tasks deleted successfully');
    }
}
