app.controller('requisitionSearchResultsController', ['$scope', 'Factory', 'commonFunctions', '$sce', function ($scope, Factory, commonFunctions, $sce) {
    
    var promise = Factory.getRequisitionSearch();
    promise.then(
      function resolved(response) {
          $scope.rowCollection = response.data.ArrayOfSocialAryaCandidate.SocialAryaCandidate;
          setValues();          
      },
      function rejected(response) {
          alert(response.status + ': ' + response.statusText);
      }
    )
    
    function setValues() {
      if($scope.rowCollection){
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.rowCollection.length;
            $scope.entryLimit = 8; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);            
      }
    }
    
    $scope.Status = function(row) {
        var str = '';
        if (row.Ignore == 'false') {
            str += '<i class="fa fa-circle" aria-hidden="true"></i>';
        }else if (row.Ignore == 'true') {
            str += '<i class="fa fa-ban" aria-hidden="true"></i>';            
        }
        
        if (row.Shortlist == 'true') {
            str += '<i class="fa fa-star" aria-hidden="true"></i>';
        }else if (row.Shortlist == 'false') {
            str += '<i class="fa fa-star-o" aria-hidden="true"></i>';
        }
        
        return $sce.trustAsHtml(str);
    }
    
}])