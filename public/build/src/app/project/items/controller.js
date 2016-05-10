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
                update: function(e, ui) {
                },
                stop: angular.bind(this,function(e, ui) {

                    console.log(this.list);
                    angular.forEach(this.projects,function(value,index,projects){
                        //value.order_by = index;
                        console.log(index);
                        if(projects[index].order_by != index+1){
                            projects[index].order_by = index+1;

                            projectsRestService.update({id:value.id},value);
                        }

                    },this);
                    console.log(this.projects);

                })
            };

            this.showNewRow = function(){
                this.showNewProjectRow = true;
            };

            this.saveNewRow = function(){
                    //this.newRow.description //project
                    //this.newRow.assignee //task
                    //this.newRow.order //project
                    //this.newRow.deliverable //task
                    //this.newRow.delivered //task
                    //this.newRow.comment //comment

                //save project, save task with project id, save comment with project id
                var project = {
                    description:this.newRow.description,
                    order_by:this.newRow.order
                };

                var task = {
                    assigned_to : this.newRow.assignee,
                    deliverable: this.newRow.deliverable,
                    delivered: this.newRow.delivered
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
    
