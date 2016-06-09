/**
 *
 */

angular.module( 'app.project.item', [])
    .controller( 'ProjectItemCtrl',
        function ProjectItemController(
            $scope, $filter, $stateParams,$rootScope,
            project, users, userSessionService,
            projectsRestService, tasksRestService, commentsRestService
        ) {
            this.users = users;
            console.log(users);
            //this.user = userSessionService.get();
            this.project = project;

            this.user = userSessionService.get();

            //var unassignedUsers = angular.copy(this.users);
            var unassignedUsers = this.users;

            //this.unassignedUsers = angular.copy(this.users).filter(function(user) {});

            var diff = _.difference(_.map(unassignedUsers, "id"), _.map(this.project.users, "id"));
            this.unassignedUsers = _.filter(unassignedUsers, function(obj) { return diff.indexOf(obj.id) >= 0; });

            this.newTaskRow = {
                project_id:this.project.id
            };

            this.newCommentRow = {
                project_id:this.project.id,
                user_id:this.user.id
            };

            this.showingNewTaskRow = false;
            this.showingNewCommentRow = false;
            console.log(project);
            console.log(this.user);


            this.updateTask = function(task){
                console.log(task);
                task.delivered = this.newTaskDelivered;
                tasksRestService.update({id:task.id},task).$promise.then(function(result){
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
            }

            this.updateUserAdd = function(user){
                projectsRestService.updateUserAdd({id:this.project.id},user);
            };
            
            this.updateUserDelete = function(user){
                projectsRestService.updateUserDelete({id:this.project.id},user);
            }
        }
    )
    ;
    
