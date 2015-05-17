"use strict";

var LoginController = function($scope, $rootScope, $location, $localStorage, LoginService, WhatsAppService, SERVICE_EVENTS) {
  $scope.whatsappInfo = {};
  $scope.isLoggedIn = false;
  $scope.onLoginIn = false;

  var saveWaInfoOnLocalStorage = function() {
    $localStorage.whatsappInfo = $scope.whatsappInfo;
  }

  var loadWaInfoOnLocalStorage = function() {
    $scope.whatsappInfo = $localStorage.whatsappInfo;
  }

  $scope.login = function() {
    saveWaInfoOnLocalStorage()
    LoginService.login($scope.whatsappInfo);
  };

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

  loadWaInfoOnLocalStorage();
};

WhatsAppDesktop.controller("LoginController", LoginController);
