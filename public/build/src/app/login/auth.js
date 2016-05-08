/**
 *
 */

angular.module( 'app.login', [
    'app.auth.logout',
    'app.auth.login'
])
    
    .config(function config( $stateProvider ) {

        $stateProvider.state('auth', {
            abstract:true
        });

        $stateProvider.state( 'auth.login', {
            url: '/auth/login',
            views: {
                "main@": {
                    controller: 'AuthLoginCtrl as Ctrl',
                    templateUrl: 'auth/login/template.tpl.html'
                }
            },
            data:{ pageTitle: 'Login' }
        });

        $stateProvider.state( 'auth.logout', {
            url: '/auth/logout',
            views: {
                "main@": {
                    controller: 'AuthLogoutCtrl as Ctrl',
                    templateUrl: 'auth/logout/template.tpl.html'
                }
            },
            data:{ pageTitle: 'Logout' }
        });
    })
    
    ;