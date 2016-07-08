<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateTimersAPIRequest;
use App\Http\Requests\API\UpdateTimersAPIRequest;
use App\Models\Timers;
use App\Repositories\TimersRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use InfyOm\Generator\Utils\ResponseUtil;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

use Illuminate\Foundation\Auth\ResetsPasswords;

/**
 * Class TimersController
 * @package App\Http\Controllers\API
 */

class TimersAPIController extends AppBaseController
{
    use ResetsPasswords;

    /** @var  TimersRepository */
    private $timersRepository;

    public function __construct(TimersRepository $timersRepo)
    {
        $this->middleware('jwt.auth');
        $this->timersRepository = $timersRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/timers",
     *      summary="Get a listing of the Timers.",
     *      tags={"Timers"},
     *      description="Get all Timers",
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
     *                  @SWG\Items(ref="#/definitions/Timers")
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
        $this->timersRepository->pushCriteria(new RequestCriteria($request));
        $this->timersRepository->pushCriteria(new LimitOffsetCriteria($request));
        $timers = $this->timersRepository->all();

        return $this->sendResponse($timers->toArray(), 'Timers retrieved successfully');
    }

    /**
     * @param CreateTimersAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/timers",
     *      summary="Store a newly created Timers in storage",
     *      tags={"Timers"},
     *      description="Store Timers",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Timers that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Timers")
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
     *                  ref="#/definitions/Timers"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateTimersAPIRequest $request)
    {
        $input = $request->all();

        $timers = $this->timersRepository->create($input);

        $this->postEmail($request);

        return $this->sendResponse($timers->toArray(), 'Timers saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/timers/{id}",
     *      summary="Display the specified Timers",
     *      tags={"Timers"},
     *      description="Get Timers",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Timers",
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
     *                  ref="#/definitions/Timers"
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
        /** @var Timers $timers */
        $timers = $this->timersRepository->find($id);

        if (empty($timers)) {
            return Response::json(ResponseUtil::makeError('Timers not found'), 400);
        }

        return $this->sendResponse($timers->toArray(), 'Timers retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateTimersAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/timers/{id}",
     *      summary="Update the specified Timers in storage",
     *      tags={"Timers"},
     *      description="Update Timers",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Timers",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Timers that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Timers")
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
     *                  ref="#/definitions/Timers"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateTimersAPIRequest $request)
    {
        $input = $request->all();

        /** @var Timers $timers */
        $timers = $this->timersRepository->find($id);

        if (empty($timers)) {
            return Response::json(ResponseUtil::makeError('Timers not found'), 400);
        }

        $timers = $this->timersRepository->update($input, $id);

        return $this->sendResponse($timers->toArray(), 'Timers updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/timers/{id}",
     *      summary="Remove the specified Timers from storage",
     *      tags={"Timers"},
     *      description="Delete Timers",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Timers",
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
        /** @var Timers $timers */
        $timers = $this->timersRepository->find($id);

        if (empty($timers)) {
            return Response::json(ResponseUtil::makeError('Timers not found'), 400);
        }

        $timers->delete();

        return $this->sendResponse($id, 'Timers deleted successfully');
    }
}
