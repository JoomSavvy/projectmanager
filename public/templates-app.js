angular.module('templates-app', ['auth/login/template.tpl.html', 'auth/logout/template.tpl.html', 'auth/setpassword/template.tpl.html', 'config/categories/template.tpl.html', 'project/item/modals/addtaskuser.tpl.html', 'project/item/modals/editTimeRecord.tpl.html', 'project/item/template.tpl.html', 'project/items/addfile.modals.tpl.html', 'project/items/commentfiles.modals.tpl.html', 'project/items/notesmodal.tpl.html', 'project/items/projectfiles.modals.tpl.html', 'project/items/template.tpl.html', 'user/item/template.tpl.html', 'user/items/template.tpl.html']);

angular.module("auth/login/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("auth/login/template.tpl.html",
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-6 col-lg-offset-3\">\n" +
    "            <fieldset ng-if=\"!Ctrl.showingPasswordResetForm\">\n" +
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
    "                            <a class=\"col-lg-4\" ng-click=\"Ctrl.showingPasswordResetForm=true\">Forgot your password?</a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </form>\n" +
    "            </fieldset>\n" +
    "            <fieldset ng-if=\"Ctrl.showingPasswordResetForm\">\n" +
    "                <legend>Reset Password</legend>\n" +
    "                <p>Please enter the email for the account.</p>\n" +
    "                <form id=\"passwordResetForm\" class=\"form-horizontal\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-lg-2 control-label\" for=\"userEmail\">Email</label>\n" +
    "                        <div class=\"col-lg-6\">\n" +
    "                            <input ng-model=\"Ctrl.request.email\" id=\"userEmail\" class=\"form-control\"\n" +
    "                                   type=\"email\" placeholder=\"johndoe@company.com\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <hr>\n" +
    "                    <div ng-if=\"Ctrl.resetResultMessage\" class=\"message\" ng-class=\"Ctrl.resetResultMessageStatus\">\n" +
    "                        {{Ctrl.resetResultMessage}}\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group  col-lg-6 btn-group-sm \">\n" +
    "                        <button class=\"btn btn-primary col-lg-offset-6 \" ng-click=\"Ctrl.submitPasswordResetRequest()\">\n" +
    "                            Submit\n" +
    "                        </button>\n" +
    "                        <button class=\"btn btn-primary\" ng-click=\"Ctrl.showingPasswordResetForm=false\">\n" +
    "                            Cancel\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "\n" +
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
    "                            <input ng-model=\"Ctrl.request.password_confirmation\"  id=\"userConfirmPassword\"\n" +
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

angular.module("config/categories/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("config/categories/template.tpl.html",
    "<div ng-init=\"Ctrl.showAddNewCategory=false\" class=\"row\">\n" +
    "    <h4 class=\"col-sm-12\">\n" +
    "        Categories\n" +
    "        <button class=\"btn btn-success btn-xs glyphicon glyphicon-plus\" ng-click=\"Ctrl.showAddNewCategory=true\" ></button>\n" +
    "    </h4>\n" +
    "\n" +
    "</div>\n" +
    "<div ng-if=\"Ctrl.showAddNewCategory\" class=\"row\">\n" +
    "    <div class=\"row\">\n" +
    "        <input type=\"text\" ng-model=\"Ctrl.newCategory.text\"/>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <button class=\"btn btn-success btn-xs\" ng-click=\"Ctrl.saveNewCategory();Ctrl.showAddNewCategory=false\">Save</button>\n" +
    "        <button class=\"btn btn-danger btn-xs\" ng-click=\"Ctrl.newCategory=null;Ctrl.showAddNewCategory=false\">Cancel</button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"category in Ctrl.categories\">{{category.text}}</li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("project/item/modals/addtaskuser.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("project/item/modals/addtaskuser.tpl.html",
    "<div>\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Add Task Users</h3>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <div class=\"well well-sm col-md-12\">\n" +
    "            <div class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">Available Users:</div>\n" +
    "                <ul class=\"panel-body\">\n" +
    "                    <li class=\"list-unstyled badge badge-info\" ng-repeat=\"user in TAUModalCtrl.users\">\n" +
    "                        <span class=\"btn btn-xs glyphicon glyphicon-plus\" ng-click=\"TAUModalCtrl.addTaskUser(user)\">{{user.name}}</span>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <div class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">New Users:</div>\n" +
    "                <ul class=\"panel-body\">\n" +
    "                    <li class=\"list-unstyled badge badge-info\" ng-repeat=\"user in TAUModalCtrl.task.users\">\n" +
    "                        <span class=\"btn btn-xs glyphicon glyphicon-remove\" ng-click=\"TAUModalCtrl.removeTaskUser(user)\">{{user.name}}</span>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">OK</button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("project/item/modals/editTimeRecord.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("project/item/modals/editTimeRecord.tpl.html",
    "<div>\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Edit Time Record</h3>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <div class=\"row\">\n" +
    "            <div ng-init=\"ETRModalCtrl.editStartEnd=true;ETRModalCtrl.editDuration=false\">\n" +
    "                <button class=\"btn btn-large btn-primary\" ng-click=\"ETRModalCtrl.editStartEnd=true;ETRModalCtrl.editDuration=false;\">Start/End</button>\n" +
    "                <button class=\"btn btn-large btn-primary\" ng-click=\"ETRModalCtrl.editStartEnd=false;ETRModalCtrl.editDuration=true;\">Duration</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"well well-sm col-md-12\">\n" +
    "            <div ng-if=\"ETRModalCtrl.editStartEnd\" class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">Edit Start/End</div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-4\">\n" +
    "                            <h4>Start Date</h4>\n" +
    "                            <div class=\"input-group\">\n" +
    "                                <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"{{ETRModalCtrl.format}}\" popup-placement=\"right\" ng-model=\"ETRModalCtrl.startDate\" is-open=\"ETRModalCtrl.dateStartPopup.opened\" datepicker-options=\"ETRModalCtrl.popupOptions\" ng-required=\"true\" close-text=\"Close\"  />\n" +
    "                                <span class=\"input-group-btn\">\n" +
    "                                  <button type=\"button\" class=\"btn btn-default\" ng-click=\"ETRModalCtrl.openDateStartPopup()\"><i class=\" glyphicon glyphicon-calendar\"></i></button>\n" +
    "                                </span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-4\">\n" +
    "                            <h4>Start Time</h4>\n" +
    "                            <uib-timepicker ng-model=\"ETRModalCtrl.startTime\" hour-step=\"1\" show-spinners=\"false\" pad-hours=\"true\" minute-step=\"1\" mousewheel='true' show-meridian=\"true\"></uib-timepicker>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-4\">\n" +
    "                            <h4>End Date:</h4>\n" +
    "                            <div class=\"input-group\">\n" +
    "                                <input type=\"text\" class=\"form-control\" uib-datepicker-popup ng-model=\"ETRModalCtrl.endDate\" popup-placement=\"right\" is-open=\"ETRModalCtrl.dateEndPopup.opened\" datepicker-options=\"ETRModalCtrl.popupOptions\" ng-required=\"true\" close-text=\"Close\" />\n" +
    "                                <span class=\"input-group-btn\">\n" +
    "                                  <button type=\"button\" class=\"btn btn-default\" ng-click=\"ETRModalCtrl.openDateEndPopup()\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                                </span>\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-4\">\n" +
    "                        <h4>End Time</h4>\n" +
    "                        <uib-timepicker ng-model=\"ETRModalCtrl.endTime\" hour-step=\"1\" show-spinners=\"false\" pad-hours=\"true\" minute-step=\"1\" mousewheel='true' show-meridian=\"true\"></uib-timepicker>\n" +
    "                    </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div ng-if=\"ETRModalCtrl.editDuration\" class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">Edit Duration</div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <uib-timepicker ng-model=\"ETRModalCtrl.duration\" hour-step=\"1\" show-spinners=\"false\" pad-hours=\"true\" minute-step=\"1\" mousewheel='true' show-meridian=\"false\"></uib-timepicker>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ETRModalCtrl.ok()\">OK</button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("project/item/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("project/item/template.tpl.html",
    "<div>\n" +
    "    <h4>Project Summary: {{Ctrl.project.summary}}</h4>\n" +
    "    <h4>Project Description:</h4>\n" +
    "    <p>{{Ctrl.project.description}}</p>\n" +
    "    <div class=\"row\">\n" +
    "        <h4>Time Records</h4>\n" +
    "        <div id=\"add_timerecord_row_container\">\n" +
    "            <table ng-if=\"Ctrl.showingNewTimeRow\" id=\"add_project_timeecord_form\">\n" +
    "                <tbody>\n" +
    "                <tr >\n" +
    "                    <td><input placeholder=\"What are you working on?\" type=\"text\" ng-model=\"Ctrl.newTimeRow.description\"/></td>\n" +
    "                    <td>\n" +
    "                        <button ng-if=\"!Ctrl.recordingNewTimeRow\" class=\"btn btn-primary\" ng-click=\"Ctrl.recordingNewTimeRow=true;Ctrl.startRecordingNewTime();\">Start</button>\n" +
    "                        <button ng-if=\"Ctrl.recordingNewTimeRow\" class=\"btn btn-primary\" ng-click=\"Ctrl.recordingNewTimeRow=false;Ctrl.stopRecordingNewTime();\">Stop</button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "            <div id=\"action_buttons\">\n" +
    "                <button class=\"btn btn-primary\" ng-if=\"!Ctrl.showingNewTimeRow\" alue=\"Add Task\" ng-click=\"Ctrl.showingNewTimeRow=true\">Add Time</button>\n" +
    "                <button class=\"btn btn-primary\" ng-if=\"Ctrl.showingNewTimeRow\"  ng-click=\"Ctrl.saveNewTimeRow()\">Save</button>\n" +
    "                <button class=\"btn btn-caution\" ng-if=\"Ctrl.showingNewTimeRow\"  ng-click=\"Ctrl.newTimeRow={project_id:Ctrl.project.id};Ctrl.showingNewTime=false\">Cancel</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <table width=\"100%;\" class=\"table table-hover table-condensed table-bordered \">\n" +
    "            <thead>\n" +
    "            <th>Task Description</th>\n" +
    "            <th>Continue</th>\n" +
    "            <th>Total</th>\n" +
    "            <th>Time Span</th>\n" +
    "            <th>Edit</th>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-if=\"Ctrl.project.times.length > 0\" ng-repeat=\"time in Ctrl.project.times\" ng-class-odd=\"'odd'\" ng-class-even=\"'even'\">\n" +
    "                <td>{{time.description}}</td>\n" +
    "                <td>{{time.user.name }}</td>\n" +
    "                <td>{{time | timeTotal}}</td>\n" +
    "                <td>{{time.start_at | dateToISO | date:'h:mma' }} - {{time.end_at | dateToISO | date:'h:mma'}}</td>\n" +
    "                <td><button class=\"btn btn-xs glyphicon glyphicon-edit\" ng-click=\"Ctrl.openEditTimeRecordModal(time)\"></button> </td>\n" +
    "            </tr>\n" +
    "            <tr ng-if=\"!Ctrl.project.times.length > 0\"><td colspan=\"4\"> No Time Records Associated With This Project</td></tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <h4>Tasks</h4>\n" +
    "        <div ng-if=\"Ctrl.user.isAdmin\" id=\"add_taskrow_container\">\n" +
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
    "                <button class=\"btn btn-primary\" ng-if=\"!Ctrl.showingNewTaskRow\" alue=\"Add Task\" ng-click=\"Ctrl.showingNewTaskRow=true\">Add Task</button>\n" +
    "                <button class=\"btn btn-primary\" ng-if=\"Ctrl.showingNewTaskRow\"  ng-click=\"Ctrl.saveNewTaskRow()\">Save</button>\n" +
    "                <button class=\"btn btn-caution\" ng-if=\"Ctrl.showingNewTaskRow\"  ng-click=\"Ctrl.newTaskRow={project_id:Ctrl.project.id};Ctrl.showingNewTask=false\">Cancel</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <table width=\"100%;\" class=\"table table-hover table-condensed table-bordered \">\n" +
    "            <thead>\n" +
    "            <th>Created On</th>\n" +
    "            <th width=\"60%\">Assigned To</th>\n" +
    "            <th>Deliverable</th>\n" +
    "            <th>Delivered</th>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-if=\"Ctrl.project.tasks.length > 0\" ng-repeat=\"task in Ctrl.project.tasks\" ng-class-odd=\"'odd'\" ng-class-even=\"'even'\">\n" +
    "                <td>{{task.created_at}}</td>\n" +
    "                <td>\n" +
    "                    <ul class=\"btn-group\">\n" +
    "                        <li class=\"list-unstyled badge badge-info\" ng-repeat=\"user in task.users\">\n" +
    "                                {{user.name }}\n" +
    "                                 <span class=\"btn btn-xs glyphicon glyphicon-remove\" ng-click=\"Ctrl.removeTaskUser(task,user)\"> </span>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "\n" +
    "                    <button class=\"btn btn-xs glyphicon glyphicon-plus\" ng-click=\"Ctrl.openTaskAdduserModal(task)\"></button>\n" +
    "                </td>\n" +
    "\n" +
    "                <td>{{task.deliverable}}</td>\n" +
    "                <td>\n" +
    "                    <div ng-if=\"task.delivered != ''\">{{task.delivered}}</div>\n" +
    "                    <div ng-if=\"task.delivered == ''\">\n" +
    "                        <input type=\"text\" ng-model=\"Ctrl.newTaskDelivered[task.id]\"/>\n" +
    "                        <i ng-click=\"Ctrl.updateTask(task)\" class=\"glyphicon glyphicon-check\"></i>\n" +
    "                    </div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr ng-if=\"!Ctrl.project.tasks.length > 0\"><td colspan=\"4\"> No Tasks Associated With This Project</td></tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"well well-sm col-md-6\">\n" +
    "            <h4>Visibility</h4>\n" +
    "            <div class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">Available Users:</div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <a ng-repeat=\"user in Ctrl.unassignedUsers\" href=\"\"\n" +
    "                       ng-click=\"\n" +
    "                        Ctrl.project.users.push(user);\n" +
    "                        Ctrl.unassignedUsers.splice(Ctrl.unassignedUsers.indexOf(user),1);\n" +
    "                        Ctrl.updateUserAdd(user);\">\n" +
    "                        {{user.name}}<span ng-if=\"!$last\">,</span></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">Assigned Users:</div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <a ng-repeat=\"user in Ctrl.project.users\" href=\"\"\n" +
    "                       ng-click=\"\n" +
    "                        Ctrl.unassignedUsers.push(user);\n" +
    "                        Ctrl.project.users.splice(Ctrl.project.users.indexOf(user),1);\n" +
    "                        Ctrl.updateUserDelete(user);\">\n" +
    "                        {{user.name}}<span ng-if=\"!$last\">,</span></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class='row'>\n" +
    "            <h4 class=\"col-sm-12\">\n" +
    "                Notes\n" +
    "\n" +
    "                <button class=\"btn btn-primary btn-xs\" ng-if=\"!Ctrl.showingNewCommentRow\" ng-click=\"Ctrl.showingNewCommentRow=true\">Add Note</button>\n" +
    "            </h4>\n" +
    "\n" +
    "        </div>\n" +
    "        <div id=\"add_commentRow_container\">\n" +
    "            <table ng-if=\"Ctrl.showingNewCommentRow\" id=\"add_comment_form\" class=\"table table-hover table-condensed table-bordered \">\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th>Text</th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr >\n" +
    "                    <td><textarea rows=\"10\" cols=\"100\" ng-model=\"Ctrl.newCommentRow.comment\"></textarea></td>\n" +
    "                </tr>\n" +
    "\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "            <div id=\"action_buttons\">\n" +
    "                <button class=\"btn btn-success btn-xs\" ng-if=\"Ctrl.showingNewCommentRow\" ng-click=\"Ctrl.saveNewCommentRow();Ctrl.showingNewCommentRow=false\">Commit</button>\n" +
    "                <button class=\"btn btn-danger btn-xs\" ng-if=\"Ctrl.showingNewCommentRow\" ng-click=\"Ctrl.showingNewCommentRow=false;Ctrl.newCommentRow={project_id:Ctrl.project.id,user_id:Ctrl.user.id}\">Cancel</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <table  class=\"table table-hover table-condensed table-bordered \">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th>Created On</th>\n" +
    "                <th>Created By</th>\n" +
    "                <th>Text</th>\n" +
    "                <th ng-if=\"Ctrl.user.isAdmin\">\n" +
    "                    Action\n" +
    "                </th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr\n" +
    "                    ng-if=\"Ctrl.project.comments.length > 0\"\n" +
    "                    ng-repeat=\"comment in Ctrl.project.comments\"\n" +
    "                    ng-init=\"editComment[comment.id] = false\"\n" +
    "                    ng-class-odd=\"'odd'\"\n" +
    "                    ng-class-even=\"'even'\">\n" +
    "                <td>{{comment.created_at}}</td>\n" +
    "                <td>{{ (Ctrl.users | filter:{id:comment.user_id})[0].name }}</td>\n" +
    "                <td ng-if=\"!editComment[comment.id]\">{{comment.comment}}</td>\n" +
    "                <td ng-if=\"editComment[comment.id]\">\n" +
    "                    <textarea cols=\"100\" rows=\"10\" ng-model=\"comment.comment\"></textarea>\n" +
    "                    <button class=\"btn btn-xs btn-primary glyphicon glyphicon-save\" ng-click=\"Ctrl.editComment(comment);editComment[comment.id] = false\"></button>\n" +
    "                </td>\n" +
    "                <td ng-if=\"Ctrl.user.isAdmin\">\n" +
    "                    <button class=\"btn btn-xs btn-primary glyphicon glyphicon-edit\" ng-click=\"editComment[comment.id] = true\"></button>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr ng-if=\"!Ctrl.project.comments.length > 0\">\n" +
    "                <td colspan=\"3\">No Comments or Notes For This Project</td>\n" +
    "            </tr>\n" +
    "\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("project/items/addfile.modals.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("project/items/addfile.modals.tpl.html",
    "");
}]);

angular.module("project/items/commentfiles.modals.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("project/items/commentfiles.modals.tpl.html",
    "notesfiles.modals.tpl.html show the list of files for a note\n" +
    "\n" +
    "");
}]);

