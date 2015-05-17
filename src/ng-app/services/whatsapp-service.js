// "use strict";

var WhatsAppService = function($rootScope, $q) {
  var whatsApi = require('whatsapi');

  return {
    createAdapter: function(argument) {
      var self = this;
      self.whatsApi = whatsApi.createAdapter(argument);
      wa = self.whatsApi
      console.log("createAdapter: ", self.whatsApi);
    },

    login: function(logged, whatsAppInfo) {
      var self = this;
      var deferred = $q.defer();

      self.createAdapter(whatsAppInfo);

      // logged is callback function
      if (logged === undefined) {
        logged = function (err) {
          if (err) {
            console.error(err);
            deferred.reject(err);
            return;
          }
          console.log("Logged in to WA server");
          self.whatsApi.sendIsOnline();
          deferred.resolve(true);
        }
      }

      self.whatsApi.connect(function(err) {
        if (err) {
          console.error(err);
          deferred.reject(err);
          return;
        }

        self.whatsApi.login(logged);
        console.log("login");
      });

      return deferred.promise;
    },

    requestGroupsList: function() {
      var self = this;
      var deferred = $q.defer();

      console.log("requestGroupsList");
      self.whatsApi.requestGroupsList(function(err, groups) {
        console.log(groups);
        if (err) {
          console.error(err);
          deferred.reject(err);
          return;
        }

        deferred.resolve(groups);
      });

      return deferred.promise;
    },

    requestLastSeen: function(to, func) {
      var self = this;
      var deferred = $q.defer();

      if (func === undefined) {
        func = function(err, lastSeen) {
          if (err && err.code == 405) {
            console.log('The user has denied last seen time');
            deferred.reject(err);
            return;
          }

          console.log(lastSeen.date);
          deferred.resolve(lastSeen);
        }
      }

      self.whatsApi.requestLastSeen(to, func);
      console.log("requestLastSeen");

      return deferred.promise;
    },

    isLoggedIn: function() {
      console.log("isLoggedIn");
      return this.whatsApi === undefined ? false : this.whatsApi.isLoggedIn();
    },

    receivedMessage: function (handler) {
      var self = this;

      if (handler === undefined) {
        handler = function(message) {
          console.log(message);
        }
      }

      self.whatsApi.on("receivedMessage", handler);
    },

    receivedLocation: function (handler) {
      var self = this;

      if (handler === undefined) {
        handler = function(location) {
          console.log(location);
        }
      }

      self.whatsApi.on("receivedLocation", handler);
    },

    receivedImage: function (handler) {
      var self = this;

      if (handler === undefined) {
        handler = function(image) {
          console.log(image);
        }
      }

      self.whatsApi.on("receivedImage", handler);
    },

    receivedVideo: function (handler) {
      var self = this;

      if (handler === undefined) {
        handler = function(video) {
          console.log(video);
        }
      }

      self.whatsApi.on("receivedVideo", handler);
    },

    receivedAudio: function (handler) {
      var self = this;

      if (handler === undefined) {
        handler = function(audio) {
          console.log(audio);
        }
      }

      self.whatsApi.on("receivedAudio", handler);
    },

    receivedVcard: function (handler) {
      var self = this;

      if (handler === undefined) {
        handler = function(vcard) {
          console.log(vcard);
        }
      }

      self.whatsApi.on("receivedVcard", handler);
    }
  }
};

WhatsAppDesktop.factory("WhatsAppService", WhatsAppService);
