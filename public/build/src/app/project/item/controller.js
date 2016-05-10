/**
 *
 */

angular.module( 'app.project.item', [])
    .controller( 'ProjectItemCtrl',
        function ProjectItemController(
            $scope,$filter, $stateParams,
            project, projectsRestService, tasksRestService, commentsRestService
        ) {
            
            this.project = project;

            console.log(project);
        }
    )
    ;
    
