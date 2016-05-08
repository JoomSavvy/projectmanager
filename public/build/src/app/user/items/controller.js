/**
 *
 */

angular.module( 'app.user.items', [])
    .controller( 'UserItemsCtrl', function UserItemsController( $scope,$filter, $stateParams,users ) {

        this.users = users;
    })
    ;
    
