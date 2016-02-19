
# Initialisation d'un projet 

## <span lang="en">Ionic</span>
Pour débuter, vous pouvez utiliser l'outil en ligne de commande d'<span lang="en">Ionic</span>, pour créer rapidement la structure de l'application.

```shell
ionic start sgmapApp blank
```

On peut auditer la page générée avec le lecteur d'écran. Le titre “Ionic Blank Starter” est bien lu par le lecteur d'écran, de plus iOS indique le niveau de titre.


### Création de modules <span lang="en">AngularJs</span> de mise en accessibilité

Pour créer une application <span lang="en">Ionic</span> accessible, nous allons créer 2 modules <span lang="en">AngularJs</span>.
Pour rappel, le but d'un module <span lang="en">AngularJs</span> est d'être facilement réutilisable dans plusieurs applications.

Le premier module corrigera les erreurs d'accessibilité d'<span lang="en">Ionic</span>&nbsp;:
* Mauvaise gestion des événements
* Correction <abbr title="Cascading Style Sheets" lang="en">CSS</abbr> (Élément focusable, contrôle de la propagation des événements [pointer-events]…)
* Structure <abbr title="Hypertext Markup Language" lang="en">HTML</abbr>

Le second module implémentera l'API native d'accessibilité mobile dans le contexte <span lang="en">AngularJs</span>.
Cela permettra à toutes les applications <span lang="en">AngularJs</span>, dans un contexte hybride, d'utiliser cette API (<span lang="en">Ionic</span>, OnsenUI, <span lang="en">AngularJs+Bootstrap</span>…)

#### phonegap-mobile-accessibility

Le second module sera implémenté à partir du plugin <span lang="en">PhoneGap mobile accessibility</span>.
Nous pouvons grâce à ce plugin connaître les options d'accessibilité sélectionnées par l'utilisateur et le plugin peut interagir avec le lecteur d'écran.
Plus de détails sur la page&nbsp;: https://github.com/phonegap/phonegap-mobile-accessibility

Dans un premier temps le module <span lang="en">AngularJs</span> implémentera uniquement le retour du statut du lecteur d'écran.

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

      // events doesn't seems to work on android 4.3
      $window.addEventListener(MobileAccessibilityNotifications.SCREEN_READER_STATUS_CHANGED, a11yStatus, false);
    }, false);
    return true;
  };
});
```

De cette façon, à chaque modification de l'état du lecteur, un événement AngularJs sera envoyé.
Cet événement nous informera du comportement à adopter en fonction de l'état du lecteur d'écran.
De plus, sur le body, la class <abbr title="Cascading Style Sheets" lang="en">CSS</abbr> `sr-on` sera ajoutée si le lecteur d'écran est activé, et `sr-off` si il est éteint.

On peut, dès lors, créer une feuille de style pour nous aider à la conception de l'application accessible.

```css
.sr-off .sr-on-only ,
.sr-on .sr-off-only {
  display: none !important;
}
```

Nous disposons maintenant de 2 classes <abbr title="Cascading Style Sheets" lang="en">CSS</abbr>&nbsp;: une pour afficher un bloc uniquement lorsque le lecteur d'écran est actif (`.sr-on-only`) et la seconde seulement lorsqu'il est éteint (`.sr-off-only`)

### <span lang="en">Profiling</span> et <span lang="en">Debugging</span> distant sur mobile

Pour développer correctement une application mobile accessible, la première règle sera de pouvoir la déboguer facilement.
<span lang="en">Ionic</span> facilite grandement la phase de développement et de <span lang="en">debugging</span>.
Une des options intéressantes est le <span lang="en">livereload</span> sous Android. Le <span lang="en">livereload</span> met à jour l'application à chaque modification du code en cours d'écriture.

```shell
ionic run android -l
```

La deuxième option permettra d'obtenir les retours de la console <span lang="en">JavaScript</span> directement dans le terminal de lancement de l'application.

```shell
ionic run android -c
```

De cette façon on peut facilement débugger la partie <span lang="en">JavaScript</span>. Malheureusement les outils d'<span lang="en">Ionic</span> n'accéderont pas au code <abbr title="Cascading Style Sheets" lang="en">CSS</abbr>, c'est ici qu'interviennent les outils de déboguage distants de Safari et Chrome.

Le déboguage distant accédera depuis l'ordinateur au <span lang="en">web development tools</span> de l'application mobile en cours d'exécution. On peut l'utiliser sur les plateformes Android 4.4+ et iOS 6+. Pour des versions antérieures, seuls les outils <span lang="en">Ionic</span> pourront vous aider.

Article&nbsp;: [Testing Mobile: Emulators, Simulators And Remote Debugging](http://www.smashingmagazine.com/2014/09/testing-mobile-emulators-simulators-remote-debugging/2/)


## <span lang="en">OnsenUI</span>

Pour débuter, vous pouvez utiliser l'outil en ligne de commande de Cordova, pour créer rapidement la structure de l'application.
```shell
cordova create test io.onsen.testapp TestApp
```

Téléchargez un des modèles disponibles sur la page d'[OnsenUI](https://onsen.io/download.html)

Copiez ensuite le contenu du modèle téléchargé dans le répertoire créé  à
l'étape précédente ("TestApp").

Ajoutez une plateforme, Android ou iOS&nbsp;:
```shell
cordova platform add android
```

Vous pourrez enfin exécuter le projet dans le simulateur, en vous plaçant dans le répertoire du projet&nbsp;:
```shell
cordova emulate
```


## Licence
Ce document est la propriété du Secrétariat général à la modernisation de l'action publique français (SGMAP). Il est placé sous la [licence ouverte 1.0 ou ultérieure](http://wiki.data.gouv.fr/wiki/Licence_Ouverte_/_Open_Licence), équivalente à une licence <i lang="en">Creative Commons BY</i>. Pour indiquer la paternité, ajouter un lien vers la version originale du document disponible sur le [compte <span lang="en">Github</span> de la DInSIC](https://github.com/DISIC).
