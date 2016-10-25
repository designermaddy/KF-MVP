app.controller('requisitionSearchController', ['$scope', 'Factory', function($scope, Factory) {
    var promise = Factory.getRequisitionSearchResults();
    promise.then(function(response){
            //console.log('hi');
            var result = response.data.requisition;
            $scope.list = result.map(function(item){
                return item.RequisitionNumber + '  ' + item.Requisition;
            });
        });    
}]);