/**
 *
 */

angular.module( 'app.project.items', [])
    .controller( 'ProjectItemsCtrl',
        function ProjectItemsController(
            $scope,$filter, $stateParams,
            projects, users, projectsRestService,tasksRestService,commentsRestService
        ) {

            this.showNewProjectRow = false;
            this.newRow = {};
            this.projects = projects;
            this.users = users;

            this.newProject = {};
            this.newTask = {};
            this.newComment = {};

            this.tempList = [];
            this.list = projects;

            this.sortingLog = [];

            this.sortableOptions = {
                handle: '> .myHandle',
                update: function (e, ui) {
                    var logEntry = tmpList.map(function (i) {
                        return i.value;
                    }).join(', ');
                    this.sortingLog.push('Update: ' + logEntry);
                },
                stop: function (e, ui) {
                    // this callback has the changed model
                    var logEntry = tmpList.map(function (i) {
                        return i.value;
                    }).join(', ');
                    this.sortingLog.push('Stop: ' + logEntry);
                }
            };

            this.showNewRow = function(){
                this.showNewProjectRow = true;
            };

            this.saveNewRow = function(){
                    this.newRow.description //project
                    this.newRow.assignee //task
                    this.newRow.order //project
                    this.newRow.deliverable //task
                    this.newRow.delivered //task
                    this.newRow.comment //comment

                //save project, save task with project id, save comment with project id
                var project = {
                    description:this.newRow.description,
                    order_by:this.newRow.order
                };

                var task = {
                    assignee : this.newRow.assignee,
                    deliverable: this.newRow.deliverable,
                    delivereed: this.newRow.delivered
                };

                var comment = {
                    comment:this.newRow.comment
                };

                this.newRow = {};
                projectsRestService.save(project).$promise.then(function(data){
                    task.project_id = data.id;
                    comment.project_id = data.id;
                    tasksRestService.save(task).$promise.then(function(){
                        commentsRestService.save(comment).$promise.then(function(){
                            $scope.updateProjects();
                        });
                    });

                });

                $scope.updateProjects = angular.bind(this,function(){
                    this.projects = projectsRestService.query();
                });
            };
    })
    ;
    
