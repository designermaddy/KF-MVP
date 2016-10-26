app.controller('requisitionSearchController', ['$scope', 'Factory', function($scope, Factory) {
    var promise = Factory.getRequisitionSearchResults();
	  $scope.ind = '';
    $scope.cli = '';
    $scope.name = '';
    $scope.data = [];
	
    promise.then(function(response){
            //console.log('hi');
            var result = response.data.requisition;
            $scope.list = result.map(function(item){
                return item.RequisitionNumber + '  ' + item.Requisition;
            });
        });    
}]);