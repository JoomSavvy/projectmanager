/**
 *
 */

angular.module( 'app.project.items', [])
    .controller( 'ProjectItemsCtrl',
        function ProjectItemsController(
            $scope,$filter, $stateParams,$rootScope, $uibModal,
            projects, users, projectsRestService,tasksRestService,commentsRestService
        ) {

            this.showNewProjectRow = false;
            this.newRow = {};
            this.projects = projects;

            this.activeProjects = $filter('filter')(
                this.projects,
                {
                    'deleted_at':null,
                    'state':1
                }
            );

            this.users = users;

            this.user = $rootScope.currentUser;

            this.newProject = {};
            this.newTask = {};
            this.newComment = {};

            this.tempList = [];

            this.sortingLog = [];

            this.sortableOptions = {
                handle: '> .myHandle',
                update: function(e, ui) {
                },
                stop: angular.bind(this,function(e, ui) {
                    angular.forEach(this.activeProjects,function(value,index,projects){
                        if(parseInt(projects[index].order_by) != index+1){
                            projects[index].order_by = index+1;

                            projectsRestService.update({id:value.id},value);
                        }
                    },this);
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
                this.activeProjects.splice(this.activeProjects.indexOf(project),1);
                project.state = 0;
                projectsRestService.update({id:project.id},project);
            };

            this.activateProject = function(project){
                project.state = 1;
                projectsRestService.update({id:project.id},project).$promise.then(
                    angular.bind(this,
                        function(){
                            //$scope.updateProjects();
                            this.activeProjects.push(project);
                        }
                    )
                );
            };

            this.trashProject = function(project){
                projectsRestService.delete({id:project.id},project).$promise.then(
                    angular.bind(this,
                        function(result){
                            project.deleted_at = result.deleted_at;
                        }
                    )
                );
            };

            this.restoreProject = function(project){
                projectsRestService.restore({id:project.id},project).$promise.then(
                    angular.bind(this,
                        function(result){
                            project.deleted_at = result.deleted_at;
                        }
                    )
                );
            };

            this.deleteProject = function(project){
                //project.$forceDelete({id:project.id},
                //    angular.bind(this,function(){
                //        this.projects.splice(this.projects.indexOf(project),1);
                //    })
                //);

                project.$forceDelete({id:project.id});
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
                    comment:this.newRow.comment,
                    created_by:this.user.id
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



                this.showNewProjectRow = false;
            };

            $scope.updateProjects = angular.bind(this,function(){
                projectsRestService.query().$promise.then(
                    angular.bind(this,
                        function(projects){
                            console.log(projects);
                            this.projects = projects;

                            console.log(this.activeProjects);
                            console.log('ping');
                            this.activeProjects = $filter('filter')(
                                this.projects,
                                {
                                    'deleted_at':null,
                                    'state':1
                                }
                            );
                        }
                    )
                )
            });

            this.openNotesModal = function (comments) {

                var users = this.users;
                console.log(comments);
                //var comments = comments;
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'project/items/notesmodal.tpl.html',
                    controller: 'NotesModalInstanceCtrl',
                    controllerAs: 'ModalCtrl',
                    bindToController: true,
                    size: 'lg',
                    resolve: {
                        comments: angular.bind(this,function () {
                            return comments;
                        }),
                        users: angular.bind(this,function () {
                            return users;
                        })
                    }
                });

                modalInstance.result.then(
                    function () {
                        console.log('Modal ok\'d');
                    },
                    function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
            };


        })
    .controller('NotesModalInstanceCtrl', function ($scope, $uibModalInstance, comments, users) {

        this.comments = comments;
        this.users = users;


        $scope.ok = function () {
            $uibModalInstance.close();
        };
    })

;
    
