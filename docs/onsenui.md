

# <span lang="en">OnsenUI</span>

Nous allons étudier les composants d'interface d'<span lang="en">OnsenUI</span> version 1.3.11 (2015-09-28).

Il n’y a pas de documentation ou de composants dédiés à l’accessibilité dans <span lang="en">OnsenUI</span>.

On remarque que l'accessibilité n'est pas une priorité de l'équipe d'<span lang="en">OnsenUI</span> actuellement.

## Corrections générales

Lors de l'utilisation du framework, l'erreur suivante a été relevée&nbsp;:
* Les événements du lecteur d'écran sont interceptés par <span lang="en">OnsenUI</span> sous Android 4.3 et 4.4 empêchant toute interaction par l'utilisateur.

## Correctifs appliqués pour interpréter les événements du lecteur d'écran Android

Lors des tests sous <span lang="en">Android</span> 4.3 et <span lang="en">Android</span> 4.4, il est impossible de cliquer ou de changer l’état d'une case à cocher avec <span lang="en">talkback</span>. Les événements sont interceptés par <span lang="en">OnsenUI</span> pour réduire le délai de latence des 300ms&nbsp;: <q lang="en">thanks to the fastclick library, there is no 300ms delay when detecting the event.</q>


### Correction de l'impression de latence sous <span lang="en">OnsenUI</span>

<span lang="en">OnsenUI</span> ne propose pas d'attribut ou de fonction permettant au développeur de désactiver l'utilisation de la libraire fastclick responsable des dysfonctionnements avec les lecteurs d'écran. Il est ainsi difficile de corriger le problème d'interception de clics.
Une possibilité est de la désactiver totalement dans onsenui.js&nbsp;:
```javascript
  // window.addEventListener('load', function() {
  // FastClick.attach(document.body);
  // }, false);
```

Une correction plus pérenne serait d'ajouter à OnsenUI un attribut "disable-tap" puis d'utiliser le module MobileAccessibility de Cordova pour détecter la présence d'un lecteur d'écran et d'ajuster l'état de "disable-tap" en fonction de l'absence ou de la présence d'un lecteur d'écran lors de l'exécution de l'application.


## Zones de saisie

<span lang="en">OnsenUI</span> fournit plusieurs styles de zones de saisie (<span lang="en">input</span>)&nbsp;:
* <span lang="en">Underbar Text Input</span>
* <span lang="en">Transparent Text Input</span>
* <span lang="en">Search Input</span>
* <span lang="en">Textarea</span>
* <span lang="en">Transparent Textarea</span>


Les erreurs relevées sont les suivantes&nbsp;:
* L'utlisation de <span lang="en">placeholder</span> n'est pas une alternative au label. En effet le <span lang="en">placeholder</span> n'est plus visible dès que l'on commence à remplir le champ&nbsp;;
* Le label est vide.
* Absence de l'attribut `for` sur le <span lang="en">label</span> et l'`id` correspondant sur l'<span lang="en">input</span>.

### Composants non accessibles

Les composants de zones de saisie ne peuvent pas être corrigés sans changer complètement l'aspect voulu par <span lang="en">OnsenUI</span>.

### Correctifs appliqués

Pour corriger les problèmes d'accessibilité sur les composants de zones de saisie, nous avons ajouté un label lié à l'élément "input"&nbsp;:
```html
  <div class="text-input">
    <label for="z1">Text input:</label>
    <input id="z1" type="text" placeholder="text" value=""/>
  </div>
```


## Case à cocher

Pour le composant case à cocher, l'erreur relevée est&nbsp;:
* La restitution par les lecteurs d'écran n'est pas correcte, à cause de la structure du code de l'implémentation proposée ("input" imbriqué dans l'élément "label").


### Correctifs appliqués

Pour que le composant soit correctement restitué par les lecteurs d'écran, il faudrait un code de la forme&nbsp;:
```html
  <div class="checkbox">
    <label for="cb2" class="checkbox">Option</label>
    <input id="cb1" type="checkbox" checked="checked"/>
    <div class="checkbox__checkmark"></div>
  </div>
```

Mettre en oeuvre une telle implémentation demande de revoir significativement la structure de code proposée par OnsenUI.

## Switch

Pour le composant switch, l'erreur relevée est&nbsp;:
* Le label est mal restitué.

### Correctifs appliqués

Comme précédemment, le code devrait être de la forme&nbsp;:
```html
  <div class="switch">
     <label for="s1">Bouton</label>
     <input id="s1" type="checkbox" class="switch__input"/>
      <div class="switch__toggle"></div>
  </div>
```

Mettre en oeuvre une telle implémentation demande de revoir significativement la structure de code proposée par OnsenUI.


## Bouton radio

Pour le composant bouton radio, l'erreur relevée est&nbsp;:
* Le label est mal restitué.

