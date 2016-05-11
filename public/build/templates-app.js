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
    "    <h4>Project Description: {{Ctrl.project.description}}</h4>\n" +
    "    <div>\n" +
    "        <h4>Tasks</h4>\n" +
    "        <table>\n" +
    "            <thead>\n" +
    "            <th>Created On</th>\n" +
    "            <th>Assigned To</th>\n" +
    "            <th>Deliverable</th>\n" +
    "            <th>Delivered</th>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-if=\"Ctrl.project.tasks.length > 0\" ng-repeat=\"task in Ctrl.project.tasks\" ng-class-odd=\"'odd'\" ng-class-even=\"'even'\">\n" +
    "                <td>{{task.created_at}}</td>\n" +
    "                <td>{{ (Ctrl.users | filter:{id:task.assigned_to})[0].name }}</td>\n" +
    "                <td>{{task.deliverable}}</td>\n" +
    "                <td>\n" +
    "                    <div ng-if=\"task.delivered != ''\">{{task.delivered}}</div>\n" +
    "                    <div ng-if=\"task.delivered == ''\">\n" +
    "                        <input type=\"text\" ng-model=\"Ctrl.newTaskDelivered\"/><a href=\"\" class=\"md-check\" ng-click=\"Ctrl.updateTask(task)\">✔</a>\n" +
    "                    </div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr ng-if=\"!Ctrl.project.tasks.length > 0\"><td colspan=\"2\"> No Tasks Associated With This Project</td></tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <div id=\"add_taskrow_container\">\n" +
    "            <table ng-if=\"Ctrl.showingNewTaskRow\" id=\"add_project_form\">\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th>Assigned To</th>\n" +
    "                    <th>Action Required</th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr >\n" +
    "                    <td>\n" +
    "                        <select ng-model=\"Ctrl.newTaskRow.assigned_to\">\n" +
    "                            <option ng-repeat=\"user in Ctrl.users\" value=\"{{user.id}}\">{{user.name}}</option>\n" +
    "                        </select>\n" +
    "                    </td>\n" +
    "                    <td><input type=\"text\" ng-model=\"Ctrl.newTaskRow.deliverable\"/></td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "            <div id=\"action_buttons\">\n" +
    "                <input ng-if=\"!Ctrl.showingNewTaskRow\" type=\"button\" value=\"Add Task\" ng-click=\"Ctrl.showingNewTaskRow=true\"/>\n" +
    "                <input ng-if=\"Ctrl.showingNewTaskRow\" type=\"button\" value=\"Commit\" ng-click=\"Ctrl.saveNewTaskRow()\"/>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <h4>Notes</h4>\n" +
    "        <table >\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th>Created On</th>\n" +
    "                <th>Created By</th>\n" +
    "                <th>Text</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-if=\"Ctrl.project.comments.length > 0\" ng-repeat=\"comment in Ctrl.project.comments\" ng-class-odd=\"'odd'\" ng-class-even=\"'even'\">\n" +
    "                <td>{{comment.created_at}}</td>\n" +
    "                <td>{{ (Ctrl.users | filter:{id:comment.user_id})[0].name }}</td>\n" +
    "                <td>{{comment.comment}}</td>\n" +
    "            </tr>\n" +
    "            <tr ng-if=\"!Ctrl.project.comments.length > 0\">\n" +
    "                <td colspan=\"2\">No Comments or Notes For This Project</td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "        <div id=\"add_commentRow_container\">\n" +
    "            <table ng-if=\"Ctrl.showingNewCommentRow\" id=\"add_project_form\">\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th>Text</th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr >\n" +
    "                    <td><textarea ng-model=\"Ctrl.newCommentRow.comment\"></textarea></td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "            <div id=\"action_buttons\">\n" +
    "                <input ng-if=\"!Ctrl.showingNewCommentRow\" type=\"button\" value=\"Add Note\" ng-click=\"Ctrl.showingNewCommentRow=true\"/>\n" +
    "                <input ng-if=\"Ctrl.showingNewCommentRow\" type=\"button\" value=\"Commit\" ng-click=\"Ctrl.saveNewCommentRow();Ctrl.showingNewCommentRow=false\"/>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("project/items/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("project/items/template.tpl.html",
    "<table ng-if=\"false\" id=\"add_project_form\">\n" +
    "    <thead>\n" +
    "    <tr>\n" +
    "        <th>Project Description</th>\n" +
    "        <th>Task Person</th>\n" +
    "        <th>Urgency</th>\n" +
    "        <th>Action Required</th>\n" +
    "        <th>Action Completed</th>\n" +
    "        <th>Notes</th>\n" +
    "    </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr >\n" +
    "        <td><input type=\"text\" ng-model=\"Ctrl.newRow.description\"/></td>\n" +
    "        <td>\n" +
    "            <select ng-model=\"Ctrl.newRow.assignee\">\n" +
    "                <option ng-repeat=\"user in Ctrl.users\" value=\"{{user.id}}\">{{user.name}}</option>\n" +
    "            </select>\n" +
    "        </td>\n" +
    "        <td><input type=\"number\"    ng-model=\"Ctrl.newRow.order\"/></td>\n" +
    "        <td><input type=\"text\"      ng-model=\"Ctrl.newRow.deliverable\"/></td>\n" +
    "        <td><input type=\"text\"      ng-model=\"Ctrl.newRow.delivered\"/></td>\n" +
    "        <td><input type=\"text\"      ng-model=\"Ctrl.newRow.comment\"/></td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "</table>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<form class=\"form-horizontal\" ng-if=\"Ctrl.showNewProjectRow\" >\n" +
    "    <fieldset>\n" +
    "\n" +
    "        <!-- Form Name -->\n" +
    "        <legend>Initial Task</legend>\n" +
    "\n" +
    "        <!-- Select User -->\n" +
    "        <div class=\"form-group\">\n" +
    "            <label class=\"col-md-4 control-label\" for=\"selectNewProjectTaskAssignee\">Select User</label>\n" +
    "            <div class=\"col-md-2\">\n" +
    "                <select ng-model=\"Ctrl.newRow.assignee\" class=\"form-control\" id=\"selectNewProjectTaskAssignee\">\n" +
    "                    <option ng-repeat=\"user in Ctrl.users\" value=\"{{user.id}}\">{{user.name}}</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Task Deliverable-->\n" +
    "        <div class=\"form-group\">\n" +
    "            <label class=\"col-md-4 control-label\" for=\"deliverable\">Action Required</label>\n" +
    "            <div class=\"col-md-3\">\n" +
    "                <input id=\"deliverable\" ng-model=\"Ctrl.newRow.deliverable\" type=\"text\" placeholder=\"action required\" class=\"form-control input-md\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Task Delivered-->\n" +
    "        <div class=\"form-group\">\n" +
    "            <label class=\"col-md-4 control-label\" for=\"textinput\">Action Taken</label>\n" +
    "            <div class=\"col-md-3\">\n" +
    "                <input id=\"textinput\" ng-model=\"Ctrl.newRow.delivered\" type=\"text\" placeholder=\"action taken\" class=\"form-control input-md\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Textarea -->\n" +
    "        <div class=\"form-group\">\n" +
    "            <label class=\"col-md-4 control-label\" for=\"newProjectTaskNote\">Task Note</label>\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <textarea class=\"form-control\" id=\"newProjectTaskNote\" ng-model=\"Ctrl.newRow.comment\"></textarea>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </fieldset>\n" +
    "    <fieldset>\n" +
    "        <legend>Project Settings</legend>\n" +
    "        <!-- Text input-->\n" +
    "        <div class=\"form-group\">\n" +
    "            <label class=\"col-md-4 control-label\" for=\"urgency\">Urgency</label>\n" +
    "            <div class=\"col-md-2\">\n" +
    "                <input id=\"urgency\" ng-model=\"Ctrl.newRow.order\" type=\"text\" placeholder=\"Urgency\" class=\"form-control input-md\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- Text input-->\n" +
    "        <div class=\"form-group\">\n" +
    "            <label class=\"col-md-4 control-label\" for=\"newProjectSummary\">Project Summary</label>\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <input id=\"newProjectSummary\" ng-model=\"Ctrl.newRow.summary\" type=\"text\" placeholder=\"summary\" class=\"form-control input-md\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- Textarea -->\n" +
    "        <div class=\"form-group\">\n" +
    "            <label class=\"col-md-4 control-label\" for=\"newProjectDescription\">Full Description</label>\n" +
    "            <div class=\"col-md-4\">\n" +
    "                <textarea rows=\"15\" class=\"form-control\" id=\"newProjectDescription\" ng-model=\"Ctrl.newRow.description\"></textarea>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </fieldset>\n" +
    "\n" +
    "\n" +
    "</form>\n" +
    "<div id=\"action_buttons\">\n" +
    "    <input ng-if=\"!Ctrl.showNewProjectRow\" type=\"button\" value=\"Add Project\" ng-click=\"Ctrl.showNewRow()\"/>\n" +
    "    <input ng-if=\"Ctrl.showNewProjectRow\" type=\"button\" value=\"Commit\" ng-click=\"Ctrl.saveNewRow()\"/>\n" +
    "</div>\n" +
    "\n" +
    "<table id=\"project_table\">\n" +
    "    <thead>\n" +
    "        <tr style=\"border:1px solid gray;background:lightgrey;\">\n" +
    "            <th></th>\n" +
    "            <th>Date</th>\n" +
    "            <th>Project Description</th>\n" +
    "            <th>Task Person</th>\n" +
    "            <th>Urgency</th>\n" +
    "            <th>Action Required</th>\n" +
    "            <th>Action Completed</th>\n" +
    "            <th>Notes</th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody ui-sortable=\"Ctrl.sortableOptions\" ng-model=\"Ctrl.projects\" class=\"list\">\n" +
    "        <tr ng-repeat=\"project in Ctrl.projects\" style=\"border:1px solid gray;\" ng-class-odd=\"'odd'\" ng-class-even=\"'even'\">\n" +
    "            <td class=\"myHandle\"><div  style=\"width:15px;height:15px;background:black;\"></div></td>\n" +
    "            <td>{{project.created_at}}</td>\n" +
    "            <td><a ui-sref=\"project.item({id:project.id})\">{{project.summary}}</a></td>\n" +
    "            <td>{{project.tasks[0].assignee.name || 'Not Assigned'}}</td>\n" +
    "            <td>{{project.tasks[0].prority}}</td>\n" +
    "            <td>{{project.tasks[0].deliverable}}</td>\n" +
    "            <td>{{project.tasks[0].delivered}}</td>\n" +
    "            <td>{{project.comments[0].comment}}</td>\n" +
    "        </tr>\n" +
    "\n" +
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
