app.controller('popoverController', ['$scope', '$rootScope', 'Factory', '$timeout', 'sharedProperties', 'commonFunctions', function ($scope, $rootScope, Factory, $timeout, sharedProperties, commonFunctions) {
    var list = {
        'reqGoal': {
            'status': 1
            , 'url': 'RequisitionGoal'
        }
        , 'reqHistory': {
            'status': 0
            , 'url': 'RequisitionHistory'
        }
        , 'reqActivity': {
            'status': 0
            , 'url': 'RequisitionStatus'
        }
        , 'canPipeline': {
            'status': 2
            , 'url': 'CandidatePipeline'
        }
        , 'canHistory': {
            'status': 0
            , 'url': 'CandidateHistory'
        }
        , 'canSource': {
            'status': 0
            , 'url': 'CandidateSource'
        }
    }
    var turn = 1;
    $rootScope.graph = {};
    var promise = Factory.getGraphList();
    promise.then(function resolved(response) {
        var a = response.data;
        if (a.length){
            for (var i = 0; i < a.length; i++){
                for (var key in list){
                    if (list[key]['url'] == a[i].GraphName) {
                        $rootScope.graph[a[i].GraphName] = a[i];
                    }
                }
            }
        }

        $scope.ReqUrl = "partial/_RequisitionGoal.html";
        $scope.CanUrl = "partial/_CandidatePipeline.html";
        /*angular.forEach(response.data, function (value) {
            if (value['RequisitionGraphName'] !== null && value['CandidateGraphName'] !== null) {
                $rootScope.graphDetails = value;
            }
        })

        $scope.ReqUrl = "partial/_" + $rootScope.graphDetails.RequisitionGraphName + ".html";
        $scope.CanUrl = "partial/_" + $rootScope.graphDetails.CandidateGraphName + ".html";

        var p = list;
        for (var key in p) {
            if (p.hasOwnProperty(key)) {
                if (p[key]['url'] == $rootScope.graphDetails.RequisitionGraphName) {
                    p[key]['status'] = 1;
                }
                else if (p[key]['url'] == $rootScope.graphDetails.CandidateGraphName) {
                    p[key]['status'] = 2;
                }
                else {};
            }
        }*/
    });
    $scope.cancel = function () {
        $scope.isOpen = false;
    };
    commonFunctions.getSearcherJson();
    $scope.initial = function () {
      commonFunctions.GAEventHandler(sharedProperties.getGAEventData().SelectChartButton);
        $timeout(function () {
            initialSetup();
        }, 10);
    }
    var initialSetup = function () {
        var el = '';
        angular.forEach(list, function (val, key) {
            if (val.status !== 0) {
                el = $('#' + key);
                el.parent().addClass('Selected');
                el.prop('disabled', true);
                el.prop('checked', true);
            }
        })
    }
    $scope.open = function () {
        var el = $(event.target);
        var activeEl = '';
        if (el.is('input')) {
            angular.forEach(list, function (val, key) {
                if (val.status == 1) {
                    activeEl = $('#' + key);
                    val.status = 0;
                    activeEl.parent().removeClass('Selected');
                    activeEl.prop('disabled', false);
                    activeEl.prop('checked', false);
                }
                if (val.status == 2) {
                    val.status = 1;
                }
                if (key == el.attr('id')) {
                    var str = 'partial/_' + val.url + '.html';
                    sharedProperties.setSelectedForesightGraph(val.url);
                    if (turn == 1) {
                        $scope.ReqUrl = str;
                        turn = 2;
                    }
                    else {
                        $scope.CanUrl = str;
                        turn = 1;
                    }
                    el.parent().addClass('Selected');
                    el.prop('disabled', true);
                    val.status = 2;
                }
            });
        }
    }
}]);
