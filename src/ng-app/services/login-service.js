"use strict";

var LoginService = function($rootScope, $q, WhatsAppService, WhatsAppEventHandlerService, SERVICE_EVENTS) {
  var self = this;

  console.log(WhatsAppService);

  var loginSucess = function() {
    $rootScope.$broadcast(SERVICE_EVENTS.loginSucess, true);
    console.log("Login Sucess");
  };

  var loginFailure = function(err) {
    $rootScope.$broadcast(SERVICE_EVENTS.loginFailure, err);
    console.error("Login Failure: ", err);
  };

  this.login = function(waAccountInfo) {
    WhatsAppService.createAdapter(waAccountInfo);
    WhatsAppService.login(function(err) {
      if (err) {
        loginFailure(err);
        return;
      };

      loginSucess();
    });
  };
};

WhatsAppDesktop.service("LoginService", LoginService);
