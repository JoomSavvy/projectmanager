/**
 * Created by Joseph on 6/19/2016.
 */


angular.module( 'app.config', [
        'app.config.categories'
    ])

    .config(function config( $stateProvider ) {

        $stateProvider.state('config', {
            abstract:true
        });


        $stateProvider.state( 'config.categories', {
            url: '/config/categories',
            views: {
                "main@": {
                    controller: 'CategoriesCtrl as Ctrl',
                    templateUrl: 'config/categories/template.tpl.html'
                }
            },
            data:{ pageTitle: 'Categories' },
            resolve:{
                categoriesRestService:'categoriesRestService',
                categories:function(categoriesRestService,$stateParams){
                    return categoriesRestService.query().$promise;
                }
            }
        });
    })

;
