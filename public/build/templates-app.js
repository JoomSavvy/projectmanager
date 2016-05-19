angular.module('templates-app', ['auth/login/template.tpl.html', 'auth/logout/template.tpl.html', 'auth/setpassword/template.tpl.html', 'project/item/template.tpl.html', 'project/items/template.tpl.html', 'user/item/template.tpl.html', 'user/items/template.tpl.html']);

angular.module("auth/login/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/login/template.tpl.html",
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-6 col-lg-offset-3\">\n" +
    "            <fieldset>\n" +
    "                <legend>Login</legend>\n" +
    "                <form name=\"loginForm\" class=\"form-horizontal\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-lg-2 control-label\" for=\"userEmail\">Email</label>\n" +
    "\n" +
    "                        <div class=\"col-lg-4\">\n" +
    "                            <input ng-model=\"Ctrl.request.email\" id=\"userEmail\" class=\"form-control\"\n" +
    "                                   type=\"email\" placeholder=\"johndoe@company.com\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-lg-2 control-label\" for=\"userPassword\">Password</label>\n" +
    "\n" +
    "                        <div class=\"col-lg-4\">\n" +
    "                            <input ng-model=\"Ctrl.request.password\"  id=\"userPassword\"\n" +
    "                                   class=\"form-control\" type=\"password\" placeholder=\"******\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"col-lg-4 col-lg-offset-2\">\n" +
    "                            <div class=\"checkbox\">\n" +
    "                                <label>\n" +
    "                                    <input ng-model=\"Ctrl.request.rememberMe\" name=\"userRememberMe\"\n" +
    "                                           id=\"userRememberMe\" type=\"checkbox\"> Remember Me?\n" +
    "                                </label>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <button class=\" col-lg-2 col-lg-offset-5 btn btn-primary\" ng-click=\"Ctrl.submitForm()\">Submit\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <hr>\n" +
    "                    <div class=\"form-horizontal\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <!--Sample state-->\n" +
    "                            <a class=\"col-lg-4\" ui-sref=\"Ctrl.resetPassword()\" target=\"_blank\">Forgot your password?</a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </form>\n" +
    "            </fieldset>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("auth/logout/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/logout/template.tpl.html",
    "You have been logged out.");
}]);

