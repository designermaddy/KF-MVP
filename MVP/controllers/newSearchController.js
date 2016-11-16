    app.controller('newSearchController', ['$scope','Factory', '$location', 'sharedProperties', 'commonFunctions', function($scope,Factory, $location, sharedProperties, commonFunctions){

        $scope.data = {};
        $scope.vm = {};
        var redirectPath = "Search";
        var result;
        var reqValue = 0;

        function getReq() {
            var promise = Factory.getRequisitionTableList();
            promise.then(function(response){
                result = response.data.requisitions;
                $scope.requisition = result.map(function(item){
                    return item.ReqNumber + ' ' + item.JobTitle;
                });
            });
        }

        if (sharedProperties.getNewSearchData() !== 0){
            reqValue = sharedProperties.getNewSearchData();
            var reqNum = reqValue[0];
            $scope.name = reqNum + ' ' + reqValue[1];
            getArya(reqNum, 1);
            redirectPath = "RequisitionDetails/3"
            sharedProperties.setNewSearchData(0);
        }else {
            getReq();
        }

        $scope.fillData = function($item, $model, $label, $event) {
            var reqNum = $item.split(' ')[0];
            getArya(reqNum);
        }

        function getArya(reqNum, i){
            var i = i || 0;

            var promise = Factory.getAryaJobId(reqNum);
            promise.then(function(response){
                $scope.data = response.data;
                disableInput(i);
            });
        }

        function disableInput(i) {
            var inputs = $('input');
            var i = i ? 0 : 1;
            for (i; i < 7; i++ ){
                inputs[i].disabled = true;
            }
        }

        $scope.save = function() {
            if (reqValue !== 0) {
                if (reqValue[0] + ' ' + reqValue[1] == $scope.vm.name){
                    callBackend();
                }else {
                    commonFunctions.error('Please enter valid Requistion value');
                }
            }else if (checkReq()) {
                callBackend();
            }else {
                commonFunctions.error('Please select a valid Requisition Number or ID');
            }
        }

        function callBackend () {
            var promise = Factory.saveNewSearch($scope.data);
                //$scope.data.PostingDate = getTimeStamp();
            promise.then(function(response){
                var code = response.data.Code;
                if (code == 0) {
                    $location.path(redirectPath);
                }else {
                     commonFunctions.error('Error : ' + response.data.Message);
                }
            });
        }

        function checkReq () {
            var val = $scope.vm.name;
            var found = false;
            if (val){
                angular.forEach(result, function(value, key){
                    if(value.ReqNumber + ' ' + value.JobTitle == val){
                        found = true;
                    }
                })
            }
            return found;
        }

        function getTimeStamp() {
            var now = new Date();
            return ( now.getFullYear() + '-' +
                    (now.getMonth() + 1) + '-' +
                    (now.getDate()) + " " +
                     now.getHours() + ':' +
                     ((now.getMinutes() < 10)
                         ? ("0" + now.getMinutes())
                         : (now.getMinutes())) + ':' +
                     ((now.getSeconds() < 10)
                         ? ("0" + now.getSeconds())
                         : (now.getSeconds())));
        }

        $scope.vm = {
        priceSlider1 : {
                value: 5
                , options: {
                    ceil: 5
                    , floor: 0
                    , showTicksValues: true
                }
        },
        priceSlider2 : {
                value: 5
                , options: {
                    ceil: 5
                    , floor: 0
                    , showTicksValues: true
                }
        },
        priceSlider3 : {
                value: 5
                , options: {
                    ceil: 5
                    , floor: 0
                    , showTicksValues: true
                }
        },
        priceSlider4 : {
                value: 5
                , options: {
                    ceil: 5
                    , floor: 0
                    , showTicksValues: true
                }
        },
        priceSlider5 : {
                value: 5
                , options: {
                    ceil: 5
                    , floor: 0
                    , showTicksValues: true
                }
          },


        priceSlider6 : {
                value: 5
                , options: {
                    ceil: 5
                    , floor: 0
                    , showTicksValues: true
                }
            },
        priceSlider8 : {
                value: 5
                , options: {
                    ceil: 5
                    , floor: 0
                    , showTicksValues: true
                }
            },
            priceSlider7 : {
                minValue: 1
                , maxValue: 8
                , options: {
                    ceil: 10
                    , floor: 0
                    , showTicksValues: false
                }
            },
            refreshSlider : function () {
                $timeout(function () {
                    $scope.$broadcast('rzSliderForceRender');
                });
            }
                                           }

    }]);


