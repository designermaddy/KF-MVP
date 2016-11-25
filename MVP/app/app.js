// create the module and name it desktopApp
var app = angular.module('desktopApp', ['ui.router', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ngTouch', 'ngAnimate', 'chart.js', 'ui.bootstrap', 'smart-table', 'easypiechart', 'ya.pdf', 'rzModule', 'angularSpinner', 'angularTrix']);

app.run(function ($http, sharedProperties, $cookies, config) {
    var count = sharedProperties.getCounter();
    if (count == 0) {

        var authToken = $cookies.get('RD-Access-Token');
        if (config.production < 9) {
        var authToken = config.token
        }

        if (authToken) {
            $http.defaults.headers.common['RD-Access-Token'] = authToken


        }

        sharedProperties.setCounter(1)
    }


    //sharedProperties.setAuthGlobalToken(authToken)
    //var authToken = "ZW1haWw6U2VldGhhaWFoTUBoZXhhd2FyZS5jb20sZGVzaWduYXRpb246bnVsbCxpZHBVc2VySWQ6NTYxN2RmMjAtYTg2NS00Yjk3LWFjODAtYmNiZTllZDA2NDQwLGFyeWFVc2VySWQ6bnVsbCxhcnlhUGFzc3dvcmQ6bnVsbCxhY3RpdmF0ZVVzZXJJZDpudWxsLGFjdGl2YXRlUGFzc3dvcmQ6bnVsbCxuYW1lOm51bGwsZmlyc3ROYW1lOm51bGwsbGFzdE5hbWU6bnVsbCxkaXNwbGF5TmFtZTpudWxsLA=="

});
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

app.directive('usSpinner', ['$http', '$rootScope', function ($http, $rootScope) {
    return {
        link: function (scope, elm, attrs) {
            $rootScope.spinnerActive = false;
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (loading) {
                $rootScope.spinnerActive = loading;
                if (loading) {
                    elm.removeClass('ng-hide');
                } else {
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
app.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#568E30', '#ffff00', '#d40a1c'],
     // responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      //showLines: false
    });
  }])