angular.module("project/items/notesmodal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("project/items/notesmodal.tpl.html",
    "<div>\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Project Notes</h3>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <table style=\"width:100%;\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th>Created On</th>\n" +
    "                <th>Created By</th>\n" +
    "                <th>Text</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-if=\"ModalCtrl.comments.length > 0\" ng-repeat=\"comment in ModalCtrl.comments\" ng-class-odd=\"'odd'\" ng-class-even=\"'even'\">\n" +
    "                <td>{{comment.created_at}}</td>\n" +
    "                <td>{{ (ModalCtrl.users | filter:{id:comment.user_id})[0].name }}</td>\n" +
    "                <td>{{comment.comment}}</td>\n" +
    "            </tr>\n" +
    "            <tr ng-if=\"!ModalCtrl.comments.length > 0\">\n" +
    "                <td colspan=\"2\">No Comments or Notes For This Project</td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">OK</button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("project/items/projectfiles.modals.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("project/items/projectfiles.modals.tpl.html",
    "<div>\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">Project Files</h3>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <table style=\"width:100%;\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th>Note Information</th>\n" +
    "                <th>Note Files</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-if=\"pfModalCtrl.project.comments.length > 0\" ng-repeat=\"comment in pfModalCtrl.project.comments\"  ng-class-odd=\"'odd'\" ng-class-even=\"'even'\">\n" +
    "                <td ng-init=\"comment.showAddFile = false\">\n" +
    "                    Created {{comment.created_at}} by {{ (pfModalCtrl.users | filter:{id:comment.user_id})[0].name }}<br/>\n" +
    "                    <p>Text: {{comment.comment}}</p>\n" +
    "                </td>\n" +
    "                <td>\n" +
    "                    <div  ng-if=\"!comment.showAddFile\">\n" +
    "                        <button class=\"btn btn-xs btn-success\"\n" +
    "                                ng-click=\"comment.showAddFile = true\">Add New Note File</button>\n" +
    "                        <ul>\n" +
    "                            <li ng-if=\"comment.files.length > 0\" ng-repeat=\"file in comment.files\"><a ng-href=\"/api/v1/files/{{file.id}}\" target=\"blank\">{{file.filename}}</a>\n" +
    "                                {{pfModalCtrl.project.comments.length}}\n" +
    "                                <button class=\"btn btn-danger btn-xs\" ng-click=\"pfModalCtrl.deleteFile(file.id)\"><i class=\"glyphicon glyphicon-remove\"></i></button>\n" +
    "                            </li>\n" +
    "                            <li ng-if=\"!comment.files.length > 0\" >No files for this note.</li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div>\n" +
    "                        <div class=\"col-12\">\n" +
    "                            <div ng-if=\"comment.showAddFile\">\n" +
    "                                Select File:  <input type=\"file\" file-reader=\"comment\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-12\">\n" +
    "                            <button ng-if=\"comment.showAddFile\" class=\"btn btn-primary\" type=\"button\" ng-click=\"pfModalCtrl.save(comment)\">Save</button>\n" +
    "                            <button ng-if=\"comment.showAddFile\" class=\"btn btn-primary\" type=\"button\" ng-click=\"comment.showAddFile = false\">Cancel</button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr ng-if=\"!pfModalCtrl.project.comments.length > 0\">\n" +
    "                <td colspan=\"2\">No Comments or Notes For This Project</td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">OK</button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("project/items/template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("project/items/template.tpl.html",
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
    "        <div class=\"form-group\">\n" +
    "            <label class=\"col-md-4 control-label\">Visibility</label>\n" +
    "            <div class=\"col-md-4 \" >\n" +
    "                <div class=\"panel panel-default\">\n" +
    "                    <div class=\"panel-heading\">Available Users:</div>\n" +
    "                    <div class=\"panel-body\">\n" +
    "                        <a ng-repeat=\"user in Ctrl.newRow.unassignedUsers\" href=\"\"\n" +
    "                           ng-click=\"\n" +
    "                       Ctrl.newRow.users.push(user);\n" +
    "                       Ctrl.newRow.unassignedUsers.splice(Ctrl.newRow.unassignedUsers.indexOf(user),1);\">\n" +
    "                            {{user.name}}<span ng-if=\"!$last\">,</span></a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"panel panel-default\">\n" +
    "                    <div class=\"panel-heading\">Assigned Users:</div>\n" +
    "                    <div class=\"panel-body\">\n" +
    "                        <a ng-repeat=\"user in Ctrl.newRow.users\" href=\"\"\n" +
    "                           ng-click=\"\n" +
    "                       Ctrl.newRow.unassignedUsers.push(user);\n" +
    "                       Ctrl.newRow.users.splice(Ctrl.newRow.users.indexOf(user),1);\">\n" +
    "                            {{user.name}}<span ng-if=\"!$last\">,</span></a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
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
    "<div id=\"action_buttons\"  ng-if=\"Ctrl.user.isAdmin\">\n" +
    "    <input class=\"btn btn-xs btn-primary\" ng-if=\"!Ctrl.showNewProjectRow\" type=\"button\" value=\"Add Project\" ng-click=\"Ctrl.showNewRow()\"/>\n" +
    "    <input class=\"btn btn-xs btn-success\" ng-if=\"Ctrl.showNewProjectRow\" type=\"button\" value=\"Commit\" ng-click=\"Ctrl.saveNewRow()\"/>\n" +
    "    <input class=\"btn btn-xs btn-danger\" ng-if=\"Ctrl.showNewProjectRow\" type=\"button\" value=\"Cancel\" ng-click=\"Ctrl.resetNewRow();Ctrl.showNewProjectRow=false\"/>\n" +
    "</div>\n" +
    "<table ng-if=\"Ctrl.user.isAdmin\">\n" +
    "    <tbody>\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            Filter:\n" +
    "            <select ng-init=\"Ctrl.projectStateFilter = 'active'\" ng-model=\"Ctrl.projectStateFilter\">\n" +
    "                <option value=\"active\" selected=\"true\">Active</option>\n" +
    "                <option value=\"archived\">Archived</option>\n" +
    "                <option value=\"trashed\">Trashed</option>\n" +
    "                <option value=\"all\">All</option>\n" +
    "            </select>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "</table>\n" +
    "<div id=\"project_tables\" >\n" +
    "    <table id=\"project_table\" style=\"width:100%\" class=\"table table-hover table-condensed table-bordered table-striped \">\n" +
    "        <thead>\n" +
    "        <tr style=\"border:1px solid gray;background:lightgrey;\">\n" +
    "            <th></th>\n" +
    "            <th>Date</th>\n" +
    "            <th>Project Summary</th>\n" +
    "            <th>Task Person</th>\n" +
    "            <th>Action Required</th>\n" +
    "            <th>Action Completed</th>\n" +
    "            <th>Notes</th>\n" +
    "            <th><i class=\"glyphicon glyphicon-fire\"></i> </th>\n" +
    "            <th><i class=\"glyphicon glyphicon-file\"></i> </th>\n" +
    "            <th  ng-if=\"Ctrl.user.isAdmin\"><i class=\"glyphicon glyphicon-trash\"></i></th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody ui-sortable=\"Ctrl.sortableOptions\" ng-model=\"Ctrl.activeProjects\" class=\"list\">\n" +
    "        <tr ng-if=\"(Ctrl.projectStateFilter == 'active') || (Ctrl.projectStateFilter == 'all') || (Ctrl.user.isAdmin==0)\"\n" +
    "            ng-repeat=\"project in Ctrl.activeProjects | filter:{'deleted_at':null}\">\n" +
    "            <td class=\"myHandle\">\n" +
    "                <i class=\"glyphicon glyphicon-move\"></i>\n" +
    "            </td>\n" +
    "            <td>{{project.created_at}}</td>\n" +
    "            <td>\n" +
    "                <a ui-sref=\"project.item({id:project.id})\">{{project.summary}}</a>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                {{project.tasks[0].assignee.name || 'Not Assigned'}}\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                {{project.tasks[0].deliverable}}\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                {{project.tasks[0].delivered}}\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <button class=\"btn-primary btn btn-xs\" ng-click=\"Ctrl.openNotesModal(project.comments)\">\n" +
    "                    <i class=\"glyphicon glyphicon-zoom-in\"></i>\n" +
    "                </button>\n" +
    "                {{project.comments[0].comment}}\n" +
    "            </td>\n" +
    "            <td ng-style=\"{'background-color':'hsla('+ Ctrl.getPriorityGradient()[$index]+',100%,50%,1)'}\">\n" +
    "                {{project.tasks[0].prority}}\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <button class=\"btn-rimary btn btn-xs\" ng-click=\"Ctrl.openProjectFilesModal(project)\">\n" +
    "                    <i class=\"glyphicon glyphicon-file\"></i>\n" +
    "                </button>\n" +
    "            </td>\n" +
    "            <td ng-if=\"Ctrl.user.isAdmin\">\n" +
    "                <input  class=\"btn btn-sm btn-warning\" type=\"button\" ng-click=\"Ctrl.archiveProject(project)\" value=\"X\"/>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "        <tbody>\n" +
    "        <tr ng-if=\"(Ctrl.projectStateFilter == 'archived') || (Ctrl.projectStateFilter == 'all')\"\n" +
    "            ng-repeat=\"project in Ctrl.projects | filter: {'state':'0','deleted_at':null} | orderBy:'order_by'\">\n" +
    "            <td><div  style=\"width:15px;height:15px;background:transparent;\"></div></td>\n" +
    "            <td>{{project.created_at}}</td>\n" +
    "            <td><a ui-sref=\"project.item({id:project.id})\">{{project.summary}}</a></td>\n" +
    "            <td>{{project.tasks[0].assignee.name || 'Not Assigned'}}</td>\n" +
    "            <td>{{project.tasks[0].deliverable}}</td>\n" +
    "            <td>{{project.tasks[0].delivered}}</td>\n" +
    "            <td><button class=\"btn-primary btn btn-xs\" ng-click=\"Ctrl.openNotesModal(project.comments)\"><i class=\"glyphicon glyphicon-zoom-in\"></i></button> {{project.comments[0].comment}} </td>\n" +
    "            <td ng-style=\"{'background-color':'grey'}\"></td>\n" +
    "            <td>\n" +
    "                <button class=\"btn-rimary btn btn-xs\" ng-click=\"Ctrl.openProjectFilesModal(project)\">\n" +
    "                    <i class=\"glyphicon glyphicon-file\"></i>\n" +
    "                </button>\n" +
    "            </td>\n" +
    "            <td ng-if=\"Ctrl.user.isAdmin\">\n" +
    "                <button class=\"btn btn-xs btn-danger\"  type=\"button\" ng-click=\"Ctrl.trashProject(project)\">     <i class=\"glyphicon glyphicon-remove-circle\"></i></button>\n" +
    "                <button class=\"btn btn-xs btn-success\"  type=\"button\" ng-click=\"Ctrl.activateProject(project)\"> <i class=\" glyphicon glyphicon-check\"></i></button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "        <tbody>\n" +
    "        <tr ng-if=\"(Ctrl.projectStateFilter == 'trashed') || (Ctrl.projectStateFilter == 'all')\"\n" +
    "            ng-repeat=\"project in Ctrl.projects | filter: {'deleted_at':''}\">\n" +
    "            <td><div  style=\"width:15px;height:15px;background:transparent;\"></div></td>\n" +
    "            <td>{{project.created_at}}</td>\n" +
    "            <td><a ui-sref=\"project.item({id:project.id})\">{{project.summary}}</a></td>\n" +
    "            <td>{{project.tasks[0].assignee.name || 'Not Assigned'}}</td>\n" +
    "            <td>{{project.tasks[0].deliverable}}</td>\n" +
    "            <td>{{project.tasks[0].delivered}}</td>\n" +
    "            <td><button class=\"btn-primary btn btn-xs\" ng-click=\"Ctrl.openNotesModal(project.comments)\"><i class=\"glyphicon glyphicon-zoom-in\"></i></button> {{project.comments[0].comment}} </td>\n" +
    "            <td ng-style=\"{'background-color':'black'}\"></td>\n" +
    "            <td>\n" +
    "                <button class=\"btn-rimary btn btn-xs\" ng-click=\"Ctrl.openProjectFilesModal(project)\">\n" +
    "                    <i class=\"glyphicon glyphicon-file\"></i>\n" +
    "                </button>\n" +
    "            </td>\n" +
    "            <td ng-if=\"Ctrl.user.isAdmin\">\n" +
    "                <button class=\"btn btn-xs btn-danger\"  type=\"button\" ng-click=\"Ctrl.deleteProject(project)\" ><i class=\"glyphicon glyphicon-remove-circle\"></i></button>\n" +
    "                <button class=\"btn btn-xs btn-success\"  type=\"button\" ng-click=\"Ctrl.restoreProject(project)\" ><i class=\" glyphicon glyphicon-check\"></i></button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>\n" +
    "\n" +
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
