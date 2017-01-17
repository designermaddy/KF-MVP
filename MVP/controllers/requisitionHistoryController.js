app.controller('requisitionHistoryController', ['$scope', 'Factory', 'sharedProperties', '$location', 'commonFunctions', '$timeout', 'config', '$rootScope', function ($scope, Factory, sharedProperties, $location, commonFunctions, $timeout, config, $rootScope) {
    var labels = [];
    var datas = [];
    var deeplinkURL = '';
    var graphName = 'RequisitionHistory';
    var deeplinkURL = '';
    var graphVar = {};
    $scope.selectedEngagment = null;
    $scope.selectedButton = 'company';
    $scope.selectedYear = '2016';
    var selectedQuater = 'Q4';

    function setInitialValues() {
        $('div[ng-controller="requisitionHistoryController"] a.active').removeClass('active');
        $scope.selectedButton == 'mygraph' ? $('#myReqsRH').addClass('active') : $('#clientReqsRH').addClass('active');
        $('div#rhqcdiv a:contains("' + selectedQuater + '")').addClass('active');
    }
    setInitialValues();
    if (angular.isDefined($rootScope.graph[graphName])) {
        var a = $rootScope.graph[graphName];
        var d = '';
        $scope.position = $rootScope.graph[graphName].Position;
        if (a.firstTime == true) {
            if (a.loadedFromBackend == true) {
                d = a.data;
            }
            else {
                //use default values.
            }
            $rootScope.graph[graphName].firstTime = false;
        }
        else {
            d = a.mdata;
        }
        if (angular.isObject(d)) {
            $scope.selectedButton = d.GraphType ? d.GraphType : 'company';
            $scope.selectedEngagment = d.Engagement;
            if (d.QuaterYear) {
                $scope.selectedYear = d.QuaterYear.slice(0, 4);
                selectedQuater = d.QuaterYear.slice(4, 6);
            }
            setInitialValues();
        }
    }
    var quaterYear = $scope.selectedYear + selectedQuater;

    function callgraphDropDownFunc() {
        if (config.getAllEngagments) {
            $scope.allEngagments = config.getAllEngagments;
            if ($scope.allEngagments.length > 0) {
                if (!$scope.selectedEngagment) {
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
    $scope.yearCall = function () {
        quaterYear = $scope.selectedYear + selectedQuater;
    }
    $scope.update = function () {
        requisitonGoalStackBarChart();
    }
    $scope.callmyClientRequisition = function (selectedButton) {
            $scope.selectedButton = selectedButton;
            if (selectedButton == "mygraph") {
                $("#clientReqsRH").removeClass('active');
                $('#myReqsRH').addClass('active');
            }
            else if (selectedButton == "company") {
                $("#myReqsRH").removeClass('active');
                $('#clientReqsRH').addClass('active');
            }
            requisitonGoalStackBarChart();
        }
        //requisitonGoalStackBarChart(graphName, $scope.selectedButton);
    function requisitonGoalStackBarChart() {
        var companyId = commonFunctions.getCompanyId($scope.allEngagments, $scope.selectedEngagment);
        var v = {
            'GraphType': $scope.selectedButton
            , 'Engagement': $scope.selectedEngagment
            , 'companyId': companyId
            , 'QuaterYear': quaterYear
        }
        if (angular.equals(graphVar, v)) {
            //do nothing
        }
        else {
            graphVar = Object.assign({}, v);
            $rootScope.graph[graphName].mdata = Object.assign({}, v);
            var promise = Factory.getChart(graphName, $scope.selectedButton, $scope.selectedEngagment, companyId,$scope.position, quaterYear);
            promise.then(function resolved(response) {
                if (response.data.graphDetails && Object.keys(response.data.graphDetails.data).length > 0) {
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
                }
                else {
                    $scope.data = [];
                    if (response.data.graphDetails && response.data.graphDetails.deepLinkURI)
                        deeplinkURL = response.data.graphDetails.deepLinkURI;
                }
            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            })
        }
    };
        $scope.onClick = function (points, evt) {
            console.log('hello' + deeplinkURL); // 0 -> Series A, 1 -> Series B
            sharedProperties.setReportURL(deeplinkURL)
            $("li[class='active']").removeClass('active');
            $('#ReportHeader').addClass('active');
            $location.path('/Reports');
        };
   $scope.imageClick = function(){
              console.log('hello' + deeplinkURL); // 0 -> Series A, 1 -> Series B
            sharedProperties.setReportURL(deeplinkURL)

            $("li[class='active']").removeClass('active');
            $('#ReportHeader').addClass('active');
            $location.path('/Reports');
        }
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
