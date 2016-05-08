angular.module('templates-common', ['services/modal/login/login.tpl.html', 'services/modal/select/default.tpl.html']);

angular.module("services/modal/login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("services/modal/login/login.tpl.html",
    "<!-- views/loginModalTemplate.html -->\n" +
    "\n" +
    "<div ng-controller=\"LoginModalCtrl as Ctrl\">\n" +
    "\n" +
    "        <div class=\"form-group col-xs-12 col-sm-6 col-md-6 col-lg-6\">\n" +
    "            <div class=\"form-control\">\n" +
    "                User Type:\n" +
    "                <a href=\"#\" editable-select=\"Ctrl.userId\" e-ng-options=\"o.value as o.text for o in Ctrl.userTypeOptions\">\n" +
    "                    {{ Ctrl.showUserTypeOptions() }}\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <button ng-click=\"Ctrl.submit()\">Submit</button>\n" +
    "        <button ng-click=\"Ctrl.cancel()\">Cancel</button>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div style=\"display: none;\">\n" +
    "        <form ng-submit=\"Ctrl.submit()\">\n" +
    "            <input type=\"email\" ng-model=\"_email\" />\n" +
    "            <input type=\"password\" ng-model=\"_password\" />\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("services/modal/select/default.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("services/modal/select/default.tpl.html",
    "<!-- views/loginModalTemplate.html -->\n" +
    "\n" +
    "<div >\n" +
    "default\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>");
}]);
