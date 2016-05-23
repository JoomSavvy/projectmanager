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
            //this.user = userSessionService.get();
            this.project = project;

            this.user = userSessionService.get();
    
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
        }
    )
    ;
    
