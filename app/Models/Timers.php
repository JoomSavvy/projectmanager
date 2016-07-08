<?php

namespace App\Models;

use Eloquent as Model;
//use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Users",
 *      required={},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="name",
 *          description="name",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="email",
 *          description="email",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="password",
 *          description="password",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="remember_token",
 *          description="remember_token",
 *          type="string"
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
 *      )
 * )
 */
class Timers extends Model
{
    //use SoftDeletes;

    public $table = 'timers';
    

    //protected $dates = ['deleted_at'];


    public $fillable = [
        "id",
        "date",
        "start",
        "end",
        "updated_at"
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];
    
    public function projects(){
        return $this->belongsToMany('App\Models\Projects','projects_timers','timer_id','project_id');
    }

   //public function tasks(){
   //    return $this->belongsToMany('App\Models\Tasks','tasks_timers',timer_id','task_id');
   //}
}