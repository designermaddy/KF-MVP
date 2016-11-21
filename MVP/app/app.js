// create the module and name it desktopApp
var app = angular.module('desktopApp', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ngTouch', 'ngAnimate', 'chart.js', 'ui.bootstrap', 'smart-table', 'easypiechart', 'ya.pdf', 'rzModule', 'angularSpinner', 'tag-input', 'angularTrix']);
// Configure the Routes
app.config(['$routeProvider', function ($routeProvider) {
	//$httpProvider.interceptors.push(interceptor);
	
    $routeProvider
    // Home
        .when("/", {
            templateUrl: "views/home.html"
            , controller: 'MainCtrl'
        })
        // Views
        .when("/ProfileDesign", {
            templateUrl: "views/ProfileDesign.html"
        }).when("/Engagements", {
            templateUrl: "views/Engagements.html"
        }).when("/EngagementDetails/:tab", {
            templateUrl: "views/EngagementDetails.html"
        }).when("/Requisitions", {
            templateUrl: "views/Requisitions.html"
        }).when("/RequisitionDetails/:tab", {
            templateUrl: "views/RequisitionDetails.html"
        }).when("/Search", {
            templateUrl: "views/Search.html"
        }).when("/InitiateSearch", {
            templateUrl: "views/InitiateSearch.html"
        }).when("/NewSearch", {
            templateUrl: "views/NewSearch.html"
        }).when("/ViewSearch", {
            templateUrl: "views/ViewSearch.html"
        }).when("/News", {
            templateUrl: "views/News.html"
        }).when("/Reports", {
            templateUrl: "views/Reports.html"
        }).when("/Resources", {
            templateUrl: "views/Resources.html"
        }).when("/LogOut",{
            templateUrl: "partial/_Logout.html"
        })
        // else 404
        .otherwise("/404", {
            templateUrl: "views/404.html"
        });
}]);
app.run(function($http, sharedProperties, $cookies, config) {
	  var count = sharedProperties.getCounter();
	  if(count==0){
		
		var authToken = $cookies.get('RD-Access-Token');
        if (config.production === 0) {
        var authToken = "cmRBdXRoVG9rZW46TXpFM01EQXhNbUV0Tkdaak1TMDBOMlEzTFRsaVptVXROamcwTUdVeU5tVXdaakpqT25Wa1lYbHVRRzF2WW1GamF5NWpiMjA9LGVtYWlsOnVkYXluQG1vYmFjay5jb20sZGVzaWduYXRpb246Q1RPLGlkcFVzZXJJZDphNGQ2M2NhNy04Y2Y5LTQxY2ItYWJiNS1kNGIyMGJmZTkxZTMsYXJ5YVVzZXJJZDp1ZGF5YW5AbW9iYWNrLmNvbSxhcnlhUGFzc3dvcmQ6V2VsY29tZUAxMjMsYWN0aXZhdGVVc2VySWQ6ZXJpYy5qb2huc29uQGZtY2cuY29tLGFjdGl2YXRlUGFzc3dvcmQ6aGF5LG5hbWU6VWRheSxmaXJzdE5hbWU6VWRheSxsYXN0TmFtZTpOYXlhayxkaXNwbGF5TmFtZTpVZGF5Tg=="
        }
        
		if(authToken){
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

app.directive('usSpinner',   ['$http', '$rootScope' ,function ($http, $rootScope){
        return {
            link: function (scope, elm, attrs)
            {
                $rootScope.spinnerActive = false;
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (loading)
                {
                    $rootScope.spinnerActive = loading;
                    if(loading){
                        elm.removeClass('ng-hide');
                    }else{
                        elm.addClass('ng-hide');
                    }
                });
            }
        };

    }]);


app.controller('LoadError', ['$uibModalInstance', 'message', '$scope', function($uibModalInstance, message, $scope) {
    $scope.message = message;
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
}]);
