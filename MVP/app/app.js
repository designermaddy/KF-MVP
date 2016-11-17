// create the module and name it desktopApp
var app = angular.module('desktopApp', ['ui.router', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ngTouch', 'ngAnimate', 'chart.js', 'ui.bootstrap', 'smart-table', 'easypiechart', 'ya.pdf', 'rzModule', 'angularSpinner', 'tag-input', 'angularTrix']);

app.run(function ($http, sharedProperties, $cookies, config) {
    var count = sharedProperties.getCounter();
    if (count == 0) {

        var authToken = $cookies.get('RD-Access-Token');
        if (config.production === 0) {
            var authToken = "cmRBdXRoVG9rZW46TXpVME9XWXlaalF0WWpFek5TMDBPR1V4TFRnell6VXRNVGs0WlRZME1qUXdaalpsT25Wa1lYbHVRRzF2WW1GamF5NWpiMjA9LGVtYWlsOnVkYXluQG1vYmFjay5jb20sZGVzaWduYXRpb246Q1RPLGlkcFVzZXJJZDphNGQ2M2NhNy04Y2Y5LTQxY2ItYWJiNS1kNGIyMGJmZTkxZTMsYXJ5YVVzZXJJZDpSYWplbmRyYW5zdWRoYWthclJAaGV4YXdhcmUuY29tLGFyeWFQYXNzd29yZDpXZWxjb21lQDEyMyxhY3RpdmF0ZVVzZXJJZDp1ZGF5bkBtb2JhY2suY29tLGFjdGl2YXRlUGFzc3dvcmQ6QXNkZjEyMzQhLG5hbWU6VWRheSxmaXJzdE5hbWU6VWRheSxsYXN0TmFtZTpOYXlhayxkaXNwbGF5TmFtZTpVZGF5Tg=="
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
