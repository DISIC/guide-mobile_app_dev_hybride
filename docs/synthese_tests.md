<style type="text/css">
  .conforme,
  .non-conforme {
  	font-weight: bold;
  }
  .non-conforme {
    color: #a94442;
  }
  .conforme {
    color: #3c763d;
  }
</style>

# Synthèse des tests et correctifs proposés

## Installation du bac à sable

Prérequis&nbsp;:
* Installation de [nodeJs](https://nodejs.org/en/)
* (optionnelle) Installation d'[<span lang="en">Android</span>](http://cordova.apache.org/docs/en/3.3.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide)
* (optionnelle) Installation d'[<span lang="en">iOS</span>](http://cordova.apache.org/docs/en/3.3.0/guide_platforms_ios_index.md.html#iOS%20Platform%20Guide)

### Ionic

Ce tutoriel fournit un bac à sable pour tester l'accessibilité sous <span lang="en">Ionic</span>.
Pour l'installer vous devez disposer des outils <span lang="en">Ionic</span>&nbsp;:
- `npm install -g cordova ionic`

Pour lancer l'application <span lang="en">Android</span>&nbsp;:
- `ionic platform add android`
- `ionic run android`

Pour lancer l'application <span lang="en">iOS</span> (nécessite Mac OS X)&nbsp;:
- `ionic platform add ios`
- `ionic build ios`
- `ionic emulate ios`

### OnsenUI

Ce tutoriel fourint un bac à sable pour tester l'accessibilité sous <span lang="en">OnsenUI</span>.
Pour l'installer vous devez disposer des outils <span lang="en">OnsenUI</span>&nbsp;:
- `npm install`
- `npm install -g gulp`

Pour lancer l'application <span lang="en">Android</span>&nbsp;:
- `cordova platform add android`

Pour lancer l'application <span lang="en">iOS</span> (nécessite Mac OS X)&nbsp;:
- `cordova platform add ios`


## Pattern Aria sous Cordova

Non disponible dans le bac à sable.

| composant | évaluation du composant natif sous iOS |évaluation du composant natif sous Android |
| --------- |:-----------------------------:|:-----------------------------:|
| Generally Applicable Keyboard Recommendations | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| Accordion | <span class="conforme">conforme</span> | <span class="conforme">conforme</span> |
| Alert | <span class="conforme">conforme</span> | <span class="conforme">conforme</span> |
| Button | <span class="conforme">conforme</span> | <span class="conforme">conforme</span> |
| Checkbox | <span class="conforme">conforme</span> | <span class="conforme">conforme</span> |
| Date Picker | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| Dialog (Modal) | <span class="conforme">conforme</span> | <span class="conforme">conforme</span> |
| Drag & Drop | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| Landmark Navigation | <span class="conforme">conforme</span> | <span class="non-conforme">non conforme</span> |
| Link | <span class="conforme">conforme</span> | <span class="conforme">conforme</span> |
| Menu or Menu bar | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| Slider | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| Slider (Multi-Thumb) | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| Tab Panel | <span class="conforme">conforme</span> | <span class="conforme">conforme</span> |
| Tool Bar | <span class="conforme">conforme</span> | <span class="conforme">conforme</span> |
| Tree View | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |

Source&nbsp;: [https://docs.google.com/spreadsheets/d/1gN9oRZPdrJxLDNtT6nVO4fn7E7sn1061L9Xl3__slZ4/edit#gid=0](https://docs.google.com/spreadsheets/d/1gN9oRZPdrJxLDNtT6nVO4fn7E7sn1061L9Xl3__slZ4/edit#gid=0)

## <span lang="en">Plugin</span> mgCordova

Disponible dans le bac à sable.

| composant | évaluation du composant natif sous iOS |évaluation du composant natif sous Android |
| --------- |:-----------------------------:|:-----------------------------:|
| $cordovaActionSheet | <span class="conforme">conforme</span> | <span class="conforme">conforme</span> |
| $cordovaToast | <span class="non-conforme">non conforme</span> | <span class="conforme">conforme</span> |


## <span lang="en">Ionic</span> 1.0.1

Disponible dans le bac à sable.

| composant | évaluation du composant d'origine | correction |
| ----------- |:-----------:|:----------:|
| ion Forms: Placeholder Labels | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| ion Forms: Inline Labels | <span class="non-conforme">non conforme</span> | [conforme](./ionic.md#-span-lang-en-inline-labels-span-) |
| ion Forms: Stacked Labels | <span class="non-conforme">non conforme</span> | [conforme](./ionic.md#-span-lang-en-stacked-labels-span-) |
| ion Forms: Floating Labels | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| ion Forms: Inset Forms | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| ion Forms: Inset Inputs | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| ion Forms: Input Icons | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| ion Forms: Header Inputs | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| ion-checkbox | <span class="non-conforme">non conforme</span> | [conforme](./ionic.md#ion-checkbox) |
| ion-toggle | <span class="non-conforme">non conforme</span> | [conforme](./ionic.md#ion-toggle) |
| ion-radio | <span class="non-conforme">non conforme</span> | [conforme](./ionic.md#ion-radio) |
| $ionicGesture: on-hold | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| $ionicGesture: on-tap | <span class="conforme">conforme</span> | aucune |
| $ionicGesture: on-double-tap | <span class="conforme">conforme</span> | aucune |
| $ionicGesture: on-touch | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| $ionicGesture: on-release | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| $ionicGesture: on-drag | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| $ionicGesture: on-drag-* | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| $ionicGesture: on-swipe | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| $ionicGesture: on-swipe-* | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| $ionicModal | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| $ionicPopover | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| $ionicActionSheet | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |

## <span lang="en">OnsenUI</span> 1.3.11

Disponible dans le bac à sable.

| composant | évaluation du composant d'origine | correction |
| ----------- |:-----------:|:----------:|
| Underbar Text Input | <span class="non-conforme">non conforme</span> | non conforme |
| Transparent Text Input | <span class="non-conforme">non conforme</span> | conforme |
| Search Input | <span class="non-conforme">non conforme</span> | conforme |
| Textarea | <span class="non-conforme">non conforme</span> | conforme |
| Checkbox | <span class="non-conforme">non conforme</span> | conforme |
| Switch | <span class="non-conforme">non conforme</span> | conforme |
| Radio button | <span class="non-conforme">non conforme</span> | conforme |
| Gesture-detector : hold | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| Gesture-detector: tap | <span class="conforme">conforme</span> | aucune |
| Gesture-detector: doubletap | <span class="conforme">conforme</span> | aucune |
| Gesture-detector: touch | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| Gesture-detector: release | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| Gesture-detector: drag | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| Gesture-detector: drag* | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| Gesture-detector: swipe | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| Gesture-detector: swipe* | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| Modal | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |
| Popover | <span class="non-conforme">non conforme</span> | <span class="non-conforme">non conforme</span> |


# Licence
Ce document est la propriété du Secrétariat général à la modernisation de l'action publique français (SGMAP). Il est placé sous la [licence ouverte 1.0 ou ultérieure](https://www.etalab.gouv.fr/licence-ouverte-open-licence), équivalente à une licence <i lang="en">Creative Commons BY</i>. Pour indiquer la paternité, ajouter un lien vers la version originale du document disponible sur le [compte <span lang="en">Github</span> de la DInSIC](https://github.com/DISIC).
