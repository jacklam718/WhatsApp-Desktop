"use strict";

var LoginController = function($scope, $rootScope, $location, $route, LoginService, WhatsAppService, SERVICE_EVENTS) {
  $scope.whatsappInfo = {};
  $scope.isLoggedIn = false;

  $scope.login = function() {
    console.log($scope.whatsappInfo);
    LoginService.login($scope.whatsappInfo);
  };

  $rootScope.$on(SERVICE_EVENTS.loginSucess, function() {
    $scope.isLoggedIn = true;
    $scope.$apply(function() {
      $location.path("/");
    });
  });

  $rootScope.$on(SERVICE_EVENTS.loginFailure, function() {
    $scope.isLoggedIn = false;
  });
};

WhatsAppDesktop.controller("LoginController", LoginController);
