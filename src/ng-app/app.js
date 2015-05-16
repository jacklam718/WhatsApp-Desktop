// "use strict";

var WhatsAppDesktop = angular.module("WhatsAppDesktop", [
  "ngRoute",
  "ui.router",
  "ngMaterial",
  "ngCookies",
  "ngMdIcons",
  "hyperContentFor"
]);

var config = function($routeProvider, $stateProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
  // $locationProvider.html5Mode({enabled: true, requireBase: true});
  routeProvider = $routeProvider;
  stateProvider = $stateProvider;
  $routeProvider
    .when("/", {
      controller: "ChatsController",
      templateUrl:  "ng-app/chats/chats.html"
    })
    .when("/login", {
      controller: "LoginController",
      templateUrl: "ng-app/login/login.html"
    })
    .otherwise("/")

  $mdThemingProvider.theme("docs-dark", "default")
    .primaryPalette('yellow')
    .dark();
};

WhatsAppDesktop.config(config);

WhatsAppDesktop.run(function($rootScope, $location, WhatsAppService) {
  if (! WhatsAppService.isLoggedIn()) {
    setTimeout(function() {
      $rootScope.$apply(function() {
        $location.path("/login");
      })
    }, 0);
  }
})

WhatsAppDesktop.constant("SERVICE_EVENTS", {
  loginSucess: "login-sucess",
  loginFailure: "login-faulure",
})
