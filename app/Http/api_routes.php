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
Route::resource('timers', 'TimersAPIController');
Route::resource('files','FilesAPIController');
Route::resource('categories','CategoriesAPIController');

Route::delete('projects/{id}/hard','ProjectsAPIController@forceDestroy');
Route::put('projects/{id}/restore','ProjectsAPIController@restore');
Route::put('projects/{id}/user/add','ProjectsAPIController@useradd');
Route::put('projects/{id}/user/delete','ProjectsAPIController@userdelete');

Route::resource('tasks', 'TasksAPIController');
Route::put('tasks/{id}/user/add','TasksAPIController@useradd');
Route::put('tasks/{id}/user/delete','TasksAPIController@userdelete');

Route::resource('comments', 'CommentsAPIController');

Route::resource('users', 'UsersAPIController');

Route::post('auth/login', 'AuthAPIController@login');
Route::get('auth/user', 'AuthAPIController@getAuthenticatedUser');
