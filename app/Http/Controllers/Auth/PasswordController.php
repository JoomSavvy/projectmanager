<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Response;
use Log;

class PasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Create a new password controller instance.
     *
     * @return void
     */

    protected $subject = 'Please set your password.';

    public function __construct()
    {
        $this->middleware('guest');
    }

    protected function getResetSuccessResponse($response){
        return $this->sendResponse('Password has been saved successfully' );
    }

    protected function getResetFailureResponse( $request, $response)
    {
        return $this->sendResponse('Password failed to save successfully',500);
    }

    public function sendResponse($result, $status)
    {
        //return Response::json(ResponseUtil::makeResponse($message, $result));
        return Response::json( $result,$status );
    }
    
    protected function getSendResetLinkEmailSuccessResponse($response){


        $result = 'Password Reset Link Sent';
        $status = 200;
        return $this->sendResponse($result,$status);
    }

    protected function getSendResetLinkEmailFailureResponse($response)
    {
        $result = 'Invalid Email';
        $status = 400;
        return $this->sendResponse($result,$status);
    }
}
