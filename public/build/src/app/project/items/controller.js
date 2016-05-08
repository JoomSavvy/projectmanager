/**
 *
 */

angular.module( 'app.project.items', [])
    .controller( 'ProjectItemsCtrl', function ProjectItemsController( $scope,$filter, $stateParams,projects, projectsRestService,tasksRestService,commentsRestService ) {

        this.projects = projects;
    })
    ;
    
