<!DOCTYPE html>
<html ng-app="app" ng-controller="AppCtrl as MainCtrl" class="fixed">
    <head>
        <title ng-bind="pageTitle"></title>
        <base href="/">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- font awesome from BootstrapCDN
        <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">-->

        <!-- compiled CSS -->
        <link rel="stylesheet" type="text/css" href="vendor/angular-loading-bar/build/loading-bar.min.css" />
        <link rel="stylesheet" type="text/css" href="assets/App-0.0.1.css" />

        <!-- compiled JavaScript -->
        <script type="text/javascript" src="vendor/jquery/dist/jquery.min.js"></script>
        <script type="text/javascript" src="vendor/angular/angular.js"></script>
        <script type="text/javascript" src="vendor/angular-ui-router/release/angular-ui-router.js"></script>
        <script type="text/javascript" src="vendor/angular-resource/angular-resource.js"></script>
        <script type="text/javascript" src="vendor/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
        <script type="text/javascript" src="vendor/angular-animate/angular-animate.js"></script>
        <script type="text/javascript" src="vendor/angular-touch/angular-touch.js"></script>
        <script type="text/javascript" src="vendor/jquery-ui/jquery-ui.min.js"></script>
        <script type="text/javascript" src="vendor/angular-ui-sortable/sortable.js"></script>
        <script type="text/javascript" src="vendor/angular-loading-bar/build/loading-bar.min.js"></script>
        <script type="text/javascript" src="vendor/angular-ui-uploader/dist/uploader.js"></script>
        <script type="text/javascript" src="vendor/satellizer/satellizer.min.js"></script>
        <script type="text/javascript" src="vendor/lodash/dist/lodash.js"></script>
        <script type="text/javascript" src="src/app/app.js"></script>
        <script type="text/javascript" src="src/app/auth/auth.js"></script>
        <script type="text/javascript" src="src/app/auth/login/controller.js"></script>
        <script type="text/javascript" src="src/app/auth/logout/controller.js"></script>
        <script type="text/javascript" src="src/app/auth/setpassword/controller.js"></script>
        <script type="text/javascript" src="src/app/config/categories/controller.js"></script>
        <script type="text/javascript" src="src/app/config/controller.js"></script>
        <script type="text/javascript" src="src/app/file/file.js"></script>
        <script type="text/javascript" src="src/app/file/item/controller.js"></script>
        <script type="text/javascript" src="src/app/file/items/controller.js"></script>
        <script type="text/javascript" src="src/app/project/item/controller.js"></script>
        <script type="text/javascript" src="src/app/project/items/controller.js"></script>
        <script type="text/javascript" src="src/app/project/project.js"></script>
        <script type="text/javascript" src="src/app/user/item/controller.js"></script>
        <script type="text/javascript" src="src/app/user/items/controller.js"></script>
        <script type="text/javascript" src="src/app/user/user.js"></script>
        <script type="text/javascript" src="src/common/filters.js"></script>
        <script type="text/javascript" src="src/common/resources/auth.js"></script>
        <script type="text/javascript" src="src/common/resources/categories.js"></script>
        <script type="text/javascript" src="src/common/resources/comments.js"></script>
        <script type="text/javascript" src="src/common/resources/files.js"></script>
        <script type="text/javascript" src="src/common/resources/projects.js"></script>
        <script type="text/javascript" src="src/common/resources/tasks.js"></script>
        <script type="text/javascript" src="src/common/resources/times.js"></script>
        <script type="text/javascript" src="src/common/resources/users.js"></script>
        <script type="text/javascript" src="src/common/services/modal/login/login.js"></script>
        <script type="text/javascript" src="src/common/services/modal/select/select.js"></script>
        <script type="text/javascript" src="src/common/services/routehistory.js"></script>
        <script type="text/javascript" src="src/common/services/user/auth.js"></script>
        <script type="text/javascript" src="src/common/services/user/session.js"></script>
        <script type="text/javascript" src="templates-common.js"></script>
        <script type="text/javascript" src="templates-app.js"></script>
    </head>
    <body>
    <div id="wrapper" ng-init="toggled=false" ng-class="{'toggled':toggled}">
        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="pull-left"><h4>{{pageTitle}}</h4></div>
            <div class="navbar-header">
                <button  ng-click="toggled=!toggled" type="button" class="navbar-toggle">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div id="sidebar-wrapper">
                <ul class="sidebar-nav">
                    <li class="sidebar-brand">
                        <a href="#">Project Manager</a>
                    </li>
                    <li>
                        <a  ui-sref="project.items">Projects</a>
                    </li>
                    <li ng-if="MainCtrl.user.isAdmin">
                        <a href="#">Configuration</a>

                        <ul class="nav nav-pills nav-stacked list-group">
                            <li class="list-item">
                                <a  ui-sref="user.items">Users</a>
                            </li>
                            <li>
                                <a ui-sref="config.categories">Categories</a>
                            </li>
                        </ul>
                    </li>
                    <li  ng-if="!MainCtrl.user.id">
                        <a  ui-sref="auth.login">Login</a>
                    </li>
                    <li  ng-if="MainCtrl.user.id">
                        <a href="" ng-click="MainCtrl.logout()">Logout</a>
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
