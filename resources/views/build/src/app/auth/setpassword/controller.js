/**
 *
 */

angular.module( 'app.auth.setpassword', [])

    /**
     * And of course we define a controller for our route.
     */
    .controller( 'AuthSetpasswordCtrl', function AuthSetpasswordController( $scope,$filter, $stateParams) {


        this.request = {};
        this.request.token = $stateParams.token;

        this.submitForm = function(){
            $http({
                method: 'POST',
                url: '/password/reset',
                data:this.request
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    })
    ;
    