angular.module("auth/setpassword/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/setpassword/template.tpl.html",
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-6 col-lg-offset-3\">\n" +
    "            <fieldset>\n" +
    "                <legend>Please complete the form to set your password</legend>\n" +
    "                <form  class=\"form-horizontal\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-lg-3 control-label\" for=\"userEmail\">Email</label>\n" +
    "\n" +
    "                        <div class=\"col-lg-4\">\n" +
    "                            <input ng-model=\"Ctrl.request.email\" id=\"userEmail\" class=\"form-control\"\n" +
    "                                   type=\"email\" placeholder=\"johndoe@company.com\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-lg-3 control-label\" for=\"userPassword\">Password (min 6 characters)</label>\n" +
    "\n" +
    "                        <div class=\"col-lg-4\">\n" +
    "                            <input ng-model=\"Ctrl.request.password\"  id=\"userPassword\"\n" +
    "                                   class=\"form-control\" type=\"password\" placeholder=\"******\">\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "\n" +
    "\n" +
    "                        <label class=\"col-lg-3 control-label\" for=\"userPassword\">Confirm Password</label>\n" +
    "                        <div class=\"col-lg-4\">\n" +
    "                            <input ng-model=\"Ctrl.request.confirm_password\"  id=\"userConfirmPassword\"\n" +
    "                                   class=\"form-control\" type=\"password\" placeholder=\"******\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"col-lg-4 col-lg-offset-2\">\n" +
    "                            <div class=\"checkbox\">\n" +
    "                                <label>\n" +
    "                                    <input ng-model=\"Ctrl.request.rememberMe\" name=\"userRememberMe\"\n" +
    "                                           id=\"userRememberMe\" type=\"checkbox\"> Remember Me?\n" +
    "                                </label>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <button class=\" col-lg-2 col-lg-offset-5 btn btn-primary\" ng-click=\"Ctrl.submitForm()\">Submit\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </fieldset>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("project/item/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("project/item/template.tpl.html",
    "<div>\n" +
    "    <h4>Project Summary: {{Ctrl.project.summary}}</h4>\n" +
    "    <h4>Project Description:</h4>\n" +
    "    <p>{{Ctrl.project.description}}</p>\n" +
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
    "                <input id=\"urgency\" ng-model=\"Ctrl.newRow.order\" type=\"number\" placeholder=\"Urgency\" class=\"form-control input-md\">\n" +
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
    "    <input ng-if=\"Ctrl.showNewProjectRow\" type=\"button\" value=\"Cancel\" ng-click=\"Ctrl.showNewProjectRow=false\"/>\n" +
    "</div>\n" +
    "<table>\n" +
    "    <tbody>\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            Filter:\n" +
    "            <select ng-init=\"Ctrl.projectStateFilter = 'active'\" ng-model=\"Ctrl.projectStateFilter\">\n" +
    "                <option value=\"active\" selected=\"true\">Active</option>\n" +
    "                <option value=\"archived\">Archived</option>\n" +
    "                <option value=\"all\">All</option>\n" +
    "            </select>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "</table>\n" +
    "<table id=\"project_table\">\n" +
    "    <thead>\n" +
    "        <tr style=\"border:1px solid gray;background:lightgrey;\">\n" +
    "            <th></th>\n" +
    "            <th>Date</th>\n" +
    "            <th>Project Summary</th>\n" +
    "            <th>Task Person</th>\n" +
    "            <th>Urgency</th>\n" +
    "            <th>Action Required</th>\n" +
    "            <th>Action Completed</th>\n" +
    "            <th>Notes</th>\n" +
    "            <th>Archive</th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody ui-sortable=\"Ctrl.sortableOptions\" ng-model=\"Ctrl.projects\" class=\"list\">\n" +
    "        <tr ng-repeat=\"project in Ctrl.projects | filter:Ctrl.getProjectFilter()\" style=\"border:1px solid gray;\" ng-class-odd=\"'odd'\" ng-class-even=\"'even'\">\n" +
    "            <td class=\"myHandle\"><div  style=\"width:15px;height:15px;background:black;\"></div></td>\n" +
    "            <td>{{project.created_at}}</td>\n" +
    "            <td><a ui-sref=\"project.item({id:project.id})\">{{project.summary}}</a></td>\n" +
    "            <td>{{project.tasks[0].assignee.name || 'Not Assigned'}}</td>\n" +
    "            <td ng-style=\"{'background-color':'hsla('+ Ctrl.getPriorityGradient()[$index]+',100%,50%,1)'}\">{{project.tasks[0].prority}}</td>\n" +
    "            <td>{{project.tasks[0].deliverable}}</td>\n" +
    "            <td>{{project.tasks[0].delivered}}</td>\n" +
    "            <td>{{project.comments[0].comment}}</td>\n" +
    "            <td><input type=\"button\" ng-click=\"Ctrl.archiveProject(project)\" value=\"X\"/></td>\n" +
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
    "<table ng-if=\"Ctrl.showingNewUserRow\">\n" +
    "    <thead>\n" +
    "        <th>User Name</th>\n" +
    "        <th>Email</th>\n" +
    "        <th>System Role</th>\n" +
    "\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <td><input type=\"text\" ng-model=\"Ctrl.newUser.name\"/></td>\n" +
    "        <td><input type=\"email\" ng-model=\"Ctrl.newUser.email\"/></td>\n" +
    "        <td>\n" +
    "            <select ng-model=\"Ctrl.newUser.isAdmin\" convert-to-number>\n" +
    "                <option value=\"1\">Admin</option>\n" +
    "                <option value=\"0\">User</option>\n" +
    "            </select>\n" +
    "        </td>\n" +
    "\n" +
    "    </tbody>\n" +
    "</table>\n" +
    "<div id=\"action_buttons\">\n" +
    "    <input ng-if=\"!Ctrl.showingNewUserRow\" type=\"button\" value=\"Add User\" ng-click=\"Ctrl.showingNewUserRow=true\"/>\n" +
    "    <input ng-if=\"Ctrl.showingNewUserRow\" type=\"button\" value=\"Commit\" ng-click=\"Ctrl.saveNewRow(); Ctrl.showingNewUserRow=false\"/>\n" +
    "</div>\n" +
    "\n" +
    "<table>\n" +
    "    <thead>\n" +
    "    <tr>\n" +
    "        <th>Name</th>\n" +
    "        <th>Email</th>\n" +
    "        <th>Role</th>\n" +
    "        <th>Remove User</th>\n" +
    "    </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr  ng-repeat=\"user in Ctrl.users\" ng-class-odd=\"'odd'\" ng-class-even=\"'even'\">\n" +
    "        <td>{{user.name}}</td>\n" +
    "        <td>{{user.email}}</td>\n" +
    "        <td>{{user.isAdmin && 'Admin' || 'User'}}</td>\n" +
    "        <td><input type=\"button\" ng-click=\"Ctrl.deleteUser(user)\" value=\"X\"/></td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "</table>\n" +
    "\n" +
    "");
}]);
