app.controller('requisitionGoalController', ['$scope', '$rootScope', 'Factory', 'sharedProperties', '$location', 'commonFunctions', '$timeout', 'config', '$rootScope', function ($scope, $rootScope, Factory, sharedProperties, $location, commonFunctions, $timeout, config, $rootScope) {
    var labels = [];
    var datas = [];
    var deeplinkURL = '';
    $scope.selectedButton = 'company';


    var graphName = 'RequisitionGoal';

    if (angular.isDefined($rootScope.graph[graphName])){
        var a = $rootScope.graph[graphName];
        $scope.selectedEngagment = a.Engagement;
        $scope.selectedButton = a.GraphType ? a.GraphType : 'company';
    }

    $scope.callmyClientRequisition = function (selectedButton) {
        if (selectedButton) {
            $scope.selectedButton = selectedButton;
            if (selectedButton == "mygraph") {
                $("#clientReqs").removeClass('active');
                $('#myReqs').addClass('active');
            }
            else if (selectedButton == "company") {
                $("#myReqs").removeClass('active');
                $('#clientReqs').addClass('active');
            }
            else {}
            requisitonGoalStackBarChart($scope.selectedEngagment);
        }
    }
    callgraphDropDownFunc();

    function callgraphDropDownFunc() {
        if (config.getAllEngagments.length > 0) {
            $scope.allEngagments = config.getAllEngagments;
            if (!$scope.selectedEngagment){
                $scope.selectedEngagment = config.getAllEngagments[0].Engagement;
            }
            requisitonGoalStackBarChart($scope.selectedEngagment);
        }
    }

    $scope.update = function () {
        requisitonGoalStackBarChart($scope.selectedEngagment)
    }
    //requisitonGoalStackBarChart(graphName, $scope.selectedButton);

    function requisitonGoalStackBarChart(engagement) {
        var promise = Factory.getChart(graphName, $scope.selectedButton, engagement);
        promise.then(function resolved(response) {
            if (Object.keys(response.data.graphDetails.data).length > 0) {
                deeplinkURL = response.data.graphDetails.deepLinkURI;
                datas = [];
                datas.push(JSON.parse("[" + response.data.graphDetails.data.Okay + "]"));
                datas.push(JSON.parse("[" + response.data.graphDetails.data["Nearly Due"] + "]"));
                datas.push(JSON.parse("[" + response.data.graphDetails.data.Overdue + "]"));
                $scope.series = response.data.graphDetails.series
                $scope.labels = response.data.graphDetails.lables;
                $scope.data = datas
                $scope.type = 'StackedBar';
                $scope.options = {
                    scales: {
                        xAxes: [{
                            stacked: true
                        , }]
                        , yAxes: [{
                            stacked: true
        }]
                    }
                };
            }
            else {
                $scope.data = [];
            }
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        })
    };
    $scope.onClick = function (points, evt) {
        console.log('hello' + deeplinkURL); // 0 -> Series A, 1 -> Series B
        sharedProperties.setReportURL(deeplinkURL)
        $("li[class='active']").removeClass('active');
        $('#ReportHeader').addClass('active');
        $location.path('/Reports');
    };
    $rootScope.$watch(function () {
        return config.getAllEngagments
    }, function () {
        // do something here
        //config.searcherReq
        callgraphDropDownFunc();
    }, true);
    // $scope.labels = ['Source', 'Screen', 'Submit', 'Interview', 'Offer', 'Accept'];
    /* $scope.kick = [
       [65, 59, 90, 81, 56, 55],
       [28, 48, 40, 19, 96, 27],
       [34, 48, 46, 79, 76, 37]
     ];
     console.log($scope.kick)*/
  }]);
