// create the module and name it desktopApp
var app = angular.module('desktopApp', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ngTouch', 'ngAnimate', 'chart.js', 'ui.bootstrap', 'smart-table', 'easypiechart', 'ya.pdf', 'rzModule', 'angularSpinner']);
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
            , controller: "requisitionCandidateListController"
        }).when("/Search", {
            templateUrl: "views/Search.html"
        }).when("/NewSearch", {
            templateUrl: "views/NewSearch.html"
        }).when("/News", {
            templateUrl: "views/News.html"
        }).when("/Reports", {
            templateUrl: "views/Reports.html"
        }).when("/Resources", {
            templateUrl: "views/Resources.html"
        })
        // else 404
        .otherwise("/404", {
            templateUrl: "views/404.html"
        });
}]);
app.run(function($http, sharedProperties, $cookies) {
	  var count = sharedProperties.getCounter();
	  if(count==0){
		
		var authToken = $cookies.get('RD-Access-Token');
        var authToken = "cmRBdXRoVG9rZW46TUdNMll6ZzFZek10T1RreVlTMDBOak5sTFdKaU5XUXRORGc0T0RZMk5UYzRNVEV5T25Wa1lYbHVRRzF2WW1GamF5NWpiMjA9LGVtYWlsOnVkYXluQG1vYmFjay5jb20sZGVzaWduYXRpb246VlAsaWRwVXNlcklkOmE0ZDYzY2E3LThjZjktNDFjYi1hYmI1LWQ0YjIwYmZlOTFlMyxhcnlhVXNlcklkOlJhamVuZHJhbnN1ZGhha2FyUkBoZXhhd2FyZS5jb20sYXJ5YVBhc3N3b3JkOldlbGNvbWVAMTIzLGFjdGl2YXRlVXNlcklkOnVkYXluQG1vYmFjay5jb20sYWN0aXZhdGVQYXNzd29yZDpBc2RmMTIzNCEsbmFtZTpVZGF5LGZpcnN0TmFtZTpVZGF5LGxhc3ROYW1lOk5heWFrLGRpc3BsYXlOYW1lOlVkYXlO"
        
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