### Correctifs appliqués

Comme précédemment, le code devrait être de la forme&nbsp;:
```html
  <div class="radio-button">
    <label for="rb1">Option 1</label>
    <input id="rb1" type="radio" name="r" checked="checked">
    <div class="radio-button__checkmark"></div>
  </div>
```

Mettre en oeuvre une telle implémentation demande de revoir significativement la structure de code proposée par OnsenUI.



## Détection des gestes (ons-gesture-detector)

Nous nous basons ici sur [les critères présents dans la proposition d'extension du RGAA pour les mobiles/tactiles](https://github.com/DISIC/referentiel-mobile-tactile/blob/master/refentiel-mobile-tactile-liste-criteres.md).

Le critère 14.3 comporte le test suivant&nbsp;:

> Test 14.3.1&nbsp;: Chaque interaction  gestuelle déclenchant une action respecte-t-elle ces conditions&nbsp;?
>   * l'action est déclenchée uniquement à la fin de l'interaction gestuelle&nbsp;;
>   * l'action n'est pas déclenchée si l'élément déclencheur perd le focus.


Le premier test invalide plusieurs gestes&nbsp;:
 * Le geste <span lang="en">hold</span> va déclencher l'action pendant l'appui et non à la fin de l'interaction (il faudra veiller à l'utiliser en combinaison avec <span lang="en">release</span>)&nbsp;;
 * Le geste <span lang="en">touch</span> va déclencher l'action avant la fin de touchend ou mouseup&nbsp;;
 * Les actions <span lang="en">drag, dragleft, dragright, dragup, dragdown</span> vont déclencher l'action avant la fin de touchend ou mouseup.

De la même manière le deuxième test invalide plusieurs gestes&nbsp;:
 * Les gestes <span lang="en">swipe, swipeleft, swiperight, swipeup, swipedown</span> peuvent être déclenchés même si le focus est perdu&nbsp;;
 * Le geste <span lang="en">release</span> est déclenché peu importe où le focus se trouve.

L'utilisation de ces geste sera donc à éviter.

## Fenêtre modale

La fenêtre modale <span lang="en">OnsenUI</span> permet d'afficher du contenu temporaire (actions, texte, formulaire, etc.)

Pour le composant fenêtre modale (ons-modal) les erreurs relevées sont&nbsp;:
* L'utilisateur de lecteur d'écran ne peut pas interagir avec les éléments contenus dans la modale.
* Le focus n'est pas renvoyé sur le premier élément à l'ouverture.
* Le focus peut sortir de la fenêtre modale en cours d'ouverture.
* À la fermeture le focus ne revient pas sur l'élément ayant permis d'ouvrir la fenêtre.
* La touche Echap ne ferme pas la fenêtre.
* Absence de l'attribut role="dialog".
* Absence de label pour la modale.


Il est préférable d'utiliser une fenêtre modale déjà accessible. <span lang="en">AngularJs</span> étant un <span lang="en">framework</span> assez flexible, on peut ajouter aussi bien une fenêtre modale <span lang="en">jQuery</span>, <span lang="en">React</span> ou <span lang="en">AngularJS</span>.

Le même problème se posera pour le composant "popover".

## Conclusion

Lors de ce tutoriel, nous remarquons bien que <span lang="en">OnsenUI</span> n'a pas été conçu pour être accessible. La première raison est sûrement l'interception des événements <span>click</span> pour réduire le délai de 300ms, qui empêche toutes les actions avec un lecteur d'écran. Ensuite, nous nous rendons compte qu'aucun test n'a été fait avec le lecteur d'écran TalkBack ou VoiceOver car un grand nombre de composants sont restitués de manière incomplète ou incorrecte.

Si vous souhaitez faire une application <span lang="en">Android</span>, il est très important de tester l'application sur <span lang="en">Android</span> > 5 et <span lang="en">Android</span> 4.4. Il peut y avoir beaucoup de comportements différents entre les deux versions OS, en effet la <span lang="en">WebView</span> n'est pas la même et l'accessibilité peut comporter des anomalies sur une seule des versions.

De manière générale, <span lang="en">OnsenUI</span> n'est pas recommandable pour créer une application accessible. Il est préférable d'utiliser Cordova et de créer sa propre application.

## Licence
Ce document est la propriété du Secrétariat général à la modernisation de l'action publique français (SGMAP). Il est placé sous la [licence ouverte 1.0 ou ultérieure](https://www.etalab.gouv.fr/licence-ouverte-open-licence), équivalente à une licence <i lang="en">Creative Commons BY</i>. Pour indiquer la paternité, ajouter un lien vers la version originale du document disponible sur le [compte <span lang="en">Github</span> de la DInSIC](https://github.com/DISIC).
