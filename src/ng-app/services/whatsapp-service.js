"use strict";

var WhatsAppService = function($rootScope, $q) {
  var whatsapi = require('whatsapi');

  return {
    createAdapter: function(argument) {
      var self = this;
      self.wa = whatsapi.createAdapter(argument);
      console.log("createAdapter: ", self.wa);
    },

    login: function(logged) {
      var self = this;

      // logged is callback function
      if (logged === undefined) {
        logged = function (err) {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Logged in to WA server");
          self.wa.sendIsOnline();
        }
      }

      self.wa.connect(function(err) {
        if (err) {
          console.error(err);
          return;
        }

        self.wa.login(logged);
      });
      console.log("login");
    },

    requestGroupsList: function() {
      var self = this;

      console.log("requestGroupsList");
      self.wa.requestGroupsList(function(err, groups) {
        console.log(groups);
        if (err) {
          console.error(err);
          return;
        }

      })
    },

    requestLastSeen: function(to, func) {
      var self = this;

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
      console.log("requestLastSeen");
    },

    isLoggedIn: function() {
      var self = this;

      console.log(self.wa);
      return self.wa;
    }
  }
};

WhatsAppDesktop.factory("WhatsAppService", WhatsAppService);
