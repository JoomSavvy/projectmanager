/**
 *
 */

angular.module( 'app.project.items', [])
    .controller( 'ProjectItemsCtrl',
        function ProjectItemsController(
            $scope,$filter, $stateParams,$rootScope, $uibModal,
            projects, users, projectsRestService,tasksRestService,commentsRestService, filesRestService
        ) {

            this.users = users.slice(0);
            this.showNewProjectRow = false;
            this.newRow = {
                unassignedUsers : this.users,
                users:[]
            };

            this.projects = projects;

            this.activeProjects = $filter('filter')(
                this.projects,
                {
                    'deleted_at':null,
                    'state':1
                }
            );


            this.user = $rootScope.currentUser;

            this.newProject = {
                unassignedUsers : this.users
            };
            
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
                    summary:this.newRow.summary,
                    users:this.newRow.users
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


                projectsRestService.save(project).$promise.then(function(data){
                    task.project_id = data.id;
                    comment.project_id = data.id;
                    tasksRestService.save(task).$promise.then(function(){
                        commentsRestService.save(comment).$promise.then(function(){
                            $scope.updateProjects();
                            this.newRow = {
                                unassignedUsers : this.users
                            };
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

            this.openProjectFilesModal = function (project) {

                var users = this.users;
                //var comments = comments;
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'project/items/projectfiles.modals.tpl.html',
                    controller: 'ProjectFilesModalInstanceCtrl',
                    controllerAs: 'pfModalCtrl',
                    bindToController: true,
                    size: 'lg',
                    resolve: {
                        project: angular.bind(this,function () {
                            return project;
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
                        console.log('Modal dismissed at: ' + new Date());
                    }
                );
            };

            this.openCommentFilesModal = function (comment) {

                var users = this.users;
                //var comments = comments;
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'project/items/commentfiles.modals.tpl.html',
                    controller: 'CommentFilesModalInstanceCtrl',
                    controllerAs: 'cfModalCtrl',
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
                    }
                );
            };


        })
    .controller('NotesModalInstanceCtrl', function ($scope, $uibModalInstance, comments, users) {

        this.comments = comments;
        this.users = users;


        $scope.ok = function () {
            $uibModalInstance.close();
        };
    })
    .controller('ProjectFilesModalInstanceCtrl', function ($scope,$uibModal, $uibModalInstance, filesRestService, project, users){
        this.project = project;
        this.users = users;

        $scope.ok = function () {
            $uibModalInstance.close();
        };
        
        this.save = function(comment){

            $form = new FormData();
            console.log(comment);
            var files = [];
            
            //angular.forEach(comment.newfiles,function(value,key){
            //    var file = new Object();
            //    file.fileData = value;
            //    file.comment_id = comment.id;
            //    files.push(file);
            //});

            var file = new Object();
            file.fileData = comment.newfiles[0];
            file.comment_id = comment.id;

            
            filesRestService.save(file).$promise.then(angular.bind(this,function(result){
                comment.showAddFile = false;
                comment.files.push(result);
            }));

            //var f = document.getElementById('file').files[0];
//
            //r = new FileReader();
//
            //r.onloadend = function(e){
            //    var data = e.target.result;
            //    //send you binary data via $http or $resource or do anything else with it
            //};

            //save teh file.
            console.log(comment);
            this.showAddfile = false;
            

        };
        this.deleteFile = function(file_id){
            console.log(file_id);
            filesRestService.delete({id:file_id});
        };
        $scope.cancel = function(){
            $uibModalInstance.cloase();
        };
        

        this.openAddFileModal = angular.bind(this,
            function (comment) {

                var users = this.users;
                //var comments = comments;
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'project/items/addfile.modals.tpl.html',
                    controller: 'AddFileModalInstanceCtrl',
                    controllerAs: 'afModalCtrl',
                    bindToController: true,
                    size: 'sm',
                    resolve: {
                        comments: angular.bind(this, function () {
                            return comment;
                        }),
                        users: angular.bind(this, function () {
                            return users;
                        }),
                        scope:$scope
                    }
                });
            
        

                modalInstance.result.then(
                    function () {
                        console.log('Modal ok\'d');
                    },
                    function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    }
                );
            }
        );  
    })
    .controller('CommentFilesModalInstanceCtrl', function ($scope, $uibModalInstance, files) {

        this.files = files;

        this.showAddFileDialog = function(comment){
            //var comments = comments;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'project/items/comment.files.add.modals.tpl.html',
                controller: 'CommentFilesAddModalInstanceCtrl',
                controllerAs: 'cfaModalCtrl',
                bindToController: true,
                size: 'lg',
                resolve: {
                    comment: angular.bind(this,function () {
                        return comment;
                    })
                }
            });

            modalInstance.result.then(
                function () {
                    console.log('Modal ok\'d');
                },
                function () {
                    $log.info('Modal dismissed at: ' + new Date());
                }
            );
        };

        $scope.ok = function () {
            $uibModalInstance.close();
        };
    })
    .controller('CommentFilesAddModalInstanceCtrl', function ($scope, $uibModalInstance, comment) {

        this.comment = comment;

        $scope.ok = function () {
            $uibModalInstance.close();
        };
    })
    .controller('AddFileModalInstanceCtrl', function ($scope, $uibModalInstance, comment, filesRestService) {


        this.filedata = false;

        this.comment = comment;

        this.file.filedata = this.filedata;
        this.file.comment_id = comment.id;
        
        $scope.ok = function () {
            console.log(this.file);
            if(this.filedata){
                filesRestService.save(this.file).$promise.then(function(response){
                    $uibModalInstance.close();
                });
            }

        };
    })
    .directive('fileReader', function(
        $q
    ) {
        /*
         made by elmerbulthuis@gmail.com WTFPL licensed
         */
        var slice = Array.prototype.slice;

        return {
            restrict: 'A',
            scope: {
                fileReader: '='
            },
            link: function(scope, element, attributes) {

                console.log(scope);
                element.bind('change', function(e) {
                    
                    var element = e.target;
                    
                    if(!element.value) return;

                    element.disabled = true;
                    
                    console.log(scope.files);
                    scope.fileReader.newfiles = e.target.files;
                    //$q.all(slice.call(element.files, 0).map(readFile))
                    //    .then(function(values) {
                    //        console.log(values);
                    //        scope.fileReader.newfiles = e.target.files;
                    //        element.value = null;
                    //        element.disabled = false;
                    //    });

                    function readFile(file) {
                        var deferred = $q.defer();

                        var reader = new FileReader();

                        reader.onload = function(e) {
                            console.log(e);
                            deferred.resolve(e.target.result);
                        };

                        reader.onerror = function(e) {
                            deferred.reject(e);
                        };
                        
                        reader.readAsDataURL(file);

                        return deferred.promise;
                    }

                }); //change

            } //link

        }; //return

    }) //appFilereader
;
    
