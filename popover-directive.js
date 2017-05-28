var app = ng.module('popover.module', []);
app.directive('popover', function($compile, $timeout, $window, uiFact){
  function link(scope, ele, attr) {
    var partial;
    var dropdown;
    scope.showdropdown = false;
    scope._uuid = parseInt(Math.random() * 1000, 10);
    var addBodyListener = function () {
      document.addEventListener('click', listener);
    };
    var removeBodyListener = function () {
      document.removeEventListener('click', listener);
    };
    var listener = function (event) {
          var flag = false;
          var ele = event.target;
          event.stopPropagation();
          while (ele) {
            if (uiFact._uuid === Number(ele.getAttribute('id'))) {
              flag = true;
            }
            ele = ele.parentElement;
          }
          if (flag === false) {
            scope.$apply(function () {
              scope.showdropdown = false;
            });
            removeBodyListener();
          }
        };
     scope.display = function (event) {
       if (event.target === event.currentTarget) {
         scope.showdropdown = !scope.showdropdown;
        if (scope.showdropdown) {
          addBodyListener();
          uiFact._uuid = scope._uuid;
          return;
        }
        removeBodyListener();
      }
    }
    partial =   '<div id="{{_uuid}}" class="popover" style="width: {{width}}px">' +
                  '<button ng-click="display($event)" class="button primary">{{title}}</button>' +
                    '<div ng-if="showdropdown" class="container" style="width: {{width}}px">' +
                    '<div class="tip-left"></div>' +
                    '<p class="title">{{head}}</p>' +
                     '<div class="content pad" ng-include=template>/div></div></div>'

    scope.showpopup = false;
    var popover = ele.append($compile(partial)(scope));
  }
  return {
    scope: {
      template: '@',
      title: '=',
      width: '@',
      head: '@'
    },
    restrict: 'EA',
    link: link,
  }
});
app.factory('uiFact', function () {
  return {
  _uuid: 0
};
});
