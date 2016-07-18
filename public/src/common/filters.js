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

    .filter('dateToISO', function() {
        return function(input) {
            return new Date(input).toISOString();
        };
    })
    .filter('timeTotal', function($filter) {
        return function(time) {
            var
                ms_start = new Date(time.start_at).getTime(),
                ms_end = new Date(time.end_at).getTime(),
                ms_total = Math.round(ms_end - ms_start) / 1000;

            var
            // Hours, minutes and seconds
                hrs = ~~(ms_total / 3600),
                mins = ~~((ms_total % 3600) / 60),
                secs = ms_total % 60;

            return _.padStart(hrs,2,'0')+':'+_.padStart(mins,2,'0')+':'+_.padStart(secs,2,'0');
        };
    })
;