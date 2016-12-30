app.controller('candidateHistoryController', ['$scope', 'Factory', 'sharedProperties', '$location', 'commonFunctions', '$timeout', 'config', '$rootScope', function ($scope, Factory, sharedProperties, $location, commonFunctions, $timeout, config, $rootScope) {
    var labels = [];
    var datas = [];
    var deeplinkURL = '';
    var graphName = 'CandidateHistory'; //'CandidatePipeline';
    var deeplinkURL = '';
    $scope.selectedButton = 'company';
    $scope.selectedYear = '2016';
    var selectedQuater = 'Q4';
    var quaterYear = $scope.selectedYear + selectedQuater;

    function callgraphDropDownFunc() {
        if (config.getAllEngagments) {
            $scope.allEngagments = config.getAllEngagments;
            if ($scope.allEngagments.length > 0) {
                $scope.selectedEngagment = $scope.allEngagments[0].Engagement;
                requisitonGoalStackBarChart();
            }
        }
    }
    callgraphDropDownFunc();
    $scope.quaterCall = function ($event) {
        $($event.currentTarget).find('a.active').removeClass('active');
        $($event.target).addClass('active');
        selectedQuater = $event.target.innerHTML;
        quaterYear = $scope.selectedYear + selectedQuater;
    }
    $scope.yearCall = function () {
        quaterYear = $scope.selectedYear + selectedQuater;
    }
    $scope.update = function () {
        requisitonGoalStackBarChart();
    }
    $scope.callmyClientRequisition = function (selectedButton) {
        $scope.selectedButton = selectedButton;
        if (selectedButton == "mygraph") {
            $("#chcy").removeClass('active');
            $('#chmg').addClass('active');
        }
        else if (selectedButton == "company") {
            $("#chmg").removeClass('active');
            $('#chcy').addClass('active');
        }
        requisitonGoalStackBarChart();
    }

    function requisitonGoalStackBarChart() {
        var promise = Factory.getChart(graphName, $scope.selectedButton, $scope.selectedEngagment, quaterYear);
        promise.then(function resolved(response) {
            if (Object.keys(response.data.graphDetails.data).length > 0) {
                deeplinkURL = response.data.graphDetails.deepLinkURI;
                datas.push(JSON.parse("[" + response.data.graphDetails.data.Accept + "]"));
                datas.push(JSON.parse("[" + response.data.graphDetails.data.Offer + "]"));
                datas.push(JSON.parse("[" + response.data.graphDetails.data.Submit + "]"));
                datas.push(JSON.parse("[" + response.data.graphDetails.data.Interview + "]"));
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
            }else {
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
    // $scope.labels = ['Source', 'Screen', 'Submit', 'Interview', 'Offer', 'Accept'];
    /* $scope.kick = [
       [65, 59, 90, 81, 56, 55],
       [28, 48, 40, 19, 96, 27],
       [34, 48, 46, 79, 76, 37]
     ];
     console.log($scope.kick)*/
    $timeout(function () {
        $('#requisitionGoalList').selectpicker();
        console.log($('.selectpicker'))
    }, 50, false);
    $rootScope.$watch(function () {
        return config.getAllEngagments
    }, function () {
        // do something here
        //config.searcherReq
        callgraphDropDownFunc();
    }, true);
    $scope.$watch(function () {
        return quaterYear;
    }, function () {
        requisitonGoalStackBarChart();
    });
  }]);
