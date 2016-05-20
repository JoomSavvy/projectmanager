 angular.module( 'app', [
    'app.project',
    'app.user',
    'app.auth',
    'app.filters',
    'templates-app',
    'templates-common',
    'angular-loading-bar',
    'ngResource',
    'ui.router',
    'ui.sortable',
    'ui.bootstrap',
    'services.user.session',
     'satellizer'
    ])
    .constant('appUrl', '/api/v1/')
    .config( function config ( $stateProvider, $urlRouterProvider,   $httpProvider,$locationProvider ,$authProvider, $provide) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        function redirectWhenLoggedOut($q, $injector) {

            return {

                responseError: function(rejection) {

                    // Need to use $injector.get to bring in $state or else we get
                    // a circular dependency error
                    var $state = $injector.get('$state');

                    // Instead of checking for a status code of 400 which might be used
                    // for other reasons in Laravel, we check for the specific rejection
                    // reasons to tell us if we need to redirect to the login state
                    var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                    // Loop through each rejection reason and redirect to the login
                    // state if one is encountered
                    angular.forEach(rejectionReasons, function(value, key) {

                        if(rejection.data.error === value) {

                            // If we get a rejection corresponding to one of the reasons
                            // in our array, we know we need to authenticate the user so
                            // we can remove the current user from local storage
                            localStorage.removeItem('user');

                            // Send the user to the auth state so they can login
                            $state.go('auth.login');
                        }
                    });

                    return $q.reject(rejection);
                }
            }
        }

        // Setup for the $httpInterceptor
        $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

        // Push the new factory onto the $http interceptor array
        $httpProvider.interceptors.push('redirectWhenLoggedOut');

        $authProvider.loginUrl = '/api/v1/auth/login';
        $urlRouterProvider.otherwise( '/projects' );
        //$locationProvider.html5Mode(true);        
    })

    .run( function run ($rootScope /*, RouterTracker */) {
        $rootScope.$on("$stateChangeError", console.log.bind(console));
        $rootScope._ = _;

        $rootScope.$on('$stateChangeStart', function(event, toState) {

            // Grab the user from local storage and parse it to an object
            var user = JSON.parse(localStorage.getItem('user'));

            // If there is any user data in local storage then the user is quite
            // likely authenticated. If their token is expired, or if they are
            // otherwise not actually authenticated, they will be redirected to
            // the auth state because of the rejected request anyway
            if(user) {

                // The user's authenticated state gets flipped to
                // true so we can now show parts of the UI that rely
                // on the user being logged in
                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app. Here
                // we are grabbing what is in local storage
                $rootScope.currentUser = user;

                // If the user is logged in and we hit the auth route we don't need
                // to stay there and can send the user to the main state
                if(toState.name === "auth") {

                    // Preventing the default behavior allows us to use $state.go
                    // to change states
                    event.preventDefault();

                    // go to the "main" state which in our case is users
                    $state.go('users');
                }
            }
        });
    })

    .controller( 'AppCtrl', function AppCtrl ( $scope,userSessionService,usersRestService,$rootScope ) {

        this.users = usersRestService.query();
        //this.user = userSessionService.get();
        this.user = $rootScope.currentUser;
        
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            if ( angular.isDefined( toState.data.pageTitle ) ) {
                $scope.pageTitle = toState.data.pageTitle + ' | Client Intake' ;
            }
        });


        this.userTypeIsAdmin = true;
        this.userTypeIsUser = true;

        this.loadUser = function(){
            userSessionService.load(this.user.userName);
        };

        this.updateUserType = function(){
            userSessionService.setType(this.userType);
            this.userType == 'admin' && ((this.userTypeIsAdmin = true) && (this.userTypeIsUser = false) )
            || ((this.userTypeIsAdmin = false) && (this.userTypeIsUser = true));
        };
    })
    .directive('convertToNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(val) {
                    return parseInt(val, 10);
                });
                ngModel.$formatters.push(function(val) {
                    return '' + val;
                });
            }
        };
    })

;

