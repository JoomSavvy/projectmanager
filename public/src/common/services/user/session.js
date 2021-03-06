/**
 * Created by Ironman on 8/23/2015.
 */


angular.module( 'services.user.session',['resources.users'] )
    .service('userSessionService', function($rootScope, usersRestService) {

    var user = {};

    var isLoggedIn = false;

    function loadUser(id){
        user = usersRestService.get( { id : id } );

        console.log(user);
    }

    function logout(){
        isLoggedIn = false;
        user = {};
        localStorage.removeItem('user');
        $rootScope.$broadcast('user:updated');
    }

    function set(userObject) {
        console.log('session user set');
        user = userObject;
        isLoggedIn = true;
        $rootScope.$broadcast('user:updated');
    }

    function get() {
        return user;
    }

    function setType(type){
        type == 'admin' && (user.isAdmin = true) || (user.isAdmin = false);
    }


    return {
        setType: setType,
        set: set,
        get: get,
        load: loadUser,
        isLoggedIn: function(){return isLoggedIn;},
        logout: logout

    };
});