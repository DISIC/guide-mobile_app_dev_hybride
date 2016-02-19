
angular.module('a11y-ionic', ['$mobileAccessibility'])
.run(function($rootScope, $mobileA11yScreenReaderStatus) {
  function isScreenReaderRunningCallback(event, boolean) {
    var element = document.body;
    if (boolean) {
      console.log("Screen reader: ON");
      element.setAttribute("data-tap-disabled", "true");
    } else {
      console.log("Screen reader: OFF");
      element.setAttribute("data-tap-disabled", "false");
    }
  }

  $rootScope.$on('$mobileAccessibilityScreenReaderStatus:status', isScreenReaderRunningCallback);
})
.directive('ionToggleAlly', [
  '$timeout',
  '$ionicConfig',
function($timeout, $ionicConfig) {

  return {
    restrict: 'E',
    replace: true,
    require: '?ngModel',
    transclude: true,
    template:
      '<label class="item item-toggle">' +
        '<div ng-transclude></div>' +
        '<div class="toggle">' +
          '<input type="checkbox">' +
          '<div class="track">' +
            '<div class="handle"></div>' +
          '</div>' +
        '</div>' +
      '</label>',

    compile: function(element, attr) {
      var input = element.find('input');
      angular.forEach({
        'name': attr.name,
        'ng-value': attr.ngValue,
        'ng-model': attr.ngModel,
        'ng-checked': attr.ngChecked,
        'ng-disabled': attr.ngDisabled,
        'ng-true-value': attr.ngTrueValue,
        'ng-false-value': attr.ngFalseValue,
        'ng-change': attr.ngChange,
        'ng-required': attr.ngRequired,
        'required': attr.required
      }, function(value, name) {
        if (angular.isDefined(value)) {
          input.attr(name, value);
        }
      });

      if (attr.toggleClass) {
        element[0].getElementsByTagName('div')[1].classList.add(attr.toggleClass);
      }

      element.addClass('toggle-' + $ionicConfig.form.toggle());

      return function($scope, $element) {
        var el = $element[0].getElementsByTagName('div')[1];
        var checkbox = el.children[0];
        var track = el.children[1];
        var handle = track.children[0];

        var ngModelController = angular.element(checkbox).controller('ngModel');

        $scope.toggle = new ionic.views.Toggle({
          el: el,
          track: track,
          checkbox: checkbox,
          handle: handle,
          onChange: function() {
            if (ngModelController) {
              ngModelController.$setViewValue(checkbox.checked);
              $scope.$apply();
            }
          }
        });

        $scope.$on('$destroy', function() {
          $scope.toggle.destroy();
        });
      };
    }

  };
}])
.directive('ionRadioAlly', function() {
  return {
    restrict: 'E',
    replace: true,
    require: '?ngModel',
    transclude: true,
    template:
      '<label class="item item-radio">' +
        '<input type="radio" name="radio-group">' +
        '<div class="item-content disable-pointer-events" ng-transclude></div>' +
        '<i aria-hidden="true" class="radio-icon disable-pointer-events icon ion-checkmark"></i>' +
      '</label>',

    compile: function(element, attr) {
      if (attr.icon) {
        element.children().eq(2).removeClass('ion-checkmark').addClass(attr.icon);
      }

      var input = element.find('input');
      angular.forEach({
          'name': attr.name,
          'value': attr.value,
          'disabled': attr.disabled,
          'ng-value': attr.ngValue,
          'ng-model': attr.ngModel,
          'ng-disabled': attr.ngDisabled,
          'ng-change': attr.ngChange,
          'ng-required': attr.ngRequired,
          'required': attr.required
      }, function(value, name) {
        if (angular.isDefined(value)) {
            input.attr(name, value);
          }
      });

      return function(scope, element, attr) {
        scope.getValue = function() {
          return scope.ngValue || attr.value;
        };
      };
    }
  };
})
.config(function ($mobileA11yScreenReaderStatusProvider) {
  //Exemple de configuration
  $mobileA11yScreenReaderStatusProvider.config({
    screenReaderOn: "sr-on",
    screenReaderOff: "sr-off"
  });
});