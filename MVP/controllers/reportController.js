app.controller('reportController', ['$scope','sharedProperties','config','$sce', function ($scope, sharedProperties, config, $sce) {
  // $scope.deeplinkURL= sharedProperties.getReportURL();

    if((sharedProperties.getReportURL()!=="empty") ){
         $scope.deeplinkURL= sharedProperties.getReportURL();
        $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.deeplinkURL);
        sharedProperties.setReportURL("empty")

    }else{
         $scope.deeplinkURL = config.foreSightGraph;
         $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.deeplinkURL);
    }

$('#addNewRequisitionCRM').on('ready', function() {
    $('#loadingSpinner').css('display', 'none');
});
$('#addNewRequisitionCRM').on('load', function() {
    $('#loadingSpinner').css('display', 'none');
});
}]);
