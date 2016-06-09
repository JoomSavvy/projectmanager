/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.projects',['ngResource'] ).factory('projectsRestService', function ($resource, appUrl) {
    return $resource(appUrl+'projects/:id',
        {
            id:'@id'
        },
        {
            forceDelete:{
                method:'DELETE',
                url:appUrl+'projects/:id/hard'
            },
            update:{
                method:'PUT'
            },
            restore:{
                method:'PUT',
                url:appUrl+'projects/:id/restore'
            },
            updateUserAdd:{
                method:'PUT',
                url:appUrl+'projects/:id/user/add'
            },
            updateUserDelete:{
                method:'PUT',
                url:appUrl+'projects/:id/user/delete'
            }
            
        }
    );
});