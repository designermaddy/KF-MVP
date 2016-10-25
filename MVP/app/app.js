// create the module and name it desktopApp
var app = angular.module('desktopApp', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ngTouch', 'ngAnimate', 'chart.js', 'ui.bootstrap', 'smart-table', 'easypiechart', 'ya.pdf']);
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
        //var authToken = "ZW1haWw6U2VldGhhaWFoTUBoZXhhd2FyZS5jb20sZGVzaWduYXRpb246bnVsbCxpZHBVc2VySWQ6NTYxN2RmMjAtYTg2NS00Yjk3LWFjODAtYmNiZTllZDA2NDQwLGFyeWFVc2VySWQ6bnVsbCxhcnlhUGFzc3dvcmQ6bnVsbCxhY3RpdmF0ZVVzZXJJZDpudWxsLGFjdGl2YXRlUGFzc3dvcmQ6bnVsbCxuYW1lOm51bGwsZmlyc3ROYW1lOm51bGwsbGFzdE5hbWU6bnVsbCxkaXNwbGF5TmFtZTpudWxsLA=="
        
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
