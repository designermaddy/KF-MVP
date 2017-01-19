// create the module and name it desktopApp
var app = angular.module('desktopApp', ['ui.router', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ngTouch', 'ngAnimate', 'chart.js', 'ui.bootstrap', 'smart-table', 'easypiechart', 'ya.pdf', 'rzModule', 'angularSpinner', 'ncy-angular-breadcrumb','textAngular','angular.filter', 'ngIdle']);
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
        if (items && items.length > 0) {
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
        /*
            Edited by Isaac Jefferson

            Some bug in smart table

            st-table(in html) variable contains a undefined object even when rowCollection variable is zero in length.

            To remove the undefined object. I have done some changes in next 3 lines.
        */
        if(items && items.length>0){
        if(items[0] == undefined){
            items.splice(0,1);
        }
        var addItem = function (key, item) {
            var static = {
                'req': ['ReqNumber', 'JobTitle']
                , 'eng': ['EngagementNumber', 'Engagement']
                , 'canName': ['firstName', 'lastName']
                , 'recruiter': [{
                    'Recruiter': ['firstName', 'lastName']
                }]
            }
            if (static[key]) {
                var a = static[key];
                if (typeof a[0] === 'object') {
                    if (Object.keys(a[0])[0] == 'Recruiter') {
                        if (item['Recruiter'] && item['Recruiter'].length > 0) {
                            item[key] = item['Recruiter'][0]['firstName'] + ' ' + item['Recruiter'][0]['lastName'];
                        }
                    }
                }
                else {
                    item[key] = item[a[0]] + ' ' + item[a[1]];
                }
            }
            return item;
        }
        var result = [];
        if (angular.isDefined(items) && items !== null && items.length > 0) {
            if (model && Object.keys(model).length) {
                var b = 0;
                for (var a = 0; a < Object.keys(model).length; a++) {
                    if (model[Object.keys(model)[a]]) {
                        b++;
                    }
                }
                if (b) {
                    //model = expandModel(model);
                    var keys = Object.keys(model);
                    var newItems = [];
                    for (var j = 0; j < keys.length; j++) {
                        if (model[keys[j]]) {
                            for (var i = 0; i < items.length; i++) {
                                items[i] = addItem(keys[j], items[i]);
                                if (items[i][keys[j]]) {
                                    var x = items[i][keys[j]].toLowerCase().indexOf(model[keys[j]].toLowerCase());
                                    if (x != -1) {
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
    }
});

app.filter('ssopcfilter', function(){
    return function(items, model){
        if (angular.isDefined(items) && items.length > 0){
            var static = ['Open', 'Pending', 'Closed']
            if (model && Object.keys(model).length){
                var b = 0;
                for (var i = 0; i < Object.keys(model).length; i++){
                    if (model[Object.keys(model)[i]]){
                        b++;
                    }
                }
                if (b){
                    var keys = Object.keys(model);
                    var newItems = [];
                    for (var j = 0; j < keys.length; j++){
                        if (model[keys[j]]){
                            for (var k = 0; k < items.length; k++){
                                if (items[k]['Status'] == static[j]) {
                                    newItems.push(items[k])
                                }
                            }
                        }
                    }
                    return newItems;
                }
            }
        }
        return items;
    }
})

app.filter('rtopcfilter', function(){
    return function(items, model){
        if (angular.isDefined(items) && items.length > 0 && angular.isDefined(items[0])){
            var static = ['Open', 'ClosedFilled', 'Closed', 'Onhold'];
            if (model && Object.keys(model).length){
                var b = 0;
                for (var i = 0; i < Object.keys(model).length; i++){
                    if (model[Object.keys(model)[i]]){
                        b++;
                    }
                }
                if (b){
                    var keys = Object.keys(model);
                    var newItems = [];
                    for (var j = 0; j < keys.length; j++){
                        if (model[keys[j]]){
                            for (var k = 0; k < items.length; k++){
                                if (items[k]['status'] == static[j]) {
                                    newItems.push(items[k])
                                }
                            }
                        }
                    }
                    return newItems;
                }
            }
        }
        return items;
    }
})
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

/* resize window dynamic height for dashboard page*/
app.directive('myDirective', ['$window', function ($window) {

     return {
        link: link,
        restrict: 'E',
        template: '<div>window size: {{width}}px</div>'
     };

     function link(scope, element, attrs){

       scope.width = $window.innerWidth;

       angular.element($window).bind('resize', function(){

         scope.width = $window.innerWidth;
          var col1 = document.getElementsByClassName("ContentBox");
          var col2 = document.getElementsByClassName("mh879");



           if(col1[0] && col2[0]){

            col2[0].style.height = (col1[0].offsetHeight)+ 'px';
           }
         // manuall $digest required as resize event
         // is outside of angular
         scope.$digest();
       });

     }

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
/* @Param text
 * @Param length, default is 10
 * @Param end, default is "..."
 * @return string
 */
app.filter('truncate', function () {
    return function (text, length, end) {
        if (isNaN(length)) length = 10;
        if (end === undefined) end = "...";
        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length - end.length) + end;
        }
    };
});
/**
 * Usage
 *
 * var myText = "This is an example.";
 *
 * {{myText|Truncate}}
 * {{myText|Truncate:5}}
 * {{myText|Truncate:25:" ->"}}
 * Output
 * "This is..."
 * "Th..."
 * "This is an e ->"
 *
 */
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

app.run(['Idle', function(Idle) {
  Idle.watch();
}]);
