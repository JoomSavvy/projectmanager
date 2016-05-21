<!DOCTYPE html>
<html ng-app="app" ng-controller="AppCtrl as MainCtrl" class="fixed">
    <head>
        <title ng-bind="pageTitle"></title>
        <base href="/">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- font awesome from BootstrapCDN -->
        <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">

        <!-- compiled CSS -->
        <link rel="stylesheet" type="text/css" href="vendor/angular-loading-bar/build/loading-bar.min.css" />
        <link rel="stylesheet" type="text/css" href="assets/App-0.0.1.css" />

        <!-- compiled JavaScript -->
        <script type="text/javascript" src="vendor/jquery/dist/jquery.min.js?rel=1463848162005"></script>
        <script type="text/javascript" src="vendor/angular/angular.js?rel=1463848162005"></script>
        <script type="text/javascript" src="vendor/angular-ui-router/release/angular-ui-router.js?rel=1463848162005"></script>
        <script type="text/javascript" src="vendor/angular-resource/angular-resource.js?rel=1463848162005"></script>
        <script type="text/javascript" src="vendor/angular-bootstrap/ui-bootstrap-tpls.min.js?rel=1463848162005"></script>
        <script type="text/javascript" src="vendor/angular-animate/angular-animate.js?rel=1463848162005"></script>
        <script type="text/javascript" src="vendor/angular-touch/angular-touch.js?rel=1463848162005"></script>
        <script type="text/javascript" src="vendor/jquery-ui/jquery-ui.min.js?rel=1463848162005"></script>
        <script type="text/javascript" src="vendor/angular-ui-sortable/sortable.js?rel=1463848162005"></script>
        <script type="text/javascript" src="vendor/angular-loading-bar/build/loading-bar.min.js?rel=1463848162005"></script>
        <script type="text/javascript" src="vendor/angular-ui-uploader/dist/uploader.js?rel=1463848162005"></script>
        <script type="text/javascript" src="vendor/satellizer/satellizer.min.js?rel=1463848162005"></script>
        <script type="text/javascript" src="vendor/lodash/dist/lodash.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/app/app.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/app/auth/auth.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/app/auth/login/controller.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/app/auth/logout/controller.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/app/auth/setpassword/controller.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/app/project/item/controller.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/app/project/items/controller.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/app/project/project.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/app/user/item/controller.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/app/user/items/controller.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/app/user/user.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/common/filters.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/common/resources/auth.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/common/resources/comments.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/common/resources/projects.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/common/resources/tasks.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/common/resources/users.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/common/services/modal/login/login.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/common/services/modal/select/select.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/common/services/routehistory.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/common/services/user/auth.js?rel=1463848162005"></script>
        <script type="text/javascript" src="src/common/services/user/session.js?rel=1463848162005"></script>
        <script type="text/javascript" src="templates-common.js?rel=1463848162005"></script>
        <script type="text/javascript" src="templates-app.js?rel=1463848162005"></script>
    </head>
    <body>
    <div id="wrapper">
        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div id="sidebar-wrapper">
                <ul class="sidebar-nav">
                    <li class="sidebar-brand">
                        Project Manager
                    </li>
                    <li>
                        <a  ui-sref="project.items"><h4>Projects</h4></a>
                    </li>
                    <li  ng-if="$parent.currentUser.isAdmin">
                        <a  ui-sref="user.items"><h4>Users</h4></a>
                    </li>
                    <li  ng-if="!$parent.currentUser.id">
                        <a  ui-sref="auth.login"><h4>Login</h4></a>
                    </li>
                </ul>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>
        <!-- start: page -->
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div id="zaptodo" ui-view="main" ></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end: page -->
        <!-- /#page-wrapper -->
    </div>
    </body>
</html>
