# Accessible hybrid mobile app development guide with Ionic and OnsenUI

This guide is intended for mobile apps developers who want to create accessible apps with the Ionic or OnsenUI  frameworks.

## Warning

The various tests carried out to study the accessibility of Ionic and OnsenUI lead to the conclusion that these frameworks cannot currently be used to quickly and safely develop an accessible app. In this respect, it is preferable to develop native apps, using the APIs of iOS and Android to achieve a satisfying level of accessibility. The elements provided in these tutorials are intended to accompany the developer in the evaluation of the components accessibility, and in the implementation of corrections, which can however prove to be complex. Moreover, the durability of such corrections is not guaranteed at the moment, unless these corrections are integrated into the frameworks.


## Presentation and description of Ionic and OnsenUI

[Ionic](http://ionicframework.com) and [OnsenUI](https://onsen.io) are toolkits to develop hybrid apps. A hybrid app is written in <abbr title = "Hypertext Markup Language">HTML</abbr>, <abbr title="Cascading Style Sheets">CSS</abbr> and JavaScript, in a native WebView container, and can be run on different platforms (iOS, Android, etc.) without changing the code. The technologies used are [Apache Cordova](https://cordova.apache.org), <abbr title = "Syntactically Awesome Style Sheets">SASS</abbr> and [AngularJs](https://angularjs.org/).
Ionic and OnsenUI offer reusable components with a focus on performance and ease of implementation. In addition, Ionic and OnsenUI provide tools to develop, test, deploy and analyze apps.

<img src="docs/img/architecture.png" alt="Ionic's architecture">

The architecture of Ionic and OnsenUI can be divided into four layers (the illustration above applies to either Ionic or OnsenUI):

* The native layer, which varies from <abbr title="Operating System">OS</abbr>-dependent. If we only used this layer, we would have created a pure native app.
* The Apache Cordova layer. This is where the hybrid app begins. It is possible to integrate a web app without additional layer, having native interactions thanks to the plugins provided by Cordova (Notifications, GPS, Contacts...).
* The AngularJs layer allows to create a rich hybrid app, with a route, view, controller...
* The last layer, Ionic or OnsenUI, provides a set of web interface components that mimic the native designs and interaction models of iOS and Android (checkbox, toggle, radio, modal...).

This tutorial will discuss accessibility in the context of an Ionic or OnsenUI app.

Prerequisites:

* Tools: npm, bower, cordova, Android Studio and/or XCode
* Knowledge of Apache Cordova hybrid environment
* Knowledge of the creation of rich aps in AngularJS (modules, services, directives)
* Knowledge of Ionic and OnsenUI

For a start, we will see how to initiate a project and set up a structure to create an accessible app project  under Ionic and OnsenUI.
We will then see the best practices to be used in the Apache Cordova environment and we will study the accessibility of the  Apache Cordova plugins.
Finally, we will study the accessibility of interface components from Ionic and OnsenUI, in order to help developers willing to use these frameworks to develop an accessible mobile app.


* [Initialization of an Ionic and of an OnsenUI project](./docs/initialisation.md)
* [Best practices with Cordova, and study of the accessibility of Cordova plugins](./docs/cordova.md)
* [Accessibility tutorial for an Ionic app](./docs/ionic.md)
* [Accessibility tutorial for an OnsenUI app](./docs/onsenui.md)
* [Synthesis of tests and proposed corrections](./docs/synthese_tests.md)


## Related documents

The following guides can be consulted in addition:

* [Mobile app audit guide](https://github.com/DISIC/guide-mobile_app_audit/tree/english)
* [Design Guide for Accessible Mobile Apps](https://github.com/DISIC/guide-mobile_app_conception/tree/english)
* [Accessible mobile app development guides with Android and iOS APIs](https://github.com/DISIC/guide-mobile_app_dev_natif/tree/english)

## Licence
This document is the property of the <span lang="fr">Secrétariat général à la modernisation de l'action publique</span> (SGMAP). It is placed under [Open Licence 1.0 or later (PDF, 541 kb)](http://ddata.over-blog.com/xxxyyy/4/37/99/26/licence/Licence-Ouverte-Open-Licence-ENG.pdf), equivalent to a Creative Commons BY licence. To indicate authorship, add a link to the original version of the document available on the [DINSIC's GitHub account](https://github.com/DISIC).