/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.projects',['ngResource'] ).factory('projectsRestService', function ($resource, appUrl) {
    return $resource(appUrl+'projects/:id',
        {
            id:'@id'
        },
        {
            update:{
                method:'PUT'
            }
        }
    );
});