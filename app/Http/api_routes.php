<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where all API routes are defined.
|
*/












Route::resource('projects', 'ProjectsAPIController');
Route::resource('files','FilesAPIController');

Route::delete('projects/{id}/hard','ProjectsAPIController@forceDestroy');
Route::put('projects/{id}/restore','ProjectsAPIController@restore');

Route::resource('tasks', 'TasksAPIController');

Route::resource('comments', 'CommentsAPIController');

Route::resource('users', 'UsersAPIController');

Route::post('auth/login', 'AuthAPIController@login');
Route::get('auth/user', 'AuthAPIController@getAuthenticatedUser');
