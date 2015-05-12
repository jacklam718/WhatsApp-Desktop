"use strict";

var WhatsAppService = function($rootScope, $q) {
  var self = this;
  var whatsapi = require('whatsapi');

  return {
    createAdapter: function(argument) {
      self.wa = whatsapi.createAdapter(argument);
    },

    login: function(logged) {
      // logged is callback function
      if (logged === undefined) {
        logged = function (err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      }

      self.wa.connect(function(err) {
        if (err) {
          console.error(err);
          return;
        }

        self.wa.login(logged);
      })
    },

    requestGroupsList: function() {
      wa.requestGroupsList(function(err, groups) {
        if (err) {
          console.error(err);
          return;
        }
      })
    },

    requestLastSeen: function(to, func) {
      if (func === undefined) {
        func = function(err, lastSeen) {
          if (err && err.code == 405) {
            console.log('The user has denied last seen time');
            return;
          }
          console.log(lastSeen.date);
        }
      }

      self.wa.requestLastSeen(to, func);
    },

    isLoggedIn: function() {
      console.log(self.wa);
      return self.wa;
    }
  }
};

WhatsAppDesktop.factory("WhatsAppService", WhatsAppService);
