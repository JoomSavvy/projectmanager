<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Projects",
 *      required={},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
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
 *          property="description",
 *          description="description",
 *          type="string"
 *      )
 * )
 */
class Projects extends Model
{
    use SoftDeletes;

    public $table = 'projects';
    

    protected $dates = ['deleted_at'];


    public $fillable = [
        'description',
        'order_by',
        'summary',
        'user_id',
        'state'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'=>'integer',
        'description' => 'string',
        'order_by'=>'integer',
        'state'=>'integer'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];

    public function tasks(){
        return $this->hasMany('App\Models\Tasks','project_id')->orderBy('id','DESC');
    }

    public function comments(){
        return $this->hasMany('App\Models\Comments','project_id')->orderBy('id','DESC');
    }

    public function taskuser(){
        return $this->hasManyThrough('App\Models\Users','App\Models\Tasks');
    }

    public function files(){
        return $this->hasManythrough('App\Models\Files','App\Models\Comments');
    }

    public function users(){
        return $this->belongsToMany('App\Models\Users','projects_users','project_id','user_id');
    }
}
