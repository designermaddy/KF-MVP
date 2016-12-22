// create the module and name it desktopApp
var app = angular.module('desktopApp', ['ui.router', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ngTouch', 'ngAnimate', 'chart.js', 'ui.bootstrap', 'smart-table', 'easypiechart', 'ya.pdf', 'rzModule', 'angularSpinner', 'angularTrix', 'ncy-angular-breadcrumb']);
app.run(function ($http, sharedProperties, $cookies, config, Factory, commonFunctions) {
    var count = sharedProperties.getCounter();
    if (count == 0) {
        var authToken = $cookies.get('RD-Access-Token');
        var searcherToken = $cookies.get('accessToken');
        searcherToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJFQUFBQU5PQkhleU5Id0RCdC9QOEljeEQ2eFlpSGJMRG5XMUgyZmlQRHYxSjdIdHArVy8wUEJMWEpsRVJvdmprRzZVSm5wRHVEUWZZbXlCTUM1WWo2Y0poVXlVPSIsImlzcyI6Imh0dHBzOi8vbmFhcGkuc2Uua29ybmZlcnJ5LmNvbSIsImF1ZCI6Imh0dHBzOi8vbmFhcGkuc2Uua29ybmZlcnJ5LmNvbSIsImV4cCI6MTQ4MTAxMzI5NiwibmJmIjoxNDgxMDEyMDk2fQ.DcpWpl32J1ceZfLTwHBE-54tp-_pO03TRqBMv3JopFA";
        config.accessTokenSearcher = searcherToken;
        if (config.production < 9) {
            var authToken = config.token
            var searcherToken = config.accessTokenSearcher;
        }
        if (authToken) {
            $http.defaults.headers.common['RD-Access-Token'] = authToken
        }
        sharedProperties.setCounter(1)
    }
    /*if(config.accessTokenSearcher){

        var promise = Factory.kornferry(searcherToken);
            promise.then(
              function resolved(response) {
                // $scope.rowCollection = response.data.requisitions;
                  var countItem = response.data.count;
                  if(countItem==0){
                     callSearcherJsonMethod()
                  }else{
                      var searcherItems = response.data;
                      config.searcherItemFromKornferry = searcherItems
                       getSearcherRequisitions(searcherItems);
                  }
                  console.log( countItem)

              },
              function rejected(response) {
                  commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
                  callSearcherJsonMethod()
              }
          )
    }
    function callSearcherJsonMethod(){
          var promise = Factory.getSearcherReqList();
                promise.then(
                  function resolved(response) {
                      var searcherItems = response.data;
                       config.searcherItemFromKornferry = searcherItems;
                      getSearcherRequisitions(searcherItems);
                  },
                      function rejected(response) {
                      commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
                  }
                )
    }
    function getSearcherRequisitions(searcherItems){
         var promise = Factory.getSearcherRequisitions(searcherItems);
                promise.then(
                  function resolved(response) {

                      config.searcherReq = response.data.requisitions;
                      console.log(response)

                  },
                      function rejected(response) {
                      commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
                  }
                )
    }*/
    //sharedProperties.setAuthGlobalToken(authToken)
    //var authToken = "ZW1haWw6U2VldGhhaWFoTUBoZXhhd2FyZS5jb20sZGVzaWduYXRpb246bnVsbCxpZHBVc2VySWQ6NTYxN2RmMjAtYTg2NS00Yjk3LWFjODAtYmNiZTllZDA2NDQwLGFyeWFVc2VySWQ6bnVsbCxhcnlhUGFzc3dvcmQ6bnVsbCxhY3RpdmF0ZVVzZXJJZDpudWxsLGFjdGl2YXRlUGFzc3dvcmQ6bnVsbCxuYW1lOm51bGwsZmlyc3ROYW1lOm51bGwsbGFzdE5hbWU6bnVsbCxkaXNwbGF5TmFtZTpudWxsLA=="
});
app.run(function ($rootScope, $window, $location) {
        $window.ga('create', 'UA-70288511-2', 'auto');
        $rootScope.$on('$stateChangeSuccess', function (event) {
            $(function () {
                $window.ga('send', 'pageview', $location.path());
                var content = $('.ContentBox').height();
                var sidebar = $('.SideBar').height();
                if (content > sidebar) {
                    $('.SideBar').css('min-height', content);
                }
            });
        })
    })
    // var interceptor = function() {
    // if(sharedProperties.getAuthGlobalToken()){
    // return {
    // 'request': function(config) {
    // config.headers['Authorization'] = sharedProperties.getAuthGlobalToken();
    // }
    // }
    // }
    // };
app.controller('MainCtrl', function ($scope) {});
app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});
app.filter('mydateStatic', function () {
    return function (items, model) {
        var parseDate = function (date) {
            var parts = date.split('/');
            return new Date(parts[2], part[1] - 1, part[0])
        }
        var result = [];
        if (items.length > 0) {
            if (Object.keys(model).length && model.StartDate || model.EndDate) {
                var mdf = model.StartDate;
                var mdt = model.EndDate;
                for (var i = 0; i < items.length; i++) {
                    var item = new Date(items[i].dateCreated);
                    console.log(item);
                    if (item) {
                        if (mdf && mdt) {
                            if (mdf <= item && mdt >= item) {
                                result.push(items[i]);
                            }
                        }
                        else if (mdf) {
                            if (mdf <= item) {
                                result.push(items[i]);
                            }
                        }
                        else if (mdt) {
                            if (mdt >= item) {
                                result.push(items[i])
                            }
                        }
                        else {}
                    }
                }
                return result;
            }
        }
        return items;
    }
});
app.filter('mydate', function () {
    return function (items, model) {
        var parseDate = function (d) {
            var parts = d.split('/');
            return new Date(parts[2], parts[0] - 1, parts[1])
        }
        var mdf = '';
        var mdt = '';
        var result = [];
        if (items.length > 0) {
            if (Object.keys(model).length && model.StartDate || model.EndDate) {
                mdf = model.StartDate;
                mdt = model.EndDate;
                for (var i = 0; i < items.length; i++) {
                    if (mdf && mdt && items[i].StartDate && items[i].EndDate) {
                        if (mdf <= parseDate(items[i].StartDate) && mdt >= parseDate(items[i].EndDate)) {
                            result.push(items[i]);
                        }
                    }
                    else if (mdf && items[i].StartDate) {
                        if (mdf <= parseDate(items[i].StartDate)) {
                            result.push(items[i]);
                        }
                    }
                    else if (mdt && items[i].EndDate) {
                        if (mdt >= parseDate(items[i].EndDate)) {
                            result.push(items[i]);
                        }
                    }
                    else {}
                }
                return result;
            }
        }
        return items;
    }
});
app.filter('myfilter', function () {
    return function (items, model) {
        var result = [];
        if (items.length > 0) {
            if (Object.keys(model).length) {
                var b = 0;
                for (var a = 0; a < Object.keys(model).length; a++) {
                    if (model[Object.keys(model)[a]]) {
                        b++;
                    }
                }
                if (b) {
                    var keys = Object.keys(model);
                    var newItems = [];
                    for(var j = 0; j < keys.length; j++) {
                        if (model[keys[j]]){
                            for (var i = 0; i < items.length; i++){
                                if(items[i][keys[j]]){
                                    var x = items[i][keys[j]].toLowerCase().indexOf(model[keys[j]].toLowerCase());
                                    if (x != -1){
                                        newItems.push(items[i]);
                                    }
                                }
                            }
                            items = newItems;
                            newItems = [];
                        }
                    }
                    return items;
                }
            }
        }
        return items;
    }
});


app.directive('usSpinner', ['$http', '$rootScope', function ($http, $rootScope) {
    return {
        link: function (scope, elm, attrs) {
            $rootScope.spinnerActive = false;
            scope.isLoading = function () {
                if (angular.isDefined(attrs.iframe)) {
                    $rootScope.spinnerActive = true;
                    var iframe = elm.next();
                    iframe.on('load', function () {
                        elm.addClass('ng-hide');
                    })
                }
                else {
                    $rootScope.spinnerActive = $http.pendingRequests.length > 0;
                }
                return $rootScope.spinnerActive;
            };
            scope.$watch(scope.isLoading, function () {
                if ($rootScope.spinnerActive) {
                    elm.removeClass('ng-hide');
                }
                else {
                    elm.addClass('ng-hide');
                }
            });
        }
    };
            }]);
app.controller('LoadError', ['$uibModalInstance', 'message', '$scope', function ($uibModalInstance, message, $scope) {
    $scope.message = message;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}]);
app.controller('Sucess', ['$uibModalInstance', 'message', '$scope', function ($uibModalInstance, message, $scope) {
    $scope.message = message;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}]);
app.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
        chartColors: ['#568E30', '#ffff00', '#d40a1c'], // responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
        //showLines: false
    });
  }])
