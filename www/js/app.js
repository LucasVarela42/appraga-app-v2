(function () {
  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  // 'starter.controllers' is found in controllers.js
  var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'jett.ionic.filter.bar']);

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  });

  app.config(function($stateProvider, $urlRouterProvider, $ionicFilterBarConfigProvider) {
    $stateProvider
    // setup an abstract state for the tabs directive
    .state('app', {
      cache: false,
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl',
      controller: 'PesquisarCtrl'
    })

    .state('app.tabs', {
      cache: false,
      url: '/tabs',
      views: {
        'menuContent': {
          templateUrl: 'templates/tabs.html',
        }
      }
    })

    .state('app.tabs.plantas', {
      // cache: false,
      url: '/plantas',
      views: {
        'tabPlantas': {
          templateUrl: 'templates/plantas.html',
          controller: 'AppragaCtrl'
        }
      }
    })

    .state('app.tabs.planta-detail', {
      cache: false,
      url: '/plantas/:plantaId',
      views: {
        'tabPlantas': {
          templateUrl: 'templates/planta-detail.html',
          controller: 'PlantaDetalhadaCtrl'
        }
      }
    })

    .state('app.tabs.planta-selecionada', {
      cache: false,
      url: '/planta-selecionada/:plantaId',
      views: {
        'tabPlantas': {
          templateUrl: 'templates/planta-selecionada.html',
          controller: 'PlantaSelecionadaCtrl'
        }
      }
    })

    .state('app.tabs.pragas', {
      // cache: false,
      url: '/pragas/:plantaId',
      views: {
        'tabPragas': {
          templateUrl: 'templates/pragas.html',
          controller: 'AppragaCtrl'
        }
      }
    })

    .state('app.tabs.praga-detail', {
      cache: false,
      url: '/praga-detail/:pragaId',
      views: {
        'tabPragas': {
          templateUrl: 'templates/praga-detail.html',
          controller: 'PragaDetalhadaCtrl'
        }
      }
    })

    .state('app.tabs.praga-selecionada', {
      cache: false,
      url: '/praga-selecionada/:pragaId',
      views: {
        'tabPragas': {
          templateUrl: 'templates/praga-selecionada.html',
          controller: 'PragaSelecionadaCtrl'
        }
      }
    })

    .state('app.tabs.manejos', {
      // cache: false,
      url: '/manejos/:pragaId',
      views: {
        'tabManejos': {
          templateUrl: 'templates/manejos.html',
          controller: 'AppragaCtrl'
        }
      }
    });

    // $ionicFilterBarConfigProvider.theme('dark');
    $ionicFilterBarConfigProvider.transition('horizontal');
    $ionicFilterBarConfigProvider.placeholder('Pesquisa');

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('app/tabs/plantas');
  });

}());
