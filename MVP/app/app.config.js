// create the module and name it desktopApp
var app = angular.module('desktopApp', [ 'ngRoute', 'ngAnimate', 'ngTouch', 'ngAnimate', 'chart.js', 'ui.bootstrap', 'smart-table', 'easypiechart']);
// Configure the Routes
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "pages/home.html", controller: 'MainCtrl'})
    // Pages
  .when("/Talentexpress", {templateUrl: "pages/Talentexpress.html", controller: 'MainCtrl'})
  .when("/Engagements", {templateUrl: "pages/Engagements.html", controller: "engagementsController"})
  .when("/Requisitions", {templateUrl: "pages/Requisitions.html", controller: "requisitionsController"})
  .when("/Search", {templateUrl: "pages/Search.html", controller: "searchController"})
  .when("/News", {templateUrl: "pages/News.html", controller: "newsController"})
  .when("/Reports", {templateUrl: "pages/Reports.html", controller: "reportsController"})
  .when("/Resources", {templateUrl: "pages/Resources.html", controller: "resourcesController"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "mainController"});
}]);


app.controller('MainCtrl', function ($scope) {

});
app.directive('bsActiveLink', ['$location', function ($location) {
    return {
        restrict: 'A', //use as attribute
        replace: false,
        link: function (scope, elem) {
            //after the route has changed
            scope.$on("$routeChangeSuccess", function () {
                var hrefs = ['/#' + $location.path(),
                             '#' + $location.path(), //html5: false
                             $location.path()]; //html5: true
							   console.log(hrefs)
                angular.forEach(elem.find('a'), function (a) {
                    a = angular.element(a);
                    if (-1 !== hrefs.indexOf(a.attr('href'))) {
                        a.parent().addClass('active');
                    } else {
                        a.parent().removeClass('active');
                    };
                });
            });
        }
    }
}]);

// Configure the Routes
/*app.config(['$routeProvider', function ($routeProvider) {
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
}]);*/

