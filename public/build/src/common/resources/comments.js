/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.comments',['ngResource'] ).factory('commentsRestService', function ($resource, appUrl) {
    return $resource(appUrl+'comments/:commentId',
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