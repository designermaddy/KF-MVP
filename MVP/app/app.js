// create the module and name it desktopApp
var app = angular.module('desktopApp', [ 'ngRoute', 'ngAnimate', 'ngSanitize', 'ngTouch', 'ngAnimate', 'chart.js', 'ui.bootstrap', 'smart-table', 'easypiechart', 'ya.pdf']);
// Configure the Routes
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
// Home
      .when("/", {templateUrl: "views/home.html", controller: 'MainCtrl'})
// Views
      .when("/ProfileDesign", {templateUrl: "views/ProfileDesign.html"})
      .when("/Engagements", {templateUrl: "views/Engagements.html"})
      .when("/EngagementDetails", {templateUrl: "views/EngagementDetails.html"})
      .when("/Requisitions", {templateUrl: "views/Requisitions.html"})
      .when("/RequisitionDetails", {templateUrl: "views/RequisitionDetails.html"})
      .when("/Search", {templateUrl: "views/Search.html"})
      .when("/News", {templateUrl: "views/News.html"})
      .when("/Reports", {templateUrl: "views/Reports.html"})
      .when("/Resources", {templateUrl: "views/Resources.html"})
    // else 404
      .otherwise("/404", {templateUrl: "views/404.html"});
}]);


app.controller('MainCtrl', function ($scope) {
  
});


app.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});
