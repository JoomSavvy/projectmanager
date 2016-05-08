angular.module('templates-app', ['login/login/template.tpl.html', 'login/logout/template.tpl.html', 'project/item/template.tpl.html', 'project/items/template.tpl.html', 'user/item/template.tpl.html', 'user/items/template.tpl.html']);

angular.module("login/login/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login/template.tpl.html",
    "<md-content layout-fill flex>\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-lg-6 col-lg-offset-3\">\n" +
    "                <fieldset>\n" +
    "                    <legend>Login</legend>\n" +
    "                    <form name=\"loginForm\" class=\"form-horizontal\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-lg-2 control-label\" for=\"userEmail\">Email</label>\n" +
    "\n" +
    "                            <div class=\"col-lg-4\">\n" +
    "                                <input ng-model=\"user.email\" name=\"userEmail\" id=\"userEmail\" class=\"form-control\"\n" +
    "                                       type=\"email\" placeholder=\"johndoe@company.com\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-lg-2 control-label\" for=\"userPassword\">Password</label>\n" +
    "\n" +
    "                            <div class=\"col-lg-4\">\n" +
    "                                <input ng-model=\"user.password\" name=\"userPassword\" id=\"userPassword\"\n" +
    "                                       class=\"form-control\" type=\"password\" placeholder=\"******\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"col-lg-4 col-lg-offset-2\">\n" +
    "                                <div class=\"checkbox\">\n" +
    "                                    <label>\n" +
    "                                        <input ng-model=\"user.rememberMe\" name=\"userRememberMe\"\n" +
    "                                               id=\"userRememberMe\" type=\"checkbox\"> Remember Me?\n" +
    "                                    </label>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <button class=\" col-lg-1 col-lg-offset-5 btn btn-primary\" ng-click=\"submitForm()\">Submit\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <hr>\n" +
    "                        <div class=\"form-horizontal\">\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <!--Sample state-->\n" +
    "                                <a class=\"col-lg-4\" ui-sref=\"login.usernameReminder\">Forgot your username?</a>\n" +
    "                            </div>\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <!--Sample state-->\n" +
    "                                <a class=\"col-lg-4\" ui-sref=\"login.resetPassword\" target=\"_blank\">Forgot your password?</a>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </form>\n" +
    "                </fieldset>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</md-content>");
}]);

angular.module("login/logout/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/logout/template.tpl.html",
    "You have been logged out.");
}]);

angular.module("project/item/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("project/item/template.tpl.html",
    "<div>\n" +
    "    <p>Description:{{Ctrl.project.description}}</p>\n" +
    "    <div>\n" +
    "        <h4>Tasks</h4>\n" +
    "        <table>\n" +
    "            <tr ng-repeat=\"task in ctrl.project.tasks\">\n" +
    "               <td>{{task.description}}</td>\n" +
    "               <td>{{task.priority}}</td>\n" +
    "               <td>{{task.deliverable}}</td>\n" +
    "               <td>{{task.delivered || 'No Progress'}}</td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <h4>Notes</h4>\n" +
    "        <table>\n" +
    "            <tr ng-if=\"Ctrl.project.comments.legnth > 0\" ng-repeat=\"comments in Ctrl.project.comments\">\n" +
    "                <td>{{comment.comment || 'No Notes'}}</td>\n" +
    "            </tr>\n" +
    "            <tr ng-if=\"Ctrl.project.comments.length = 0\">\n" +
    "                <td>No Comments or Notes For This Project</td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("project/items/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("project/items/template.tpl.html",
    "<table style=\"border-collapse: separate;\">\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "            <th>Date</th>\n" +
    "            <th>Project Description</th>\n" +
    "            <th>Task Person</th>\n" +
    "            <th>Urgency</th>\n" +
    "            <th>Action Required</th>\n" +
    "            <th>Action Completed</th>\n" +
    "            <th>Notes</th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr ng-repeat=\"project in Ctrl.projects\">\n" +
    "            <td>{{project.created_at}}</td>\n" +
    "            <td><a ui-sref=\"project.item\"> {{project.description}}</a></td>\n" +
    "            <td>{{project.tasks[0].assignee.name || 'Not Assigned'}}</td>\n" +
    "            <td>{{project.tasks[0].prority}}</td>\n" +
    "            <td>{{project.tasks[0].deliverable}}</td>\n" +
    "            <td>{{project.tasks[0].delivered}}</td>\n" +
    "            <td>{{project.comments[0].comment}}</td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("user/item/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("user/item/template.tpl.html",
    "user item");
}]);

angular.module("user/items/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("user/items/template.tpl.html",
    "<ul>\n" +
    "    <li ng-repeat=\"user in Ctrl.users\">{{user.name}}</li>\n" +
    "</ul>");
}]);