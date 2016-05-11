/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.tasks',['ngResource'] ).factory('tasksRestService', function ($resource, appUrl) {
    return $resource(appUrl+'tasks/:id',
        {
            id: '@id'
        },
        {
            update:{
                method:'PUT'
            }
        }
    );
});