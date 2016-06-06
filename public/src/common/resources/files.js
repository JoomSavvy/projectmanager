/**
 * Created by Ironman on 9/3/2015.
 */

angular.module( 'resources.files',['ngResource'] ).factory('filesRestService', function ($resource, appUrl) {
    return $resource(appUrl+'files/:id',
        {
            id:'@id'
        },
        {
            forceDelete:{
                method:'DELETE',
                url:appUrl+'files/:id/hard'
            },
            update:{
                method:'PUT'
            },
            restore:{
                method:'PUT',
                url:appUrl+'files/:id/restore'
            },
            save: {
                method: 'POST',
                transformRequest: function(data){
                    console.log(data);
                    if (data === undefined)
                        return data;

                    var fd = new FormData();
                    angular.forEach(data, function(value, key) {
                        if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(key, value[0]);
                            } else {
                                angular.forEach(value, function(file, index) {
                                    fd.append(key + '_' + index, file);
                                });
                            }
                        } else {
                            console.log(key);
                            console.log(value);
                            fd.append(key, value);
                        }
                    });

                    console.log(fd);
                    return fd;
                },
                headers: {
                    'Content-Type': undefined
                }
            }

        }
    );
});