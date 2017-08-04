# Initialization of a project

## Ionic
To get started, you can use the command line tool from Ionic to quickly create the app structure.

```shell
ionic start sgmapApp blank
```

The generated page can be audited with the screen reader. The title "Ionic Blank Starter" is correctly read by the screen reader, and additionally iOS indicates the heading level.


### Creating AngularJs modules for accessibility

To create an accessible Ionic app, we will create 2 AngularJs modules.
As a reminder, the purpose of an AngularJs module is to be easily reusable in several apps.

The first module will fix accessibility bugs in Ionic:

* Poor events management
* Correction of CSS (focusable elements, propagation control of the [pointer-events] events...)
* HTML structure 

The second module will implement the native mobile accessibility API in the AngularJs context.
This will allow all AngularJs apps in a hybrid context to use this API (Ionic, OnsenUI, AngularJs + Bootstrap...).

#### phonegap-mobile-accessibility

The second module will be implemented from the PhoneGap mobile accessibility plugin.
Thanks to this plugin we can know the accessibility options selected by the user and the plugin can interact with the screen reader.
More details on this page: https://github.com/phonegap/phonegap-mobile-accessibility

Initially, the AngularJs module will implement only the screen reader status feedback.

```javascript
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

      // events doesn't seem to work on android 4.3
      $window.addEventListener(MobileAccessibilityNotifications.SCREEN_READER_STATUS_CHANGED, a11yStatus, false);
    }, false);
    return true;
  };
});
```

This way, each time the screen reader status changes, an AngularJs event will be sent.
This event will be used to adapt the app's behavior to the status of the screen reader.
In addition, on the BODY element, the `sr-on` CSS class will be added if the screen reader is enabled, and `sr-off` when ​​it is off.

We can, therefore, create a style sheet to help us design the accessible app.

```css
.sr-off .sr-on-only ,
.sr-on .sr-off-only {
  display: none !important;
}
```

We now have 2 CSS classes: one to display a block only when the screen reader is active (`.sr-on-only`) and the second only when it is off (`.sr-off-only`)

### Profiling and remote debugging on mobile

To develop an accessible mobile app in good conditions, the first rule is to be able to debug it easily.
Ionic greatly facilitates the development and debugging phases.
One of the interesting options is "livereload" on Android. The livereload option updates the app every time the code is changed.

```shell
ionic run android -l
```

The second option will get returns from the JavaScript console directly in the app launch terminal.

```shell
ionic run android -c
```

In this way you can easily debug the JavaScript part. Unfortunately, the Ionic tools will not access the CSS code, this is where Safari and Chrome remote debugging tools come into play.

Remote debugging tools will access, from the computer, to the web development tools of the running mobile app. It can be used on Android 4.4+ and iOS 6+ platforms. For earlier versions, only Ionic tools will help.

Article: [Testing Mobile: Emulators, Simulators And Remote Debugging](http://www.smashingmagazine.com/2014/09/testing-mobile-emulators-simulators-remote-debugging/2/)


## OnsenUI

To get started, you can use Cordova's command-line tool to quickly create the app structure.

```shell
cordova create test io.onsen.testapp TestApp
```

Download one of the [templates available on OnsenUI's website](http://components.onsen.io/patterns)

Copy the contents of the downloaded template into the directory created at the previous step ("TestApp").

Add a platform, Android or iOS:
```shell
cordova platform add android
```

Finally, you can run the project in the simulator, by going to the project directory:
```shell
cordova emulate
```


## Licence
This document is the property of the <span lang="fr">Secrétariat général à la modernisation de l'action publique</span> (SGMAP). It is placed under [Open Licence 1.0 or later (PDF, 541 kb)](http://ddata.over-blog.com/xxxyyy/4/37/99/26/licence/Licence-Ouverte-Open-Licence-ENG.pdf), equivalent to a Creative Commons BY licence. To indicate authorship, add a link to the original version of the document available on the [DINSIC's GitHub account](https://github.com/DISIC).