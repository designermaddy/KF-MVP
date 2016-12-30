app.controller('requisitionGoalController', ['$scope', 'Factory', 'sharedProperties', '$location', 'commonFunctions', '$timeout', 'config', '$rootScope', function ($scope, Factory, sharedProperties, $location, commonFunctions, $timeout, config, $rootScope) {
    var labels = [];
    var datas = [];
    var deeplinkURL = '';
    $scope.selectedButton = 'company';
    var graphName = 'RequisitionGoal'; //'CandidatePipeline';
    callgraphDropDownFunc();

    function callgraphDropDownFunc() {
        if (config.getAllEngagments) {
            console.log(config.getAllEngagments)
            $scope.allEngagments = config.getAllEngagments;
            if ($scope.allEngagments.length > 0) {
                $scope.selectedEngagment = $scope.allEngagments[0].Engagement;
                requisitonGoalStackBarChart($scope.selectedEngagment);
                /*  $timeout(function () {
                      $('#rgsfsp').selectpicker();
                  }, 50, false);*/
            }
        }
    }
    $scope.update = function () {
        requisitonGoalStackBarChart($scope.selectedEngagment)
    }
    $scope.callmyClientRequisition = function (selectedButton) {
        $scope.selectedButton = selectedButton;
        if (selectedButton == "mygraph") {
            $("#clientReqs").removeClass('active');
            $('#myReqs').addClass('active');
        }
        else if (selectedButton == "company") {
            $("#myReqs").removeClass('active');
            $('#clientReqs').addClass('active');
        }
        requisitonGoalStackBarChart($scope.selectedEngagment);
    }
    requisitonGoalStackBarChart(graphName, $scope.selectedButton);

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
