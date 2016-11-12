    app.controller('newSearchController', ['$scope','Factory', '$location', 'sharedProperties', 'commonFunctions', function($scope,Factory, $location, sharedProperties, commonFunctions){

        $scope.data = {};
        var result;

        function getReq() {
            var promise = Factory.getRequisitionTableList();
            promise.then(function(response){
                console.log(response.data);
                result = response.data.requisitions;
                $scope.requisition = result.map(function(item){
                    return item.ReqNumber + ' ' + item.JobTitle;
                });
            });
        }
        getReq();

        $scope.fillData = function($item, $model, $label, $event) {
            var reqNum = $item.split(' ')[0];
            getArya(reqNum);
        }

        function getArya(reqNum){
            var promise = Factory.getAryaJobId(reqNum);
            promise.then(function(response){
                $scope.data = response.data;
            });
        }

        $scope.save = function() {
            var promise = Factory.saveNewSearch($scope.data);
            promise.then(function(response){
                console.log(response.data);
            });
        }
    }]);


