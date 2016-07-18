/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.times',['ngResource'] ).factory('timesRestService', function ($resource, appUrl) {
    return $resource(appUrl+'times/:id',
        {
            id:'@id'
        },
        {
            update:{
                method:'PUT',
                transformResponse: function(data) {
                    return angular.fromJson(data);
                }
            }
            
        }
    );
});