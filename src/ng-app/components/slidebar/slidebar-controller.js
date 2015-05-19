
var SlidebarController = function($scope, WhatsAppService) {
  $scope.groups = [];

  $scope.groupInfo = function(group, event) {
    console.log(group, event);
  }

  $scope.requestGroupsList = function () {
    var sucess = function (groupsList) {
      $scope.groups = groupsList;
    };

    var failgure = function(err) {
      console.error("error: ", err);
    };

    WhatsAppService.requestGroupsList().then(sucess, failgure);
  };

  $scope.reload = function() {
    $scope.requestGroupsList();
  };

  $scope.reload();
};

WhatsAppDesktop.controller("SlidebarController", SlidebarController);
