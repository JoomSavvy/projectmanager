angular.module( 'app', [
    'app.project',
    'app.user',
    'app.filters',
    'templates-app',
    'templates-common',
    'angular-loading-bar',
    'ngResource',
    'ui.router',
    'ui.sortable',
    'ui.bootstrap',
    'services.user.session'
    ])
    .constant('appUrl', '/api/v1/')
    .config( function config ( $stateProvider, $urlRouterProvider, $httpProvider ) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $urlRouterProvider.otherwise( '/projects' );
    })

    .run( function run ($rootScope /*, RouterTracker */) {
        $rootScope.$on("$stateChangeError", console.log.bind(console));
        $rootScope._ = _;
    })

    .controller( 'AppCtrl', function AppCtrl ( $scope,userSessionService,usersRestService ) {

        this.users = usersRestService.query();
        this.user = userSessionService.get();
        
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

;

