app.controller('requisitionSearchResultsController', ['$scope', 'Factory', 'commonFunctions', '$sce', function ($scope, Factory, commonFunctions, $sce) {
    
    var promise = Factory.getRequisitionSearch();
    promise.then(
      function resolved(response) {
          $scope.rowCollection = response.data.aryaSourcedCandidatesList;
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
    
    $scope.status = function(row) {
        var str = '';
        if (row.ignore == 'false') {
            //str += '<i class="fa fa-circle" aria-hidden="true"></i>';
            str += "";
        }else if (row.ignore == 'true') {
            str += '<i class="fa fa-ban" aria-hidden="true"></i>';            
        }
        
        if (row.shortlist == 'true') {
            str += '<i class="fa fa-star" aria-hidden="true"></i>';
        }else if (row.shortlist == 'false') {
            //str += '<i class="fa fa-star-o" aria-hidden="true"></i>';
            str += "";
        }
        
        return $sce.trustAsHtml(str);
    }
    
}])