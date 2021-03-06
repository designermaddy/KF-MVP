app.controller('requisitionGoalController', ['$scope', '$rootScope', 'Factory', 'sharedProperties', '$location', 'commonFunctions', '$timeout', 'config', '$rootScope', function ($scope, $rootScope, Factory, sharedProperties, $location, commonFunctions, $timeout, config, $rootScope) {
    var labels = [];
    var datas = [];
    var deeplinkURL = '';
    $scope.selectedButton = 'company';
    $scope.selectedEngagment = null;
    var graphName = 'RequisitionGoal';
    var graphVar = {};
    $scope.callmyClientRequisition = function (selectedButton, test) {
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
                if (!test) {
                    requisitonGoalStackBarChart($scope.selectedEngagment);
                }
            }
        }
        /**
            1. Is it loading for the first time ? Check for $rootscope. Is data available ? Use it or use default values.
            2. Is it not loading for the first time ? What were the old values selected ? Uangular.isObject(d*)*/
    if (angular.isDefined($rootScope.graph[graphName])) {
        var a = $rootScope.graph[graphName];
        var d = '';
        $scope.position = $rootScope.graph[graphName].Position;
        if (a.firstTime == true) {
            if (a.loadedFromBackend == true) {
                d = a.data;
            }
            else {

            }
            $rootScope.graph[graphName].firstTime = false;
        }
        else {
            d = a.mdata;
        }
        if (angular.isObject(d)) {
            $scope.selectedEngagment = d.Engagement;
            $scope.selectedButton = d.GraphType ? d.GraphType : 'company';
            $scope.callmyClientRequisition($scope.selectedButton, true)
        }
    }
    callgraphDropDownFunc();

    function callgraphDropDownFunc() {
        if (config.getAllEngagments.length > 0) {
            $scope.allEngagments = config.getAllEngagments;
            if (!$scope.selectedEngagment) {
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
        var companyId = commonFunctions.getCompanyId($scope.allEngagments, engagement);
        var v = {
            'GraphType' : $scope.selectedButton,
            'Engagement' : engagement,
            'companyId' : companyId
        }
        if (angular.equals(graphVar, v)) {
            //do nothing
        }else {
            graphVar = Object.assign({},v);
            $rootScope.graph[graphName].mdata = Object.assign({},v);
            var promise = Factory.getChart(graphName, $scope.selectedButton, engagement, companyId, $scope.position);
            promise.then(function resolved(response) {
                $scope.labels = ['Source', 'Screen', 'Submit', 'Interview', 'Offer', 'Accept'];
                if (response.data.graphDetails && response.data.graphDetails.data && Object.keys(response.data.graphDetails.data).length > 0) {
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
    // $scope.labels = ['Source', 'Screen', 'Submit', 'Interview', 'Offer', 'Accept'];
    /* $scope.kick = [
       [65, 59, 90, 81, 56, 55],
       [28, 48, 40, 19, 96, 27],
       [34, 48, 46, 79, 76, 37]
     ];
     console.log($scope.kick)*/
  }]);
