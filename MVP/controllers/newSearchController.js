    app.controller('newSearchController', ['$scope','Factory', '$location', 'sharedProperties', 'commonFunctions', function($scope,Factory, $location, sharedProperties, commonFunctions){

        $scope.data = {};
        var result;

        function getReq() {
            var promise = Factory.getRequisitionTableList();
            promise.then(function(response){
                result = response.data.requisitionList;
                $scope.requisition = result.map(function(item){
                    return item.poolId + ' ' + item.requisitionTitle;
                });
            });
        }
        getReq();

        $scope.fillData = function($item, $model, $label, $event) {
            var poolId = $item.match(/\d+/g)[0];
            var reqNum;

            angular.forEach(result, function(value, key) {
                if(value.poolId == poolId){
                    reqNum = value.requisitionNumber;
                    getArya(reqNum);
                }
            });

        }

        function getArya(reqNum){
            var promise = Factory.getAryaJobId(reqNum);
            promise.then(function(response){
                $scope.data = response.data;
            });
        }

        $scope.save = function() {
            console.log($scope.data);
            var promise = Factory.saveNewSearch($scope.data);
            promise.then(function(response){
                console.log(response.data);

            });
        }
    }]);


