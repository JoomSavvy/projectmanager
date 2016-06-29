/**
 *
 */

angular.module( 'app.config.categories', [])
    .controller( 'CategoriesCtrl',
        function CategoriesController(
            $scope, $filter, $stateParams,$rootScope,
            categories,
            userSessionService,categoriesRestService
        ) {
            this.categories = categories;
            this.saveNewCategory = function () {
                categoriesRestService.save(this.newCategory).$promise.then(
                   angular.bind(this,function(){
                        this.newCategory = {};
                        this.categories = categoriesRestService.query();
                   })
                )
            }
        }
    )
;

