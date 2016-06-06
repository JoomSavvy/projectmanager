angular.module( 'app.file', [
    'app.file.item',
    'app.file.items',
    'resources.files',
    'ui.router'
])

    .config(function config( $stateProvider ) {

        $stateProvider.state('file', {
            abstract:true
        });


        $stateProvider.state( 'file.items', {
            url: '/files',
            views: {
                "main@": {
                    controller: 'FileItemsCtrl as Ctrl',
                    templateUrl: 'file/items/template.tpl.html'
                }
            },
            data:{ pageTitle: 'Files' },
            resolve:{
                filesRestService:'filesRestService',
                files:function(filesRestService,$stateParams){
                    return filesRestService.query().$promise;
                },
                usersRestService:'usersRestService',
                users:function(usersRestService,$stateParams){
                    return usersRestService.query().$promise;
                }
            }
        });

        $stateProvider.state( 'file.item', {
            url: '/file/:id',
            views: {
                "main@": {
                    controller: 'FileItemCtrl as Ctrl',
                    templateUrl: 'file/item/template.tpl.html'
                }
            },
            data:{ pageTitle: 'File' },
            resolve:{
                filesRestService:'filesRestService',
                file:function(filesRestService,$stateParams){
                    return filesRestService.get({id:$stateParams.id}).$promise;
                },
                usersRestService:'usersRestService',
                users:function(usersRestService){
                    return usersRestService.query();
                }
            }
        });
    })

;