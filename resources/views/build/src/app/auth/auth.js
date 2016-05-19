/**
 *
 */

angular.module( 'app.auth', [
    'app.auth.logout',
    'app.auth.login',
    'app.auth.setpassword'
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

        $stateProvider.state( 'auth.setpassword', {
            url: '/auth/setpassword/:token',
            views: {
                "main@": {
                    controller: 'AuthSetpasswordCtrl as Ctrl',
                    templateUrl: 'auth/setpassword/template.tpl.html'
                }
            },
            data:{ pageTitle: 'Logout' }
        });
        
    })
    
    ;