/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.categories',['ngResource'] ).factory('categoriesRestService', function ($resource, appUrl) {
    return $resource(appUrl+'categories/:id',
        {
            id:'@id'
        },
        {
            update:{
                method:'PUT'
            }
        }
    );
});/**
 * Created by Joseph on 6/19/2016.
 */
