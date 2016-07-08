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


    /**
     * Return the project this commment is assigned to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function projects(){
        return $this->belongsTo('App\Models\Projects');
    }


    /**
     * Returns files attached to this note.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function files(){
        return $this->hasMany('App\Models\Files','comment_id');
    }

    protected function notify(Comments $comment){

        $username = Auth::user()->name;
        $mail_view = 'emails.events.comment';

        $mailvars['rec_email'] = 'joseph.cardwell@joomsavvy.com';
        $mailvars['rec_name'] = 'Joseph Cardwell';
        $mailvars['from_name'] = 'Project Management System';
        $mailvars['from_email'] = 'noreply@joomsavvy.com.com';
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
            $message->to($mailvars['rec_email'],$mailvars['rec_name'])->subject($mailvars['subject']);
        });
    }
}
