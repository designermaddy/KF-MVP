app.controller('candidateHistoryController', ['$scope', 'Factory', 'sharedProperties', '$location', 'commonFunctions', '$timeout', 'config', '$rootScope', function ($scope, Factory, sharedProperties, $location, commonFunctions, $timeout, config, $rootScope) {
    var labels = [];
    var datas = [];
    var deeplinkURL = '';
    var graphName = 'CandidateHistory'; //'CandidatePipeline';
    var deeplinkURL = '';
     var graphVar = {};
    $scope.selectedEngagment = null;
    $scope.selectedButton = 'company';
    $scope.selectedYear = '2016';
   $scope.selectedQuater = 'Q4';

    function setInitialValues() {
        $('div[ng-controller="candidateHistoryController"] a.active').removeClass('active');
        $scope.selectedButton == 'mygraph' ? $('#chmg').addClass('active') : $('#chcy').addClass('active');
        $('div#chqcdiv a:contains("' + $scope.selectedQuater + '")').addClass('active');
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
                $scope.selectedQuater = d.QuaterYear.slice(4, 6);
            }
            setInitialValues();
        }
    }
    $scope.quaterYear = $scope.selectedYear + $scope.selectedQuater;

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
        $scope.selectedQuater = $event.target.innerHTML;
        $scope.quaterYear = $scope.selectedYear + $scope.selectedQuater;
    }
    $scope.yearCall = function () {
        $scope.quaterYear = $scope.selectedYear + $scope.selectedQuater;
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
        var companyId = commonFunctions.getCompanyId($scope.allEngagments, $scope.selectedEngagment);
        var v = {
            'GraphType': $scope.selectedButton
            , 'Engagement': $scope.selectedEngagment
            , 'companyId': companyId
            , 'QuaterYear': $scope.quaterYear
        }
        if (angular.equals(graphVar, v)) {
            //do nothing
        }
        else {
            graphVar = Object.assign({}, v);
            $rootScope.graph[graphName].mdata = Object.assign({}, v);
            var promise = Factory.getChart(graphName, $scope.selectedButton, $scope.selectedEngagment, companyId,$scope.position, $scope.quaterYear);
            promise.then(function resolved(response) {
                if (response.data.graphDetails && Object.keys(response.data.graphDetails.data).length > 0) {
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
    // $scope.labels = ['Source', 'Screen', 'Submit', 'Interview', 'Offer', 'Accept'];
    /* $scope.kick = [
       [65, 59, 90, 81, 56, 55],
       [28, 48, 40, 19, 96, 27],
       [34, 48, 46, 79, 76, 37]
     ];
     console.log($scope.kick)*/
    $timeout(function () {
        $('#requisitionGoalList').selectpicker();
        //console.log($('.selectpicker'))
    }, 50, false);
    $rootScope.$watch(function () {
        return config.getAllEngagments
    }, function () {
        // do something here
        //config.searcherReq
        callgraphDropDownFunc();
    }, true);
    $scope.$watch(function () {
        return $scope.quaterYear;
    }, function () {
        requisitonGoalStackBarChart();
    });
  }]);
