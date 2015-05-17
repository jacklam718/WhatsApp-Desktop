"use strict";

var LoginController = function($scope, $rootScope, $location, $interval, $route, LoginService, WhatsAppService, SERVICE_EVENTS) {
  $scope.whatsappInfo = {};
  $scope.isLoggedIn = false;
  $scope.onLoginIn = false;

  $scope.login = function() {
    LoginService.login($scope.whatsappInfo);
  };

  $scope.determinateValue = 100;

  $rootScope.$on(SERVICE_EVENTS.onLoginIn, function() {
    $scope.onLoginIn = true;
  });

  $rootScope.$on(SERVICE_EVENTS.loginSucess, function() {
    $scope.isLoggedIn = true;
    $scope.onLoginIn = false;
    $location.path("/");
  });

  $rootScope.$on(SERVICE_EVENTS.loginFailure, function() {
    $scope.isLoggedIn = false;
    $scope.onLoginIn = false;
  });
};

WhatsAppDesktop.controller("LoginController", LoginController);
