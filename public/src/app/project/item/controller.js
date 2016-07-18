/**
 *
 */

angular.module( 'app.project.item', [])
    .controller( 'ProjectItemCtrl',
        function ProjectItemController(
            $scope, $filter, $stateParams,$rootScope,$uibModal,
            project, users, userSessionService, times,
            projectsRestService, tasksRestService, commentsRestService, timesRestService
        ) {
            this.users = users;
            this.project = project;
            this.user = userSessionService.get();
            this.times = times;


            //var unassignedUsers = angular.copy(this.users);
            var unassignedUsers = this.users;

            //this.unassignedUsers = angular.copy(this.users).filter(function(user) {});

            var diff = _.difference(_.map(unassignedUsers, "id"), _.map(this.project.users, "id"));
            this.unassignedUsers = _.filter(unassignedUsers, function(obj) {
                return diff.indexOf(obj.id) >= 0; 
            });

            this.newTaskRow = {
                project_id:this.project.id
            };

            this.newCommentRow = {
                project_id:this.project.id,
                user_id:this.user.id
            };

            this.newTimeRow = {
                project_id:this.project.id,
                user_id:this.user.id
            };

            this.showingNewTaskRow = false;
            this.showingNewCommentRow = false;
            this.recordingNewTimeRow = false;
            this.showingNewTimeRow = false;


            this.startRecordingNewTime = function(){
                this.newTimeRow.start_at = $filter('date')(new Date().getTime(),'yyyy-MM-dd HH:mm:ss');
            };

            this.stopRecordingNewTime = function(){
                this.newTimeRow.end_at = $filter('date')(new Date().getTime(),'yyyy-MM-dd HH:mm:ss');
                new Date().toISOString();
                timesRestService.save(this.newTimeRow).$promise.then(angular.bind(this,function(result){
                    this.project.times.push(result);
                    this.newTimeRow = {
                        project_id:this.project.id
                    }
                }))
            };

            this.updateTask = function(task){
                task.delivered = this.newTaskDelivered[task.id];
                tasksRestService.update({id:task.id},task).$promise.then(function(result){
                    this.newTaskDelivered[task.id]='';
                });
            };

            this.saveNewTaskRow = function(){
                tasksRestService.save(this.newTaskRow).$promise.then(angular.bind(this,function(){
                    projectsRestService.get({id:this.project.id}).$promise.then(angular.bind(this,function(result){
                        this.project = result;
                        this.showingNewTaskRow = false;
                        this.newTaskRow = {
                            project_id:this.project.id,
                            user_id:this.user.id
                        };
                    }))
                }))
            };

            this.saveNewCommentRow = function(){
                commentsRestService.save(this.newCommentRow).$promise.then(angular.bind(this,function(){
                    projectsRestService.get({id:this.project.id}).$promise.then(angular.bind(this,function(result){
                        this.project = result;
                        this.newCommentRow = {
                            project_id:this.project.id,
                            user_id:this.user.id
                        };
                    }));
                }));
            };
            
            this.editComment = function(comment){
                commentsRestService.update({id:comment.id},comment).$promise.then();
            };
            

            this.updateUserAdd = function(user){
                projectsRestService.updateUserAdd({id:this.project.id},user);
            };
            
            this.updateUserDelete = function(user){
                projectsRestService.updateUserDelete({id:this.project.id},user);
            };

            this.openTaskAdduserModal = function (task) {
                console.log(task);
                var users = this.users;
                
                var taskAvailableUsers = function(){
                    var allUsers = getAllUsers();
                    var diff = _.difference(_.map(allUsers, "id"), _.map(task.users, "id"));
                    console.log(diff);

                   
                    return _.filter(allUsers, function(obj) {
                        return diff.indexOf(obj.id) >= 0;
                    });
                };
                
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'project/item/modals/addtaskuser.tpl.html',
                    controller: 'TasksAdduserModalInstanceCtrl',
                    controllerAs: 'TAUModalCtrl',
                    bindToController: true,
                    size: 'lg',
                    resolve: {
                        task: angular.bind(this,function () {
                            return task;
                        }),
                        users: angular.bind(this,function () {
                            return taskAvailableUsers();
                        })
                    }
                });

                modalInstance.result.then(
                    function (result) {
                        console.log(result);
                    },
                    function (result) {
                        console.log(result);
                    }
                );

               

            };

            this.openEditTimeRecordModal = function (time) {

                var updateTime = function (time){
                    timesRestService.update({id:time.id},time).$promise.then(
                        function(result){
                            project.times[project.times.indexOf(time)] = result;
                        }
                    );
                };

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'project/item/modals/editTimeRecord.tpl.html',
                    controller: 'EditTimeRecordModalInstanceCtrl',
                    controllerAs: 'ETRModalCtrl',
                    bindToController: true,
                    size: 'md',
                    resolve: {
                        time: angular.bind(this,function () {
                            return time;
                        })
                    }
                });

                modalInstance.result.then(
                    //onSuccess
                    function (time) {
                        console.log(time);
                        updateTime(time);
                    },
                    //onCancel
                    function (cancelResult) {
                        console.log(cancelResult);
                    }
                );
            };

            this.removeTaskUser = function (task,user){
                task.users.splice(task.users.indexOf(user),1);
                tasksRestService.updateUserDelete({id:task.id},user).$promise.then(
                    function(result){
                        angular.noop();
                    }
                );
            };
            
            var getAllUsers = angular.bind(this,function(){
                return this.users;
            });
        }
        
    )
    .controller('TasksAdduserModalInstanceCtrl', function ($scope, $uibModalInstance, task, users, tasksRestService) {

        this.task = task;
        this.users = users;

        this.newUsers = [];
        this.availableUsers = [];
        
        this.addTaskUser = function(user){
            this.users.splice(this.users.indexOf(user),1);
            this.task.users.push(user);
            tasksRestService.userAdd({id:task.id},user)
                .$promise
                .then(angular.bind(this,
                    function(result){
                        angular.noop();
                        return;
                    }
                ))
        };
        
        this.removeTaskUser = function(user){
            this.task.users.splice(this.newUsers.indexOf(user),1);
            this.users.push(user);
            tasksRestService.userDelete({id:task.id},user)
                .$promise
                .then(angular.bind(this,
                    function(result){
                        angular.noop();
                        return;
                    }
                ))
        };

        this.testFunction = function(){
            console.log('fired');
        };


        $scope.ok = function () {
            $uibModalInstance.close();
        };
    })
    .controller('EditTimeRecordModalInstanceCtrl', function ($scope, $uibModalInstance, $filter,time, timesRestService) {
        this.time = time;
        this.editDuration = false;

        this.startDate  = new Date(time.start_at);
        this.startTime  = new Date(time.start_at);
        this.endDate    = new Date(time.end_at);
        this.endTime    = new Date(time.end_at);

        this.duration = new Date(time.start_at).setHours(0,0,0,0);

        this.setDuration = function(){
            this.time.end_at = $filter('date')(new Date(this.duration).getTime(),'yyyy-MM-dd HH:mm:ss');
            console.log(this.time.end_at);
        };

        this.setStartEnd = function(){
            console.log(this.startDate);
            console.log(this.startTime);
            console.log(this.endDate);
            console.log(this.endTime);

            this.startDate.setHours(this.startTime.getHours());
            this.startDate.setMinutes(this.startTime.getMinutes());
            this.startDate.setSeconds(this.startTime.getSeconds());

            this.endDate.setHours(this.endTime.getHours());
            this.endDate.setMinutes(this.endTime.getMinutes());
            this.endDate.setSeconds(this.endTime.getSeconds());



            
            this.time.start_at = $filter('date')(new Date(this.startDate).getTime(),'yyyy-MM-dd HH:mm:ss');
            this.time.end_at = $filter('date')(new Date(this.endDate).getTime(),'yyyy-MM-dd HH:mm:ss');
        };

        this.ok = function () {
            if(this.editDuration){
                this.setDuration();
            }else{
                this.setStartEnd();
            }
            $uibModalInstance.close(this.time);
        };

        this.resetDates = function(){
            this.startDate = new Date(time.start_at);
            this.endDate = new Date(time.end_at);
        };

        this.resetDates();

        this.clearStartDate = function() {
            this.startDate = null;
        };

        this.clearEndDate =function(){
            this.endDate = null;
        };


        this.inlineOptions = {
            customClass: getDayClass,
            showWeeks: true
        };

        this.popupOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            startingDay: 1
        };

        this.openDateStartPopup = function() {
            this.dateStartPopup.opened = true;
        };

        this.openDateEndPopup = function() {
            this.dateEndPopup.opened = true;
        };

        this.dateStartPopup = {
            opened: false
        };

        this.dateEndPopup = {
            opened: false
        };

        this.events = [];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date(this.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
    })
    ;
    
