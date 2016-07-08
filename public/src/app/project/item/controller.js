/**
 *
 */

angular.module( 'app.project.item', [])
    .controller( 'ProjectItemCtrl',
        function ProjectItemController(
            $scope, $filter, $stateParams,$rootScope,$uibModal,
            project, users, categories, userSessionService,
            projectsRestService, tasksRestService, commentsRestService
        ) {
            this.users = users;
            console.log(users);
            this.categories = categories;
            //this.user = userSessionService.get();
            this.project = project;

            this.user = userSessionService.get();

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

            this.showingNewTaskRow = false;
            this.showingNewCommentRow = false;

            this.updateProject = function(){
                projectsRestService.update({id:this.project.id},this.project).$promise.then(angular.bind(function(result){
                    //this.project = result;
                    return angular.noop();
                }));
            };

            this.updateTask = function(task){
                task.delivered = this.newTaskDelivered[task.id];
                tasksRestService.update({id:task.id},task).$promise.then(function(result){
                    this.newTaskDelivered[task.id]=null;
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
    ;
    
