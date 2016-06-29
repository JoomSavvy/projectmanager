/**
 * Created by Ironman on 9/3/2015.
 */


/**
 * todo
 *  extend DAO instance schema of ngResource with container objects for user.
 *  methodology:
 *      ? return an instance of resource with aliases to methods of a resource instance.
 * */

angular.module( 'resources.tasks',['ngResource'] ).factory('tasksRestService', function ($resource, appUrl) {
    return $resource(appUrl+'tasks/:id',
        {
            id: '@id'
        },
        {
            update:{
                method:'PUT'
            },
            userAdd:{
                method:'PUT',
                url:appUrl+'tasks/:id/user/add'
            },
            userDelete:{

                method:'PUT',
                url:appUrl+'tasks/:id/user/delete'
            }
        }
    );
});