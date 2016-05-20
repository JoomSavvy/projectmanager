/**
 * Created by Ironman on 11/15/2015.
 */
angular.module( 'app.filters', [])
    .controller('FilterController',function FilterController (){

    })
    .filter('yesno',function(){
        return function(value,invert){
            if(typeof value == 'string'){
                value = parseInt(value);
            }
            var yes = 'Yes',no = 'No';
            if(invert == 'true'){ yes = 'No';no = 'Yes';}
            return value === 1 ? yes : no;
        };
    })
    .filter('num', function() {
        return function(input) {
            return parseInt(input, 10);
        }
    })
;