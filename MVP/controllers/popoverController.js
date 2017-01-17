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
    for (var key in list) {
        $rootScope.graph[list[key].url] = {
            'firstTime': true
            , 'loadedFromBackend': false,
            'Position' : null
        }
    }
    var promise = Factory.getGraphList();
    promise.then(function resolved(response) {
        var a = response.data;
        if (a.length) {
            for (var i = 0; i < a.length; i++) {
                for (var key in list) {
                    if (list[key]['url'] == a[i].GraphName) {
                        $rootScope.graph[a[i].GraphName].data = a[i];
                        $rootScope.graph[a[i].GraphName].loadedFromBackend = true;
                        if (i === 0) {
                            //check if the array contains just 1 element
                            var status;
                            if (a.length === 1) {
                                if (a[i].Position) {
                                    if (a[i].Position.toLowerCase() == 'left') status = 1;
                                    if (a[i].Position.toLowerCase() == 'right') status = 2;
                                }
                                else {
                                    var type = a[i].GraphName.indexOf('Req');
                                    if (type != -1) {
                                        status = 1;
                                    }
                                    else {
                                        status = 2;
                                    }
                                }
                                angular.forEach(list, function (val) {
                                    if (val.status === status) {
                                        val.status = 0;
                                    }
                                });
                                list[key]['status'] = status;
                                if (status == 1) {
                                    $scope.ReqUrl = "partial/_" + a[i].GraphName + ".html";
                                    $rootScope.graph[a[i].GraphName].Position = 'left';
                                    $scope.CanUrl = "partial/_CandidatePipeline.html";
                                    $rootScope.graph['CandidatePipeline'].Position = 'right';
                                }
                                else {
                                    $scope.ReqUrl = "partial/_RequisitionGoal.html";
                                    $rootScope.graph['RequsitionGoal'].Position = 'left';
                                    $scope.CanUrl = "partial/_" + a[i].GraphName + ".html";
                                    $rootScope.graph[a[i].GraphName].Position = 'right';
                                }
                            }
                            else {
                                status = 1;
                                if (a[i].Position) {
                                    if (a[i].Position.toLowerCase() == 'left') status = 1;
                                    if (a[i].Position.toLowerCase() == 'right') status = 2;
                                }else if (a[i + 1].Position){
                                    if (a[i + 1].Position.toLowerCase() == 'left') status = 2;
                                }
                                angular.forEach(list, function (val) {
                                    if (val.status === status) {
                                        val.status = 0;
                                    }
                                });
                                list[key]['status'] = status;
                                if (status === 1) {
                                    $scope.ReqUrl = "partial/_" + a[i].GraphName + ".html";
                                    $rootScope.graph[a[i].GraphName].Position = 'left';
                                }
                                else {
                                    $scope.CanUrl = "partial/_" + a[i].GraphName + ".html";
                                    $rootScope.graph[a[i].GraphName].Position = 'right';
                                }
                            }
                        }
                        else if (i === 1) {
                            status = 2;
                            if (a[i].Position) {
                                if (a[i].Position.toLowerCase() == 'left') status = 1;
                                if (a[i].Position.toLowerCase() == 'right') status = 2;
                            }
                            angular.forEach(list, function (val) {
                                if (val.status === status) {
                                    val.status = 0;
                                }
                            });
                            list[key]['status'] = status;
                            if (status === 1) {
                                $scope.ReqUrl = "partial/_" + a[i].GraphName + ".html";
                                $rootScope.graph[a[i].GraphName].Position = 'left';
                            }
                            else {
                                $scope.CanUrl = "partial/_" + a[i].GraphName + ".html";
                                $rootScope.graph[a[i].GraphName].Position = 'right';
                            }
                        }
                    }
                }
            }
        }
        else {
            $scope.ReqUrl = "partial/_RequisitionGoal.html";
            $rootScope.graph['RequsitionGoal'].Position = 'left';
            $scope.CanUrl = "partial/_CandidatePipeline.html";
            $rootScope.graph['CandidatePipeline'].Position = 'right';
        }
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
        var checkedListGraph = [];
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
                    checkedListGraph[val.status] = val.url;
                    // checkedList.graphName=val.url;
                    // graphSelection(checkedList);
                }
                if (key == el.attr('id')) {
                    var str = 'partial/_' + val.url + '.html';
                    sharedProperties.setSelectedForesightGraph(val.url);
                    checkedListGraph[val.status] = val.url;
                    //checkedList.graphName=val.url;
                    // graphSelection(checkedList);
                    if (turn == 1) {
                        $scope.ReqUrl = str;
                        $rootScope.graph[val.url].Position = 'left';
                        turn = 2;
                    }
                    else {
                        $scope.CanUrl = str;
                        $rootScope.graph[val.url].Position = 'right';
                        turn = 1;
                    }
                    el.parent().addClass('Selected');
                    el.prop('disabled', true);
                    val.status = 2;
                }
            });
        }
        //console.log( checkedListGraph)
        if (checkedListGraph) {
            graphSelection(checkedListGraph)
        }
    }

    function graphSelection(selectedGraphJson) {
        var checkedList = {
            "companyId": ""
            , "companyName": ""
            , "graphName": ""
            , "graphType": ""
            , "quater": ""
            , "quaterYear": ""
            , "year": ""
        }
        for (var i = 0; i < selectedGraphJson.length; i++) {
            checkedList.graphName = selectedGraphJson[i];
            var promise = Factory.getGraphSelection(checkedList);
            promise.then(function resolved(response) {
                console.log(response.data)
            });
        }
    }
}]);
