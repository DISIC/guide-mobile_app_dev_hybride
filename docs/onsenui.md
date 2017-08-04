
# OnsenUI

_(Translator's note: at the time of writing the original document, OnsenUI was in version 1.3.11. Some statements developed below may be outdated; however, the core approach for this tutorial remains valid)._

We will study the user interface components of OnsenUI version 1.3.11 (2015-09-28).

There are no documentation or components dedicated to accessibility in OnsenUI.

Note that accessibility is not a priority of the OnsenUI team at this time.

## General issues

When using the framework, the following error was noted:

* Screen reader events are intercepted by OnsenUI on Android 4.3 and 4.4, preventing user interaction.

## Patches applied to interpret Android screen reader events

When testing with Android 4.3 and Android 4.4, you cannot click or change the status of a checkbox with TalkBack. Events are intercepted by OnsenUI to reduce the latency of the 300ms:
> Thanks to the fastclick library, there is no 300ms delay when detecting the event.


### Fixing the latency feeling in OnsenUI

OnsenUI does not provide an attribute or function that allows the developer to disable the use of the fastclick library responsible for malfunctions with screen readers. This makes it difficult to fix the issues with click events.
One option is to disable it completely in onsenui.js:

```javascript
  // window.addEventListener('load', function() {
  // FastClick.attach(document.body);
  // }, false);
```

A more permanent fix would be to add a "disable-tap" attribute to OnsenUI; then, use Cordova's MobileAccessibility module to detect the presence of a screen reader; and finally, adjust the disable-tap state, whether a screen reader is on or off when running the app.


## Input fields

OnsenUI provides several types of input fields:

* Underbar Text Input
* Transparent Text Input
* Search Input
* Textarea
* Transparent Textarea


The following issues are encountered:

* The use of placeholder is not a replacement for the label, as the  placeholder disappears when user starts filling the field;
* The label is empty.
* Absence of the `for` attribute on the label and of the corresponding `id` on the input field.

### Inaccessible Components

Input components cannot be fixed without completely changing their appearance, as intended by OnsenUI.

### Applied patches

To fix accessibility issues on input components, we have added a label linked to the `INPUT` element:
```html
  <div class="text-input">
    <label for="z1">Text input:</label>
    <input id="z1" type="text" placeholder="text" value=""/>
  </div>
```


## Checkbox

For the checkbox component, the issue found is:

* The rendering by screen readers is not correct, because of the structure of the code of the proposed implementation (`INPUT` nested inside the `LABEL` element).


### Applied patches

For the component to be correctly rendered by the screen readers, it would require a code of the form:

```html
  <div class="checkbox">
    <label for="cb2" class="checkbox">Option</label>
    <input id="cb1" type="checkbox" checked="checked"/>
    <div class="checkbox__checkmark"></div>
  </div>
```

Implementing such a modification requires a significant review of the code structure proposed by OnsenUI.

## Switch

For the switch component, the issue is:

* The label is incorrectly rendered.

### Applied patches

As previously, the code should be of the form:
```html
  <div class="switch">
     <label for="s1">Bouton</label>
     <input id="s1" type="checkbox" class="switch__input"/>
      <div class="switch__toggle"></div>
  </div>
```

Implementing such a modification requires a significant review of the code structure proposed by OnsenUI.


## Radio button

For the radio button component, the error found is:

* The label is incorrectly rendered.

### Applied patches

As previously, the code should be of the form:

```html
  <div class="radio-button">
    <label for="rb1">Option 1</label>
    <input id="rb1" type="radio" name="r" checked="checked">
    <div class="radio-button__checkmark"></div>
  </div>
```

Implementing such a modification requires a significant review of the code structure proposed by OnsenUI.


## Gesture Detection (ons-gesture-detector)

We refer here to the [List of criteria RGAA&nbsp;3, specific to mobile/tactile platforms](https://github.com/DISIC/referentiel-mobile-tactile/blob/en/mobile-touch-guidelines-criteria.md).



[Criterion 14.3](https://github.com/DISIC/referentiel-mobile-tactile/blob/en/mobile-touch-guidelines-criteria.md#143-for-each-gesture-based-interaction-triggering-an-action-is-the-action-triggered-appropriately) includes the following test:

> Test 14.3.1: Does each gesture-based interaction triggering an action meet these conditions?
>  * The action is triggered only at the end of the gesture-based interaction;
>  * The action is not triggered if the triggering element loses focus.


The first test invalidates several gestures:

 * The "hold" gesture will trigger the action during the press and not at the end of the interaction (it will be necessary to use it in combination with `release`);
 * The "touch" gesture will trigger the action before the end of `touchend` or `mouseup`;
 * `drag`, `dragleft`, `dragright`, `dragup`, `dragdown` gestures  will trigger action before the end of `touchend` or `mouseup`.

Similarly, the second test invalidates several gestures:

 * `swipe`, `swipeleft`, `swiperight`, `swipeup`, `swipedown` gestures can be triggered even if focus is lost;
 * The  `release` gesture is triggered no matter where the focus is.

The use of these gestures should therefore be avoided.

## Modal window

The OnsenUI modal window  allows to display temporary content (actions, text, form, etc.).

For the modal window component (`ons-modal`) the issues found are:

* The screen reader user cannot interact with the elements contained in the modal;
* Focus is not set on the first element inside the modal window when it is opened;
* Focus can go outside of the opened modal window;
* When the modal window is closed, the focus does not return to the element that opened the window;
* The Escape key does not close the window;
* No `role="dialog"` attribute;
* No title for the modal window.


It is preferable to use a modal window that is already accessible. AngularJs being a fairly flexible framework, it is possible to use a modal from jQuery, React or AngularJS.

The same problem will arise for the "popover" component.

## Conclusion

In this tutorial, we can observe that OnsenUI _(T.N.: as per version 1.3.11)_ was not designed to be accessible. The primary reason is certainly the click event interception to reduce the 300ms delay, which prevents all actions with a screen reader. Secondly, it seems rather obvious that no testing has been performed with VoiceOver or TalkBack on, since a large number of components are rendered incompletely or incorrectly.

If you want to code an Android app, it's very important to test the app on Android 5 and 4.4. There may be many different behaviors between the two OS versions, because the WebView is not the same and accessibility may be broken on only one version.

In general, we do not recommend OnsenUI 1.3.11 for creating an accessible app. It is preferable to use Cordova and create your own app. 

## Licence
This document is the property of the <span lang="fr">Secrétariat général à la modernisation de l'action publique</span> (SGMAP). It is placed under [Open Licence 1.0 or later (PDF, 541 kb)](http://ddata.over-blog.com/xxxyyy/4/37/99/26/licence/Licence-Ouverte-Open-Licence-ENG.pdf), equivalent to a Creative Commons BY licence. To indicate authorship, add a link to the original version of the document available on the [DINSIC's GitHub account](https://github.com/DISIC).