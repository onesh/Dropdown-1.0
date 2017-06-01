window.ng = window.angular;
var app = ng.module('app', ['popover.module']);
function controller ($scope) {
$scope.title = "popover"
};
controller.$inject = ['$scope'];
app.controller('ctrl', controller);
//vansh is drinking with abhishek
