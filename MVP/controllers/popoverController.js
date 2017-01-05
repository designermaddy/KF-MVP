app.controller('popoverController', ['$scope', '$rootScope', 'Factory', '$timeout', 'sharedProperties', 'commonFunctions', function ($scope, $rootScope, Factory, $timeout, sharedProperties, commonFunctions) {
    var list = {
        'reqGoal': {
            'status': 0
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
            'status': 0
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
    $rootScope.graphDetails = {};
    var promise = Factory.getGraphList();
    promise.then(function resolved(response) {
        angular.forEach(response.data, function (value) {
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
        }
    });
    $scope.cancel = function () {
        $scope.isOpen = false;
    };
    commonFunctions.getSearcherJson();
    $scope.initial = function () {
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
