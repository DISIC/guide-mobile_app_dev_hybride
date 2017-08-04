First we will introduce Cordova and ngCordova to ensure their differences are understood. We will see how to add plugins in our app and how this can interfere with its accessibility.


# Cordova v5.0.0

Cordova allows creating native apps using HTML, CSS and JavaScript. These apps can then be distributed on mobile app stores. It is possible to add plugins to interact natively with the mobile (RFID reader, alarms, notifications...), all interactions that are mostly impossible from a mobile website.

Cordova encapsulates the web app in a native WebView container. A native WebView container can be assimilated to a browser without an address bar, which means that Cordova supports most of the functions of mobile browsers. Much of the mobile web accessibility rules apply to development under Cordova.

In particular, these rules are shared by both domains:

* Use logical reading order;
* Add alternatives to images if necessary;
* Use appropriate semantics;
* Manage the focus correctly;
* Use sufficient contrast for text.

In general, it is necessary to follow the criteria of [<abbr lang="fr" title="Référentiel général d'accessibilité pour les administrations">RGAA</abbr> 3](https://disic.github.io/rgaa_referentiel_en/criteria.html) extended by the [list of criteria specific to mobile / tactile platforms](https://github.com/DISIC/referentiel-mobile-tactile/blob/en/mobile-touch-guidelines-criteria.md).

The difficulty with mobile web accessibility is that all the gestures are intercepted by the screen reader. The swipe to the right with the screen reader lets you move to the next item, and will not send any `touch` event. Some WAI-ARIA design patterns are not mobile-friendly. Indeed, on devices that only have a touch screen, and no physical keyboard, only the `click` event is available. Patterns like `slider` and `treeview`, that require the use of the right arrow key, cannot be applied.
This invalidates some WAI-ARIA design patterns, [see list here](https://github.com/w3c/aria-practices/issues/8).

## ngCordova v0.1.17-alpha

ngCordova was created by the Ionic team to enhance your AngularJs app by calling the Cordova plugins most commonly used.
A Cordova plugin will allow you to code native interactions with the device from your JavaScript code.

## Creating an accessible app with ngCordova

### Installing ngCordova
You can easily install ngCordova with bower.

```shell
bower install ngCordova
```

Then, just add the script to the index.html file

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="lib/ngCordova/dist/ng-cordova.js"></script>
    <script src="cordova.js"></script>
  </head>
  <body>
    …
  </body>
</html>
```

Then inject the AngularJs module into our app.

```javascript
angular.module('myApp', ['ngCordova'])
```

We have access to a multitude of AngularJs wrappers for our Cordova plugins. Each Cordova plugin will now be installed one by one. This way, we start with a fairly light app that will gradually grow with new features.
[List of ngCordova plugins](http://ngcordova.com/docs/plugins/)

### The ngCordova plugins

To create an accessible app with ngCordova, we have the choice between several plugins. For simplicity, plugins can be grouped into 2 categories:

* plugins offering services (local database, geolocation, Google Analytics...) that will not have impact on accessibility;
* plugins for user interfaces (ActionSheet, Notification, Dialogs...) which must be audited to validate their accessibility.

Unfortunately, it will not be possible to fix the user interface's plugin accessibility from the JavaScript code, which will often make the plugin unusable until the bug is fixed in the original plugin.

#### $cordovaActionSheet v1.1.7

$cordovaActionSheet is totally different from $ionicActionSheet. $cordovaActionSheet is called in JavaScript and uses either `UIActionSheet` for iOS or `AlertDialog` for Android. $ionicActionSheet is entirely based on HTML, JavaScript and CSS. Using $cordovaActionSheet gives you the benefits of native design patterns in each OS.


<img alt="$cordovaActionSheet on iOS" src="img/actionSheet-ios.png" width="235"/>
<img alt="$cordovaActionSheet on Android" src="img/actionSheet-android.png" width="235"/>

It can be installed using the following commands:

```shell
cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-actionsheet.git --save
cordova prepare
```

The documentation provides this example:

```javascript
module.controller('ThisCtrl', function($cordovaActionSheet) {

  var options = {
    title: 'What do you want with this image?',
    buttonLabels: ['Share via Facebook', 'Share via Twitter'],
    addCancelButtonWithLabel: 'Cancel',
    androidEnableCancelButton : true,
    winphoneEnableCancelButton : true,
    addDestructiveButtonWithLabel : 'Delete it'
  };

  document.addEventListener("deviceready", function () {

    $cordovaActionSheet.show(options)
      .then(function(btnIndex) {
        var index = btnIndex;
      });
  }, false);

});
```

When tested, the action opens the native OS components directly. As a result, the potential problems would be due to the OS. In this case, the modal window has the right semantics, user interactions and focus management.

Documentation: http://ngcordova.com/docs/plugins/actionSheet


#### $cordovaToast v2.1.1

$cordovaToast is an implementation that differs from the previous one. Indeed, it is a native interaction created from several native sub-elements.

Toast is a native implementation in the Android OS that allows short notifications to be sent to the user. However, there is no direct equivalent implementation in iOS, so the creator of the plugin recreated the appearance of a Toast notification in iOS.

<img alt="$cordovaToast on iOS" src="img/toast-ios.png" width="235"/>
<img alt="$cordovaToast on Android" src="img/toast-android.png" width="235"/>

It can be installed using the following commands:

```shell
cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
cordova prepare
```

The documentation provides this example:

```javascript
module.controller('MyCtrl', function($scope, $cordovaSpinnerDialog) {

  $cordovaSpinnerDialog.show("title","message", true);

  $cordovaSpinnerDialog.hide();
});
```

During testing, the message is correctly spoken out in Android. There is a problem with the iOS version, because the notification does not trigger any messages in VoiceOver. Here, the problem comes from the implementation of the Toast-PhoneGap-Plugin plugin, so it is not possible to fix via JavaScript code, you have to rewrite part of the Objective-C code to send a notification to VoiceOver.

Opening an issue or submitting a fix is ​​the best alternative to keep the project maintainable.

Documentation: http://ngcordova.com/docs/plugins/toast

## Conclusion

Cordova can be used to create a simple accessible app if the developer complies with the mobile accessibility rules. It is important to note that some ARIA design patterns will not be adapted to touch-only devices. In general, Cordova is suitable for mobile projects with a simple technical level; the same goes for accessibility. With regards to plugins, accessibility is left to the creator's good will. It is therefore important to test the plugin beforehand, in order to validate its accessibility.

## Licence
This document is the property of the <span lang="fr">Secrétariat général à la modernisation de l'action publique</span> (SGMAP). It is placed under [Open Licence 1.0 or later (PDF, 541 kb)](http://ddata.over-blog.com/xxxyyy/4/37/99/26/licence/Licence-Ouverte-Open-Licence-ENG.pdf), equivalent to a Creative Commons BY licence. To indicate authorship, add a link to the original version of the document available on the [DINSIC's GitHub account](https://github.com/DISIC).