<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateAuthAPIRequest;
use App\Http\Requests\API\UpdateAuthAPIRequest;
use App\Models\Auth;
use App\Repositories\AuthRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use InfyOm\Generator\Utils\ResponseUtil;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

use JWTException;
use JWTAuth;

/**
 * Class AuthAPIController
 * @package App\Http\Controllers\API
 */

class AuthAPIController extends AppBaseController
{

    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['login']]);
    }


    /**
     * Return a JWT
     *
     * @return Response
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }


    /**
     * Return the authenticated user
     *
     * @return Response
     */
    public function getAuthenticatedUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

}
