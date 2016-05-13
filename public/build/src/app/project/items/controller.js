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

            this.user = {
                name: 'dummy',
                id:100
            };

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

            this.getProjectFilter = function(){
                if(this.projectStateFilter =='active' ){
                    return {'deleted_at':null};
                }else if(this.projectStateFilter == 'archived'){
                    return {'deleted_at':''}
                }else if(this.projectStateFilter == 'all'){
                    return '';
                }
            };
            this.getPriorityGradient = function(){
                var rangeLow=0, rangeHigh=120;
                increment=(rangeHigh-rangeLow)/(this.projects.length+1);
                var r = [];
                for (var i=rangeLow;i<rangeHigh;i+=increment)
                    r.push(i);
                return r;
            };

            this.showNewRow = function(){
                this.showNewProjectRow = true;
            };

            this.archiveProject = function(project){
                console.log(project);
                project.$delete({id:project.id},
                    angular.bind(this,function(){
                    this.projects.splice(this.projects.indexOf(project),1);
                    })
                );
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
                    order_by:this.newRow.order,
                    summary:this.newRow.summary
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
                
                this.showNewProjectRow = false;
            };
    })
    .filter('urgency',function(){
        return function(input){
            return false;
        }
    })
    
    ;
    
