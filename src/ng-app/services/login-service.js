"use strict";

var LoginService = function($rootScope, $q, WhatsAppService, SERVICE_EVENTS) {
  var self = this;

  console.log(WhatsAppService);

  var onLoginIn = function() {
    $rootScope.$broadcast(SERVICE_EVENTS.onLoginIn, true);
    console.log("On Login In...");
  };

  var loginSucess = function() {
    WhatsAppService.whatsApi.sendIsOnline();
    $rootScope.$broadcast(SERVICE_EVENTS.loginSucess, true);
    console.log("Login Sucess");
  };

  var loginFailure = function(err) {
    $rootScope.$broadcast(SERVICE_EVENTS.loginFailure, err);
    console.error("Login Failure: ", err);
  };

  this.login = function(waAccountInfo) {
    onLoginIn();
    WhatsAppService.createAdapter(waAccountInfo);
    WhatsAppService.login().then(loginSucess, loginFailure);
  };
};

WhatsAppDesktop.service("LoginService", LoginService);
