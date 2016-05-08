/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.auth',['ngResource'] ).factory('authRestService', function ($resource, appUrl) {
    return $resource(appUrl+'auth/:userId',
        {
            commentId:'@comment_id'
        },
        {
            update:{
                method:'PUT'
            }
        }
    );
});