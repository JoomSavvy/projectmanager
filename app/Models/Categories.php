<?php

namespace App\Models;

use Eloquent as Model;
//use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
/**
 * @SWG\Definition(
 *      definition="Categories",x
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
 *          property="text",
 *          description="text",
 *          type="string"
 *      )
 * )
 */
class Categories extends Model
{
    //use SoftDeletes;

    public $table = 'categories';
    

    //protected $dates = ['deleted_at'];


    public $fillable = [
        'text'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'category_id'=>'integer',
        'text' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];


    /**
     * Return the project this category is assigned to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function projects(){
        return $this->belongsTo('App\Models\Projects');
    }

}
