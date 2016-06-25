<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Tasks",
 *      required={},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="project_id",
 *          description="project_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="created_at",
 *          description="created_at",
 *          type="string",
 *          format="date-time"
 *      ),
 *      @SWG\Property(
 *          property="updated_at",
 *          description="updated_at",
 *          type="string",
 *          format="date-time"
 *      ),
 *      @SWG\Property(
 *          property="order_by",
 *          description="order_by",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="user_id",
 *          description="user_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="assigned_to",
 *          description="assigned_to",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="priority",
 *          description="priority",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="deliverable",
 *          description="deliverable",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="delivered",
 *          description="delivered",
 *          type="string"
 *      )
 * )
 */
class Tasks extends Model
{
    use SoftDeletes;

    public $table = 'tasks';
    

    protected $dates = ['deleted_at'];


    public $fillable = [
        'project_id',
        'order_by',
        'user_id',
        'assigned_to',
        'priority',
        'deliverable',
        'delivered'
    ];


    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'project_id' => 'integer',
        'order_by' => 'integer',
        'user_id' => 'integer',
        'assigned_to' => 'integer',
        'priority' => 'integer',
        'deliverable' => 'string',
        'delivered' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];

    public function project(){
        return $this->belongsTo('App\Models\Projects');
    }

    public function assignee(){ 
        return $this->belongsTo('App\Models\Users','assigned_to');
    }

    public function users(){
        return $this->belongsToMany('App\Models\Users','users_tasks','task_id','user_id');
    }
}