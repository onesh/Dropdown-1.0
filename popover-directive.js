var app = ng.module('popover.module', []);
app.directive('popover', function($compile, $timeout, $window, uiFact){
  function link(scope, ele, attr) {
    var partial;
    var dropdown;
    var template;
    var obj = {
      k1: "val1",
      k11: {
        k2: {
          k3: "v11",
          k17:  {
            k4: {
              k5: {
                k6: "v4",
                k7:{ k8: "v5" , k9: "v8", k10: "v12"}
              },
              k13: "v2"
            }
          }
        }
      },
      k4: {
        k5: {
          k6: "v2"
        }
      },
      k7: "v3"
    }
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
    };
    scope.toggle = function (eve) {
    ele = eve.target.nextElementSibling;
    debugger;
      ele.childNodes.forEach(function (e) {
        var el = e;
        e = ng.element(e);
        if (e.hasClass('ng-hide')) {
          eve.target.innerHTML = 'add';
          e.removeClass('ng-hide');
        } else if (!e.hasClass('ng-hide')) {
          eve.target.innerHTML = 'remove';
          e.addClass('ng-hide');
        }
      });
    };
    template =  '<div id="{{_uuid}}" class="popover" style="width: {{width}}px">' +
                  '<button ng-click="display($event)" class="button primary">{{title}}</button>' +
                    '<div ng-if="showdropdown" class="container" style="width: {{width}}px">' +
                    '<div class="tip-left"></div>' +
                    '<p class="title">{{head}}</p>' +
                     '<div class="content pad">';

     partials = {
      listEnd: '</div></div></div>',
      list: []
    };
    var isUsableObject = function(val) {
        return _.isObject(val) && !(
        _.isArray(val)|| _.isFunction(val) || _.isRegExp(val) || _.isNumber(val) || _.isString(val) || _.isElement(val) || _.isDate(val)
        );
      };


  var result = []
  var iterator = function (obj, val) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
       if (isUsableObject(obj[keys[i]], false) === true) {
         val === true ? result.push('<i class="material-icons cursor" ng-click="toggle($event)">add</i><ul>' + keys[i]) : result.push('<i class="material-icons cursor ng-hide" ng-click="toggle($event)">add</i><ul class="ng-hide">' + keys[i])
        //  result.push('<i class="material-icons cursor" ng-click="toggle($event)">add</i><ul>' + keys[i]);
         iterator(obj[keys[i]], false);
       } else if (typeof obj[keys[i]] === 'string') {
         val === true ? result.push('<li class="list-element">' +  keys[i] + ' ' + obj[keys[i]] + '</li>') : result.push('<li class="list-element ng-hide">' +  keys[i] + ' ' + obj[keys[i]] + '</li>');
       } if (i === keys.length -1) {
         result.push('</ul>');
         // result[keys[i]] = (obj[keys[i]]);
   		 }
     }
  }
    iterator(obj, true);
    partials.list = result.join('');
    scope.showpopup = false;
    var popover = ele.append($compile(template + partials.list + partials.listEnd)(scope));
  }
  return {
    scope: {
      template: '@',
      title: '=',
      width: '@',
      head: '@',
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
