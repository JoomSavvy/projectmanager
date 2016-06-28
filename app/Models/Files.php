<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
/**
 * @SWG\Definition(
 *      definition="Files",
 *      required={},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="comment_id",
 *          description="comment_id",
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
 *          property="hash",
 *          description="hash",
 *          type="string"
 *      )
 * )
 */
class Files extends Model
{
    use SoftDeletes;

    public $table = 'files';
    

    protected $dates = ['deleted_at','created_at','updated_at'];


    public $fillable = [
        'file',
        'file_id',
        'user_id',
        'comment_id',
        'hash',
        'filename'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'=>'integer',
        'file_id' => 'integer',
        'user_id' => 'integer',
        'hash' => 'string'
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
    public function comments(){
        return $this->belongsTo('App\Models\Comments');
    }


    // @todo Move to base model or interface.
    protected function notify(Files $file){

        $username = Auth::user()->name;
        $mail_view = 'emails.events.file';

        
        // so from here, we use visibility and subscription to define recipients for file events.
        /*
        $mailvars['rec_email'] = 'joseph.cardwell@joomsavvy.com';
        $mailvars['rec_name'] = 'Joseph Cardwell';
        $mailvars['from_name'] = 'Project Management System';
        $mailvars['from_email'] = 'noreply@joomsavvy.com.com';
        $mailvars['subject'] = 'New Note on Project Manager';

        $project_summary = $file->projects()->getRelated()->first()['summary'];
        $data = [
            'file'=>$file->attributes['file'],
            'timestamp'=>$file->attributes['created_at'],
            'project_summary'=>$project_summary,
            'username'=>$username
        ];

        Mail::send($mail_view,$data,function($message) use ($mailvars){
            $message->from($mailvars['from_email'],$mailvars['from_name']);
            $message->to($mailvars['rec_email'],$mailvars['rec_name'])->subject($mailvars['subject']);
        });
        
        */
    }
}
