app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    var home = {
        name: 'home',
        url: '/',
        templateUrl: 'views/home.html'
    }

    var profile = {
        name: 'profile',
        url: '/ProfileDesign',
        templateUrl: 'views/ProfileDesign.html'
    }

    var engagements = {
        name: 'engagements',
        url: '/Engagements',
        templateUrl: 'views/Engagements.html'
    }

    var engagementDetails = {
        name : 'engagementDetails',
        url:'/EngagementDetails/{tab}',
        templateUrl : 'views/EngagementDetails.html'
    }
    var requisitions = {
        name: 'requisitions',
        url: '/Requisitions',
        templateUrl: 'views/Requisitions.html'
    }

    var requisitionDetials = {
        name : 'requisitionDetails',
        url : '/RequisitionDetails/{tab}',
        templateUrl : 'views/RequisitionDetails.html'
    }

    var search = {
        name: 'search',
        url: '/Search',
        templateUrl: 'views/Search.html'
    }

    var initiateSearch = {
        name: 'initiateSearch',
        url: '/InitiateSearch',
        templateUrl: 'views/InitiateSearch.html'
    }

    var newSearch = {
        name: 'newSearch',
        url: '/NewSearch',
        templateUrl: 'views/NewSearch.html'
    }

    var viewSearch = {
        name: 'viewSearch',
        url: '/ViewSearch',
        templateUrl: 'views/ViewSearch.html'
    }


    var news = {
        name: 'news',
        url: '/News',
        templateUrl: 'views/News.html'
    }

    var reports = {
        name: 'reports',
        url: '/Reports',
        templateUrl: 'views/Reports.html'
    }

    var resources = {
        name: 'resources',
        url: '/Resources',
        templateUrl: 'views/Resources.html'
    }

    var logout = {
        name: 'logout',
        url: '/LogOut',
        templateUrl: 'views/LogOut.html'
    }

    var error = {
        name: '404',
        url: '/404',
        templateUrl: 'views/404.html'
    }

    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/404');

    $stateProvider.state(home);
    $stateProvider.state(profile);
    $stateProvider.state(engagements);
    $stateProvider.state(engagementDetails);
    $stateProvider.state(requisitions);
    $stateProvider.state(requisitionDetials);
    $stateProvider.state(search);
    $stateProvider.state(initiateSearch);
    $stateProvider.state(newSearch);
    $stateProvider.state(viewSearch);
    $stateProvider.state(news);
    $stateProvider.state(reports);
    $stateProvider.state(resources);
    $stateProvider.state(logout);
    $stateProvider.state(error);

}]);
