/**
 * Created by Ironman on 8/23/2015.
 */


angular.module( 'services.user.session',['resources.users'] ).service('userSessionService', function(usersRestService) {

    var user = {
        "isAdmin": true,
        "name": "",
        "email": "",
        "id":null
    };

    var isLoggedIn = false;

    function loadUser(id){
        user = usersRestService.get( { id : id } );

        console.log(user);
    }

    function set(userObject) {
        console.log('session user set');
        user = userObject;
        isLoggedIn = true;
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
        isLoggedIn: function(){return isLoggedIn;}

    };
});