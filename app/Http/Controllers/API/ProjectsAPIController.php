<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateProjectsAPIRequest;
use App\Http\Requests\API\UpdateProjectsAPIRequest;
use App\Models\Tasks;
use App\Models\Projects;
use App\Models\Users;
use App\Repositories\ProjectsRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use InfyOm\Generator\Utils\ResponseUtil;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;
use Illuminate\Support\Facades\Auth;

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
        $user = Auth::user();
        
        if($user->isAdmin){
            $projects = $this->projectsRepository->orderBy('order_by')->withTrashed(true)->with(['comments','users','comments.files','tasks','tasks.assignee','tasks.users'])->all();
        }else{
            //$usersRespository = new \App\Repositories\UsersRepository();

            $project_keys = Users::find($user->id)->projects->pluck('id');
            $projects = $this->projectsRepository->orderBy('order_by')->withTrashed(true)->with(['comments','users','comments.files','tasks','tasks.assignee','tasks.users'])->findWhereIn('id',$project_keys->toArray());
        }

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

        $current_user = Auth::user();
        $projects = $this->projectsRepository->create($input)->users()->save($current_user);
        //$user = Auth::user();

        //Users::find($user->id)->projects()->save();
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
        $projects = $this->projectsRepository->with(['tasks','tasks.users','comments','users','times'])->find($id);

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

        /** @var Projects $project */
        $project = $this->projectsRepository->find($id);
        $currentUsers = $project->users()->get();

        /**
         * todo:
         *          move to repository
         *          move to another method.
         **/

        // parse the incoming users against the existing users and sync
        foreach($request['users'] as $user){
            if(array_key_exists($user['id'], $currentUsers->toArray())){
                $project->users()->attach($user['id']);
            }
        }



        if (empty($project)) {
            return Response::json(ResponseUtil::makeError('Project not found'), 400);
        }

        $project = $this->projectsRepository->update($input, $id);

       //Mail::send($view,$data,function($message){
       //    $message->to('foo@example.com', 'John Smith')->subject('Welcome!');
       //});

        return $this->sendResponse($project->toArray(), 'Projects updated successfully');
    }


    public function userAdd($id, UpdateProjectsAPIRequest $request)
    {
        $input = $request->all();

        /** @var Projects $projects */
        $projects = $this->projectsRepository->find($id);

        if (empty($projects)) {
            return Response::json(ResponseUtil::makeError('Project not found'), 400);
        }

        $projects->users()->attach(
            $request['id']
        );

        return $this->sendResponse(1, 'Projects updated successfully');
    }


    public function userDelete($id, UpdateProjectsAPIRequest $request)
    {
        $input = $request->all();

        /** @var Projects $projects */
        $projects = $this->projectsRepository->find($id);

        if (empty($projects)) {
            return Response::json(ResponseUtil::makeError('Projects not found'), 400);
        }


        $projects->users()->detach(
            $request['id']
        );


        return $this->sendResponse(1, 'Projects updated successfully');
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
            return Response::json(ResponseUtil::makeError('Project not found'), 400);
        }

        $projects->delete();

        return $this->sendResponse($projects, 'Project archived successfully');
    }
    
    public function forceDestroy($id){
        $projects = $this->projectsRepository->withTrashed(true)->find($id);

        if(empty($projects)){
            return Response::json(ResponseUtil::makeError('Project not found'),400);
        }

        $projects->forceDelete();

        return $this->sendResponse($projects,'Project deleted successfully');
    }
    
    public function restore($id){
        $projects = $this->projectsRepository->withTrashed(true)->find($id);

        //$projects = $this->projectsRepository->orderBy('order_by')->withTrashed(true)->with(['comments','tasks','tasks.assignee'])->find($id);
        
        $projects->restore();
        
        return $this->sendResponse($projects,'Project Restored');
    }
}
