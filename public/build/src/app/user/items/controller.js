/**
 *
 */

angular.module( 'app.user.items', [])
    .controller( 'UserItemsCtrl', function UserItemsController( $scope,$filter, $stateParams,users,usersRestService ) {

        this.users = users;

        this.newUser ={};
        
        this.saveNewRow = function(){
            this.newUser.isAdmin = parseInt(this.newUser.isAdmin);
            console.log(this.newUser);
            usersRestService.save(this.newUser).$promise.then(angular.bind(this,function(newUser){
                this.users.push(newUser)
            }));
        }
    })
   
    ;
    
