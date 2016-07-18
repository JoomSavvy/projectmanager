angular.module( 'app.project', [
    'app.project.item',
    'app.project.items',
    'resources.projects',
    'resources.tasks',
    'resources.comments',
    'resources.files',
    'resources.times',
    'ui.router'
])

    .config(function config( $stateProvider ) {

        $stateProvider.state('project', {
            abstract:true
        });


        $stateProvider.state( 'project.items', {
            url: '/projects',
            views: {
                "main@": {
                    controller: 'ProjectItemsCtrl as Ctrl',
                    templateUrl: 'project/items/template.tpl.html'
                }
            },
            data:{ pageTitle: 'Projects' },
            resolve:{
                projectsRestService:'projectsRestService',
                projects:function(projectsRestService,$stateParams){
                    return projectsRestService.query().$promise;
                },
                usersRestService:'usersRestService',
                users:function(usersRestService,$stateParams){
                    return usersRestService.query().$promise;
                }
            }
        });

        $stateProvider.state( 'project.item', {
            url: '/project/:id',
            views: {
                "main@": {
                    controller: 'ProjectItemCtrl as Ctrl',
                    templateUrl: 'project/item/template.tpl.html'
                }
            },
            data:{ pageTitle: 'Project' },
            resolve:{
                projectsRestService:'projectsRestService',
                project:function(projectsRestService,$stateParams){
                    return projectsRestService.get({id:$stateParams.id}).$promise;
                },
                usersRestService:'usersRestService',
                users:function(usersRestService){
                    return usersRestService.query().$promise;
                },
                timesRestService:'timesRestService',
                times:function(timesRestService){
                    return timesRestService.query().$promise;
                }
            }
        });
    })

;