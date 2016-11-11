    app.controller('newSearchController', ['$scope','Factory', '$location', 'sharedProperties', 'commonFunctions', function($scope,Factory, $location, sharedProperties, commonFunctions){

        var promise = Factory.getRequisitionTableList();

        promise.then(function(response){
            var result = $scope.data = response.data.requisitionList;
            $scope.requisition = result.map(function(item){
                return item.poolId + ' ' + item.requisitionTitle;
            });
        });


    }]);


