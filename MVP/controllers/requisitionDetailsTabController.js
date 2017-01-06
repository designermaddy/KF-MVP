app.controller('requisitionDetailsTabController', ['$scope', 'Factory', 'commonFunctions', '$sce', 'config', 'sharedProperties','$timeout', '$location', function ($scope, Factory, commonFunctions, $sce, config, sharedProperties, $timeout, $location) {
    var url = $location.url();
    var a = url.split('/');
    $scope.activetab = parseInt(a[a.length - 1]);

}]);
