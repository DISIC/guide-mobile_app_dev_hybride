
angular.module('$mobileAccessibility', [])
.provider("$mobileA11yScreenReaderStatus", function(){
  var _this = this;

  // Default config
  this.cssClass = {
    addClass: true,
    screenReaderOn: "sr-on",
    screenReaderOff: "sr-off"
  };

  this.config = function (config) {
    angular.extend(this.cssClass, config);
  };

  this.changeBodyClass = function (isRunning) {
    if (isRunning) {
      //screen reader is running
      document.body.classList.add(_this.cssClass.screenReaderOn);
      document.body.classList.remove(_this.cssClass.screenReaderOff);
    } else {
      //screen reader is off
      document.body.classList.add(_this.cssClass.screenReaderOff);
      document.body.classList.remove(_this.cssClass.screenReaderOn);
    }
  };

  this.$get = function($rootScope, $window, $timeout) {

    var screenReaderStatus = function (isRunning) {
      $timeout(function () {
        $rootScope.$broadcast('$mobileAccessibilityScreenReaderStatus:status', isRunning);
      });
      if (_this.cssClass.addClass) {
        _this.changeBodyClass(isRunning);
      }
    };

    var a11yStatus = function (status) {
      screenReaderStatus(status.isScreenReaderRunning);
    };



    document.addEventListener("deviceready", function () {
      // start once for android 4.3
      MobileAccessibility.isScreenReaderRunning(screenReaderStatus);

      // events doesn't seems to work on android 4.3
      $window.addEventListener(MobileAccessibilityNotifications.SCREEN_READER_STATUS_CHANGED, a11yStatus, false);
    }, false);
    return true;
  };
});