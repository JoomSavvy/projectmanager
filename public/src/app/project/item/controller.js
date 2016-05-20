/**
 *
 */

angular.module( 'app.project.item', [])
    .controller( 'ProjectItemCtrl',
        function ProjectItemController(
            $scope, $filter, $stateParams,$rootScope,
            project, users,
            projectsRestService, tasksRestService, commentsRestService
        ) {
            this.users = users;
            this.project = project;

            this.user = $rootScope.currentUser;
    
            this.newTaskRow = {
                project_id:this.project.id
            };
            this.newCommentRow = {
                project_id:this.project.id
            };

            this.showingNewTaskRow = false;
            this.showingNewCommentRow = false;
            console.log(project);


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
                            project_id:this.project.id
                        };
                    }))
                }))
            };

            this.saveNewCommentRow = function(){
                commentsRestService.save(this.newCommentRow).$promise.then(angular.bind(this,function(){
                    projectsRestService.get({id:this.project.id}).$promise.then(angular.bind(this,function(result){
                        this.project = result;
                        this.newCommentRow = {
                            project_id:this.project.id
                        };
                    }));
                }));
            }
        }
    )
    ;
    
