/**
 *
 */

angular.module( 'app.auth.login', [])

    /**
     * And of course we define a controller for our route.
     */
    .controller( 'AuthLoginCtrl', function AuthLoginController( $auth, $http, $scope,$filter, $stateParams, $state, $rootScope, userSessionService ) {

        var response = {};
        this.submitForm = function(){

            // Use Satellizer's $auth service to login
            $auth.login(this.request).then(
                function(data) {

                    // Return an $http request for the now authenticated
                    // user so that we can flatten the promise chain
                    return $http.get('/api/v1/auth/user');

                // Handle errors
                },
                function(error) {
                response.loginError = true;
                response.loginErrorText = error.data.error;

                // Because we returned the $http.get request in the $auth.login
                // promise, we can chain the next promise to the end here
            }).then(function(response) {

                // Stringify the returned data to prepare it
                // to go into local storage
                var user = JSON.stringify(response.data.user);

                // Set the stringified user data into local storage
                localStorage.setItem('user', user);
                userSessionService.set(user);

                // The user's authenticated state gets flipped to
                // true so we can now show parts of the UI that rely
                // on the user being logged in
                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app
                $rootScope.currentUser = response.data.user;

                // Everything worked out so we can now redirect to
                // the users state to view the data
                $state.go('project.items');
            });
        }
        
        this.submitPasswordResetRequest = function(){
            this.resetResultMessage = false;
            $http.post('/password/email',{email:this.request.email})
                .then(
                    angular.bind(this,
                        function(response){
                            this.resetResultMessageStatus = 'alert alert-success';
                            this.resetResultMessage = response.data;
                        }
                    )
                    ,
                    angular.bind(this,
                        function(response){
                            this.resetResultMessageStatus = 'alert alert-danger';
                            this.resetResultMessage = response.data;
                        }
                    )

                );

        }

    })
    ;
    
