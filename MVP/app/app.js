// create the module and name it desktopApp
var app = angular.module('desktopApp', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ngTouch', 'ngAnimate', 'chart.js', 'ui.bootstrap', 'smart-table', 'easypiechart', 'ya.pdf']);
// Configure the Routes
app.config(['$routeProvider', function ($routeProvider) {
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
app.filter('profileSelect', function () {
    return function (inputs, selectValue) {
        var output = [];
        if (selectValue == 'All') {
            return inputs;
        }
        angular.forEach(inputs, function (input) {
            if (input.Function == selectValue) output.push(input);
        });
        return output;
    };
});