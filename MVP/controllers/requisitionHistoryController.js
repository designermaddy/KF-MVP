app.controller('requisitionHistoryController', ['$scope', 'Factory', 'sharedProperties', '$location', 'commonFunctions', '$timeout', 'config', '$rootScope', function ($scope, Factory, sharedProperties, $location, commonFunctions, $timeout, config, $rootScope) {
    var labels = [];
    var datas = [];
    var deeplinkURL = '';
    var graphName = 'RequisitionHistory';
    var deeplinkURL = '';
    $scope.selectedButton = 'company';
    $scope.selectedYear = '2016';
    var selectedQuater = 'Q4';


    if (angular.isDefined($rootScope.graph[graphName])){
        var a = $rootScope.graph[graphName];
        $scope.selectedButton = a.GraphType ? a.GraphType : 'company';
        $scope.selectedEngagment = a.Engagement;
        if(a.QuaterYear){
            $scope.selectedYear = a.QuaterYear.slice(0, 4);
            selectedQuater = a.QuaterYear.slice(4, 6);
        }
    }

    var quaterYear = $scope.selectedYear + selectedQuater;

    function callgraphDropDownFunc() {
        if (config.getAllEngagments) {
            $scope.allEngagments = config.getAllEngagments;
            if ($scope.allEngagments.length > 0) {
                if (!$scope.selectedEngagment){
                    $scope.selectedEngagment = $scope.allEngagments[0].Engagement;
                }
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
    $scope.yearCall = function (){
        quaterYear = $scope.selectedYear + selectedQuater;
    }
    $scope.update = function() {
        requisitonGoalStackBarChart();
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
            requisitonGoalStackBarChart();
        }
        //requisitonGoalStackBarChart(graphName, $scope.selectedButton);
    function requisitonGoalStackBarChart() {
        var promise = Factory.getChart(graphName, $scope.selectedButton, $scope.selectedEngagment, quaterYear);
        promise.then(function resolved(response) {
            if (Object.keys(response.data.graphDetails.data).length > 0) {
                deeplinkURL = response.data.graphDetails.deepLinkURI;
                datas.push(JSON.parse("[" + response.data.graphDetails.data.Fill + "]"));
                datas.push(JSON.parse("[" + response.data.graphDetails.data.Cancel + "]"));
                datas.push(JSON.parse("[" + response.data.graphDetails.data.Hold + "]"));
                datas.push(JSON.parse("[" + response.data.graphDetails.data.Open + "]"));
                $scope.series = response.data.graphDetails.series
                $scope.labels = response.data.graphDetails.lables;
                $scope.data = datas
                $scope.type = 'StackedBar';
                $scope.options = {
                    scales: {
                        xAxes: [{
                            stacked: true
                         }]
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
/*    $scope.onClick = function (points, evt) {
        console.log('hello' + deeplinkURL); // 0 -> Series A, 1 -> Series B
        sharedProperties.setReportURL(deeplinkURL) $("li[class='active']").removeClass('active');
        $('#ReportHeader').addClass('active');
        $location.path('/Reports');
    };*/
    $rootScope.$watch(function () {
        return config.getAllEngagments
    }, function () {
        // do something here
        //config.searcherReq
        callgraphDropDownFunc();
    }, true);
    $scope.$watch(function () {
        return quaterYear;   }, function () {
       requisitonGoalStackBarChart();
    });
  }]);
