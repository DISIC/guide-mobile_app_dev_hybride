<style type="text/css">
  .compliant,
  .non-compliant {
  	font-weight: bold;
  }
  .non-compliant {
    color: #a94442;
  }
  .compliant {
    color: #3c763d;
  }
</style>

# Proposed tests and patches wrap-up

## Installing the sandbox


Prerequisites:

* Installing [nodeJs](https://nodejs.org/en/)
* (Optional) Installing [Android](http://cordova.apache.org/docs/en/3.3.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide)
* (Optional) Installing [iOS](http://cordova.apache.org/docs/en/3.3.0/guide_platforms_ios_index.md.html#iOS%20Platform%20Guide)

### Ionic

This tutorial provides a sandbox to test accessibility in Ionic.
To install it you need the Ionic toolkit:

- `npm install -g cordova ionic`

To launch the Android application:

- `ionic platform add android`
- `ionic run android`

To start the iOS application (requires Mac OS X):

- `ionic platform add ios`
- `ionic build ios`
- `ionic emulate ios`

### OnsenUI

This tutorial provides a sandbox to test accessibility in OnsenUI.
To install it you need the OnsenUI toolkit:

- `npm install`
- `npm install -g gulp`

To launch the Android application:

- `cordova platform add android`

To launch the iOS application (requires Mac OS X):

- `cordova platform add ios`


## ARIA Design Pattern in Cordova

Not available in the sandbox.

| Component | Evaluation of the native component under iOS | evaluation of the native component under Android |
| --------- |:-----------------------------:|:-----------------------------:|
| Generally Applicable Keyboard Recommendations | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Accordion | <span class = "compliant">compliant</span> | <span class = "compliant">compliant</span> |
| Alert | <span class = "compliant">compliant</span> | <span class = "compliant">compliant</span> |
| Button | <span class = "compliant">compliant</span> | <span class = "compliant">compliant</span> |
| Checkbox | <span class = "compliant">compliant</span> | <span class = "compliant">compliant</span> |
| Date Picker | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Dialog (Modal) | <span class = "compliant">compliant</span> | <span class = "compliant">compliant</span> |
| Drag & Drop | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Landmark Navigation | <span class = "compliant">compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Link | <span class = "compliant">compliant</span> | <span class = "compliant">compliant</span> |
| Menu or Menu bar | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Slider | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Slider (Multi-Thumb) | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Tab Panel | <span class = "compliant">compliant</span> | <span class = "compliant">compliant</span> |
| Tool Bar | <span class = "compliant">compliant</span> | <span class = "compliant">compliant</span> |
| Tree View | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |

Source: [https://docs.google.com/spreadsheets/d/1gN9oRZPdrJxLDNtT6nVO4fn7E7sn1061L9Xl3__slZ4/edit#gid=0](https://docs.google.com/spreadsheets/d/1gN9oRZPdrJxLDNtT6nVO4fn7E7sn1061L9Xl3__slZ4/edit#gid=0)

## mgCordova Plugin

Available in the sandbox.

| Component | Evaluation of the native component under iOS | evaluation of the native component under Android |
| --------- |:-----------------------------:|:-----------------------------:|
| $cordovaActionSheet | <span class = "compliant">compliant</span> | <span class = "compliant">compliant</span> |
| $cordovaToast | <span class = "non-compliant">non-compliant</span> | <span class = "compliant">compliant</span> |


## Ionic 1.0.1

Available in the sandbox.

| Component | Evaluation of the original component | Correction |
| --------- |:-----------------------------:|:-----------------------------:|
| ion Forms: Placeholder Labels | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| ion Forms: Inline Labels | <span class = "non-compliant">non-compliant</span> | [Compliant](./ionic.md#fix-for-the-inline-labels-input) |
| ion Forms: Stacked Labels | <span class = "non-compliant">non-compliant</span> | [Compliant](./ionic.md#fix-for-the-stacked-labels-input) |
| ion Forms: Floating Labels | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| ion Forms: Inset Forms | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| ion Forms: Inset Inputs | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| ion Forms: Input Icons | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| ion Forms: Header Inputs | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| ion-checkbox | <span class = "non-compliant">non-compliant</span> | [Compliant](./ionic.md#ion-checkbox) |
| ion-toggle | <span class = "non-compliant">non-compliant</span> | [Compliant](./ionic.md#ion-toggle) |
| ion-radio | <span class = "non-compliant">non-compliant</span> | [Compliant](./ionic.md#ion-radio) |
| $ionicGesture: on-hold | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| $ionicGesture: on-tap | <span class = "compliant">compliant</span> | None |
| $ionicGesture: on-double-tap | <span class = "compliant">compliant</span> | None |
| $ionicGesture: on-touch | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| $ionicGesture: on-release | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| $ionicGesture: on-drag | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| $ionicGesture: on-drag-* | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| $ionicGesture: on-swipe | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| $ionicGesture: on-swipe-* | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| $ionicModal | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| $ionicPopover | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| $ionicActionSheet | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |

## OnsenUI 1.3.11

Available in the sandbox.

| Component | Evaluation of the original component | Correction |
| --------- |:-----------------------------:|:-----------------------------:|
| Underbar Text Input | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Transparent Text Input | <span class = "non-compliant">non-compliant</span> | <span class = "compliant">compliant</span> |
| Search Input | <span class = "non-compliant">non-compliant</span> | <span class = "compliant">compliant</span> |
| Textarea | <span class = "non-compliant">non-compliant</span> | <span class = "compliant">compliant</span> |
| Checkbox | <span class = "non-compliant">non-compliant</span> | <span class = "compliant">compliant</span> |
| Switch | <span class = "non-compliant">non-compliant</span> | <span class = "compliant">compliant</span> |
| Radio button | <span class = "non-compliant">non-compliant</span> | <span class = "compliant">compliant</span> |
| Gesture-detector: hold | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Gesture-detector: tap | <span class = "compliant">compliant</span> | None |
| Gesture-detector: doubletap | <span class = "compliant">compliant</span> | None |
| Gesture-detector: touch | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Gesture-detector: release | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Gesture-detector: drag | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Gesture-detector: drag* | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Gesture-detector: swipe | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Gesture-detector: swipe* | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Modal | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |
| Popover | <span class = "non-compliant">non-compliant</span> | <span class = "non-compliant">non-compliant</span> |


## Licence
This document is the property of the <span lang="fr">Secrétariat général à la modernisation de l'action publique</span> (SGMAP). It is placed under [Open Licence 1.0 or later (PDF, 541 kb)](http://ddata.over-blog.com/xxxyyy/4/37/99/26/licence/Licence-Ouverte-Open-Licence-ENG.pdf), equivalent to a Creative Commons BY licence. To indicate authorship, add a link to the original version of the document available on the [DINSIC's GitHub account](https://github.com/DISIC).