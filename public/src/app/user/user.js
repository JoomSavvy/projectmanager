angular.module( 'app.user', [
    'app.user.item',
    'app.user.items',
    'resources.users',
    'ui.router'
])

    .config(function config( $stateProvider ) {

        $stateProvider.state('user', {
            abstract:true
        });


        $stateProvider.state( 'user.items', {
            url: '/users',
            views: {
                "main@": {
                    controller: 'UserItemsCtrl as Ctrl',
                    templateUrl: 'user/items/template.tpl.html'
                }
            },
            data:{ pageTitle: 'Users' },
            resolve:{
                usersRestService:'usersRestService',
                users:function(usersRestService,$stateParams){
                    return usersRestService.query().$promise;
                }
            }
        });

        $stateProvider.state( 'user.item', {
            url: '/user/:id',
            views: {
                "main@": {
                    controller: 'UserItemCtrl as Ctrl',
                    templateUrl: 'user/item/template.tpl.html'
                }
            },
            data:{ pageTitle: 'User' },
            resolve:{
                usersRestService:'usersRestService',
                user:function(usersRestService,$stateParams){
                    return usersRestService.query({id:$stateParams.id}).$promise;
                }
            }
        });
    })

;