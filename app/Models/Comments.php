<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
/**
 * @SWG\Definition(
 *      definition="Comments",
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
 *          property="user_id",
 *          description="user_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="comment",
 *          description="comment",
 *          type="string"
 *      )
 * )
 */
class Comments extends Model
{
    use SoftDeletes;

    public $table = 'comments';
    

    protected $dates = ['deleted_at'];


    public $fillable = [
        'comment',
        'project_id',
        'user_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'project_id' => 'integer',
        'user_id' => 'integer',
        'comment' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];
    
    public function projects(){
        return $this->belongsTo('App\Models\Projects');
    }

    protected function notifyBob(Comments $comment){

        $username = Auth::user()->name;
        $mail_view = 'emails.events.comment';

        $mailvars['bobs_email'] = 'joseph.cardwell@joomsavvy.com';
        $mailvars['bobs_name'] = 'Robert Hollenshead';
        $mailvars['from_name'] = 'Project Management System';
        $mailvars['from_email'] = 'noreply@zaptodo.com';
        $mailvars['subject'] = 'New Note on Project Manager';

        $project_summary = $comment->projects()->getRelated()->first()['summary'];
        $data = [
            'comment'=>$comment->attributes['comment'],
            'timestamp'=>$comment->attributes['created_at'],
            'project_summary'=>$project_summary,
            'username'=>$username
        ];

        Mail::send($mail_view,$data,function($message) use ($mailvars){
            $message->from($mailvars['from_email'],$mailvars['from_name']);
            $message->to($mailvars['bobs_email'],$mailvars['bobs_name'])->subject($mailvars['subject']);
        });
    }
}
