
var SlidebarController = function($scope, WhatsAppService) {
  $scope.groups = [];

  $scope.groupInfo = function(group, event) {
    console.log(group, event);
  }

  $scope.requestGroupsList = function () {
    WhatsAppService.requestGroupsList().then(
      function(groupsList) {
        $scope.groups = groupsList;
      },
      function(err) {
        console.error("error: ", err);
      }
    )
  };

  $scope.reload = function() {
    $scope.requestGroupsList();
  };

  $scope.reload();
};

WhatsAppDesktop.controller("SlidebarController", SlidebarController);
