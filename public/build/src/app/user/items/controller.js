/**
 *
 */

angular.module( 'app.user.items', [])
    .controller( 'UserItemsCtrl', function UserItemsController( $scope,$filter, $stateParams,users,usersRestService ) {

        this.users = users;

        this.newUser ={};
        
        this.saveNewRow = function(){
            this.newUser.isAdmin = parseInt(this.newUser.isAdmin);
            usersRestService.save(this.newUser).$promise.then(
                angular.bind(this,function(newUser){
                    this.users.push(newUser)
                })
            );
        };

        this.deleteUser = function(user){
            var userIndex = this.users.indexOf(user);
           user.$delete({id:user.id},
                angular.bind(this,function(user){
                    this.users.splice(userIndex,1);
                })

            )
        };
    })
   
    ;
    
