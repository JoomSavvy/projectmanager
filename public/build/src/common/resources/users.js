/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.users',['ngResource'] ).factory('usersRestService', function ($resource, appUrl) {
    return $resource(appUrl+'users/:id',
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