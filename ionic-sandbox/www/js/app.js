// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova','a11y-ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('DemoController', DemoController)
.controller('ModalController', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
})
.controller('PopoverController', function($scope, $ionicPopover) {

  // .fromTemplate() method
  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
})
.controller('ActionSheetController', function($scope, $ionicActionSheet) {
  // Triggered on a button click, or some other target
  $scope.show = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-share balanced"></i> Share' },
        { text: '<i class="icon ion-arrow-move assertive"></i> Move' },
      ],
      titleText: 'Modify your album',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        return true;
      }
    });

  };
})
.controller('ActionSheet2Controller', function($scope, $cordovaActionSheet) {

  var options = {
    title: 'What do you want with this image?',
    buttonLabels: ['Share via Facebook', 'Share via Twitter'],
    addCancelButtonWithLabel: 'Cancel',
    androidEnableCancelButton : true,
    winphoneEnableCancelButton : true,
    addDestructiveButtonWithLabel : 'Delete it'
  };


  $scope.show = function() {

    $cordovaActionSheet.show(options)
      .then(function(btnIndex) {
        var index = btnIndex;
      });

  };
})
.controller('SpinnerDialogController', function($scope, $cordovaSpinnerDialog, $timeout) {

  $scope.show = function() {
    $cordovaSpinnerDialog.show("Chargement en cours","message", true);

    $timeout(function() {
      $cordovaSpinnerDialog.hide();
    }, 5000);
  };
})
.controller('ToastController', function($scope, $cordovaToast) {

  $scope.show = function() {
    $cordovaToast.show('Here is a message', 'long', 'center');
  };

  $scope.showShortTop = function() {
    $cordovaToast.showShortTop('Here is a message');
  };

  $scope.showLongBottom = function() {
    $cordovaToast.showLongBottom('Here is a message');
  };


})
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html"
  })

  .state('index', {
    url: "/index",
    templateUrl: "templates/index.html"
  })

  .state('forms', {
    url: "/forms",
    templateUrl: "templates/forms.html"
  })

  .state('app.navigation1', {
    url: "/navigation1",
    views: {
      'menuContent': {
        templateUrl: "templates/navigation1.html"
      }
    }
  })

  .state('app.navigation2', {
    url: "/navigation2",
    views: {
      'menuContent': {
        templateUrl: "templates/navigation2.html"
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/index');
});

function DemoController(){}

DemoController.prototype.archiver = function() {
  alert('Archive');
};

DemoController.prototype.supprimer = function() {
  alert('Delete');
};
