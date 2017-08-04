
# Ionic

_(Translator's note: at the time of writing the original document, Ionic was in version 1.0.1. Some statements developed below may be outdated; however, the core approach for this tutorial remains valid)._

We will study the interface components from Ionic in version 1.0.1 "vanadium-vaquita" (2015-06-30).

There are no documentation or components dedicated to accessibility in Ionic, although there are [accessibility-related issues on the project repository](https://github.com/driftyco/ionic/issues?utf8=%E2%9C%93&q=%20label%3Aaccessibility%20). Note that accessibility was not a priority of the Ionic team for version 1.0.1.

## Fixes for Ionic

### JavaScript module

The guidelines for Ionic are not very flexible because templates are not customizable. This means that any correction must be made in a new directive by copying the faulty one.
In the module and directives, Ionic renamed the Angular functions to simplify writing. When copying a directive, it will therefore be necessary to migrate certain functions. Here is the [list](https://github.com/driftyco/ionic/blob/v1.0.1/js/angular/main.js):

* extend = angular.extend
* forEach = angular.forEach
* isDefined = angular.isDefined
* isNumber = angular.isNumber
* isString = angular.isString
* jqLite = angular.element
* noop = angular.noop

If we copy a directive containing `forEach`, we will need to rename the function to `angular.forEach` ([Example with ion-toggle](#ion-toggle)).

When copying a directive, it must be renamed so as not to interfere with the former one.
In our example, all recopied directives have been renamed by adding `-ally` (example: `ion-toggle` becomes `ion-toggle-ally`).

### CSS module

The CSS module can be used to fix some accessibility issues in Ionic. They can be of several natures:

* Events are blocked by the `pointer-events:none` property and clicks are no longer passed to the JavaScript app;
* An HTML element is not focusable and therefore cannot be used by the screen reader;
* Contrasts are not sufficient and it is necessary to enhance them.


## General issues

When using the framework, the errors found are:

* Screen reader events are intercepted by Ionic under Android 4.3 and 4.4, preventing user interaction;
* It is impossible to scroll with the iOS screen reader.

## Patches applied to interpret Android screen reader events

When testing with Android 4.3 and Android 4.4, you cannot click or change the status of a checkbox with TalkBack. Events are intercepted by Ionic to reduce the latency of 300ms ([explanations here](http://blog.ionic.io/hybrid-apps-and-the-curse-of-the-300ms-delay/)).
This interception must be thus disabled by adding the `data-tap-disabled="true"` attribute to the `<body>` tag.

```html
<body ng-app="starter" data-tap-disabled="true">
…
</body>
```

Disabling the tap delay makes the app much slower when the screen reader is idle. This feeling of latency must therefore be corrected.


### Fixing the latency feeling in Ionic

One of the strengths of the hybrid implementation is that we can partly access to the native API from our JavaScript app. For example, you can fetch the screen reader status to fix a bug inherent to the Ionic framework.
The purpose is to change the `data-tap-disabled` attribute depending on the screen reader.

```javascript
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
```

This way, if the screen reader is turned on, `click` events will not be blocked by Ionic and you can change the status of checkboxes. And when the screen reader is turned off, the 300 ms delay will be removed to give a native app feeling.

## Fixing scrolling on iOS

Ionic was created when web native `scroll` events were not implemented yet. They had to re-implement the `scroll` events in JavaScript. Since then, Android 4.1 has implemented native `scroll` events, but iOS WebViews do not support this implementation. So the VoiceOver scrolls in iOS are intercepted by Ionic. This prevents properly scrolling down with a screen reader.

When the CSS are turned off, the scrolling function works correctly. It is therefore necessary to find the class and then the faulty property to fix this bug.

This search can be very tedious or even impossible without the help of remote debugging. With successive tests, it can be found out that the `.scroll-content` and `.pane` classes are involved, it is necessary to return to the static position. Additionally, by adding the `.platform-ios` and `.sr-on` classes, we can make this correction only for the iOS platform with an active screen reader.

```css
.platform-ios.sr-on .pane,
.platform-ios.sr-on .scroll-content{
  position: static;
}
```

By adding this correction, it is necessary to make a style adjustment for the header.

```css
.platform-ios.sr-on .scroll-content{
  overflow-y: auto;
}

.scroll-content.has-header > .scroll {
  margin-top: 44px;
}
```

In this way, scrolling in iOS works correctly. However, it is possible that other style regressions may occur in particular cases when using Ionic. The best course of action would be a fix by the Ionic team, which has a better overview of the project.


## ion Forms

[Ionic Components Documentation](http://ionicframework.com/docs/components/#overview)

Ionic provides several input types:

* Placeholder Labels
* Inline Labels
* Stacked Labels
* Floating Labels
* Inset Forms
* Inset Inputs
* Input Icons
* Header Inputs

For the `Placeholder Labels`, `Inset Forms`, `Insert Inputs`, `Input Icons`, `Header Inputs` components, the reported errors are:

* The use of placeholder is not a replacement for the label, as the  placeholder disappears when user starts filling the field;
* The label is empty.

For the `Floating Labels` component, the error is:

* The field label and its associated field are not adjacent. The label is not visible.

For the `Inline Labels` and `Stacked Labels` components, the error is:

* Absence of the `for` attribute on the label and of the corresponding `id` on the input field.

### Inaccessible Components

Placeholder Labels, Inset Forms, Inset Inputs, Input Icons, Header Inputs, Floating Labels cannot be fixed without completely changing their appearance, as intended by Ionic.

### Applied patches

To fix accessibility issues on the `Inline Labels` and `Stacked Labels` components, we added the `for` attribute on the label and the corresponding `id` on the field.

#### Fix for the Inline Labels input

<img src="img/inline-label.png" alt="Inline Labels">

```html
<div class="list">
  <label for="username" class="item item-input">
    <span class="input-label">Username</span>
    <input id="username" type="text">
  </label>
</div>
```


#### Fix for the Stacked Labels input

<img src="img/stacked-label.png" alt="Stacked Labels">

```html
<div class="list">
  <label for="first-name" class="item item-input item-stacked-label">
    <span class="input-label">First Name</span>
    <input id="first-name" type="text" placeholder="John">
  </label>
</div>
```

## ion-checkbox

[Documentation for ion-checkbox in Ionic](http://ionicframework.com/docs/v1/1.3.2/api/directive/ionCheckbox/)

<img src="img/ion-checkbox.png" alt="a list of 3 ion-checkbox elements">

For the ion-checkbox component the error is:

* The checkbox is not focusable with the screen reader.

### Applied patches

We'll force the checkbox into `display:block` and make it visible only to the screen reader.

```css
body .checkbox.checkbox-input-hidden input {
  display: block !important;
}

.checkbox.checkbox-input-hidden input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
```

You can run the restitution tests under iOS and Android. Focusing works well, the label is rendered by the screen reader, its type ("checkbox") and its status ("unchecked") too.

## ion-toggle

[Documentation for ion-toggle in Ionic](http://ionicframework.com/docs/v1/1.3.2/api/directive/ionToggle/)

<img src="img/ion-toggle.png" alt="a list of 3 ion-toggle elements">

For the ion-toggle component the reported errors are:

* The input checkbox is not focusable with the screen reader.
* The label is empty.
* `click` events are not sent in Android 5.0.

### Applied patches

We'll force the checkbox into `display: block` and make it visible only to the screen reader.

```css
body .toggle input{
  display: block !important;
}

.toggle input{
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
```

It can be observed that the HTML structure is not correct: the `<label>` tag is empty. Unfortunately, the template of the directive is not editable, we need to copy the directive under a different name to modify it:

```javascript
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
```

With this new template, the label is no longer empty. But when testing in Android 5.0 the `checkbox` state does not change.
In fact, events are blocked by the `pointer-events:none;` CSS property on the toggle item. It is therefore necessary to reset to the default value.

```css
.item-toggle{
  pointer-events: auto;
}
```

In this way click events are correctly intercepted.

## ion-radio

[Documentation for ion-radio in Ionic](http://ionicframework.com/docs/v1/1.3.2/api/directive/ionRadio/)

<img src="img/ion-radio.png" alt="a list of 4 ion-radio elements">

For the ion-radio component the reported errors are:

* The radio input is not focusable in Android 5.0.
* The icon can be focused in Android 5.0

### Applied patches

This time, an error appears when activating the radio input in Android 5.0, the state cannot be changed. To diagnose the error, it is necessary to start from a version with no style modification, and to remove all the CSS classes. By adding classes one by one, we can find the one that has the offending CSS property.

The error comes from the `left: -9999px;` property on the `input` element, that is misinterpreted by TalkBack in Android 5.0. We will therefore change the property to 0 and hide the input to the screen reader as a precaution.

```css
.item-radio input {
  left: 0;
}
.item-radio input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
```

The icon displayed to indicate the status remains focusable but is not spoken out in Android 5.0. Since the status is already indicated by the `input`, it is best to hide it completely with the ` aria-hidden="true"` property in the directive.



```javascript
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
```

## $ionicGesture

We refer here to the [List of criteria RGAA&nbsp;3, specific to mobile/tactile platforms](https://github.com/DISIC/referentiel-mobile-tactile/blob/en/mobile-touch-guidelines-criteria.md).


[Criterion 14.3](https://github.com/DISIC/referentiel-mobile-tactile/blob/en/mobile-touch-guidelines-criteria.md#143-for-each-gesture-based-interaction-triggering-an-action-is-the-action-triggered-appropriately) includes the following test:

> Test 14.3.1: Does each gesture-based interaction triggering an action meet these conditions?
>  * The action is triggered only at the end of the gesture-based interaction;
>  * The action is not triggered if the triggering element loses focus.


The first test invalidates several gestures:

 * The "on-hold" gesture will trigger the action during the press and not at the end of the interaction;
 * The  "on-touch" gesture will trigger the action before the end of `touchend` or `mouseup`;
 * The "on-drag", "on-drag-*" actions will trigger the action before the end of `touchend` or `mouseup`.

Similarly, the second test invalidates several gestures:

 * "on-swipe", "on-swipe-*" gestures can be triggered even if the focus is lost;
 * The "on-release" gesture is triggered no matter where the focus is.

There are 2 valid gestures left:

 * "on-tap" for short presses;
 * "on-double-tap" for double presses.



## $ionicModal

[Documentation for $ionicModal in Ionic](http://ionicframework.com/docs/v1/1.3.2/api/service/$ionicModal/)

The Ionic modal window displays temporary content to the user. You can also display actions, content or a form inside.

For the $ionicModal component the reported errors are:

* The user using a screen reader cannot interact with the elements inside the modal window;
* Focus is not set on the first element inside the modal window when it is opened;
* Focus can go outside of the opened modal window;
* When the modal window is closed, the focus does not return to the element that opened the window;
* The Escape key does not close the window;
* No `role="dialog"` attribute;
* No title for the modal window.


The `data-tap-disabled="true"` attribute cannot be used to disable the 300 ms delay reduction. Disabling the CSS and the `pointer-event` properties have no effect. It is therefore impossible for a user with an active screen reader to use the Ionic modal windows and no simple solutions have been found.

It is preferable to use a modal window that is already accessible. AngularJs being a fairly flexible framework, it is possible to use a modal from jQuery, React or AngularJS.

The same problem will arise for $ionicPopover and $ionicActionSheet.


## Conclusion

In this tutorial, we can observe that Ionic _(T.N.: as per version 1.0.1)_ was not designed to be accessible. The primary reason is certainly the click event interception to reduce the 300ms delay, which prevents all actions with a screen reader. Secondly, it seems rather obvious that no testing has been performed with VoiceOver, since it's impossible to scroll through the app with this screen reader on. Out of all the components, only a few can be actually fixed (in ion Forms: `Inline Labels` and `Stacked Labels`, `ion-checkbox`, `ion-toggle`, `ion-radio`,) which limits the interest of using Ionic to create an accessible app.

If you want to code an iOS app, it's safer to wait until [the 3-finger scroll issue](https://github.com/driftyco/ionic-v1/issues/17) is fixed. It is possible to use Ionic but this can be very time consuming and cause unexpected regressions or behaviors.

If you want to code an Android app, it's very important to test the app on Android 5 and 4.4. There may be many different behaviors between the two OS versions, because the WebView is not the same and accessibility may be broken on only one version.

In general, we do not recommend Ionic 1.0.1 for creating an accessible app. It is preferable to use Cordova and create your own app. It is still possible to work without the Ionic JavaScript  module and load only the CSS. Nevertheless, greatest care must be taken with the HTML structure, the `pointer-events:none`, and potential contrast issues.

## Licence
This document is the property of the <span lang="fr">Secrétariat général à la modernisation de l'action publique</span> (SGMAP). It is placed under [Open Licence 1.0 or later (PDF, 541 kb)](http://ddata.over-blog.com/xxxyyy/4/37/99/26/licence/Licence-Ouverte-Open-Licence-ENG.pdf), equivalent to a Creative Commons BY licence. To indicate authorship, add a link to the original version of the document available on the [DINSIC's GitHub account](https://github.com/DISIC).