app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    var home = {
        name: 'home'
        , url: '/'
        , templateUrl: 'views/home.html'
        , ncyBreadcrumb: {
            label: 'Home'
        }
    }
    var profile = {
        name: 'profile'
        , url: '/ProfileDesign'
        , templateUrl: 'views/ProfileDesign.html'
        , ncyBreadcrumb: {
            label: 'Profile'
        }
    }
    var engagements = {
        name: 'engagements'
        , url: '/Engagements'
        , templateUrl: 'views/Engagements.html'
        , ncyBreadcrumb: {
            label: 'Engagements'
        }
    }
    var engagementDetails = {
        name: 'engagementDetails'
        , url: '/EngagementDetails/{tab}'
        , templateUrl: 'views/EngagementDetails.html'
        , ncyBreadcrumb: {
            label: 'Engagement Details'
            , parent: 'engagements'
        }
    }
    var requisitions = {
        name: 'requisitions'
        , url: '/Requisitions'
        , templateUrl: 'views/Requisitions.html'
        , ncyBreadcrumb: {
            label: 'Requisitions'
        }
    }
    var requisitionDetials = {
        name: 'requisitionDetails'
        , url: '/RequisitionDetails/{tab}'
        , templateUrl: 'views/RequisitionDetails.html'
        , ncyBreadcrumb: {
            label: 'Requisition Details'
            , parent: 'requisitions'
        }
    }
    var search = {
        name: 'search'
        , url: '/Search'
        , templateUrl: 'views/Search.html'
        , ncyBreadcrumb: {
            label: 'Search'
        }
    }
    var initiateSearch = {
        name: 'initiateSearch'
        , url: '/InitiateSearch'
        , templateUrl: 'views/InitiateSearch.html'
        , ncyBreadcrumb: {
            label: 'Initiate Search'
            , parent: 'requisitions'
        }
    }
    var newSearch = {
        name: 'newSearch'
        , url: '/NewSearch'
        , templateUrl: 'views/NewSearch.html'
        , ncyBreadcrumb: {
            label: 'New Search'
            , parent: 'search'
        }
    }
    var viewSearch = {
        name: 'viewSearch'
        , url: '/ViewSearch'
        , templateUrl: 'views/ViewSearch.html'
        , ncyBreadcrumb: {
            label: 'View Search'
            , parent: 'search'
        }
    }
    var news = {
        name: 'news'
        , url: '/News'
        , templateUrl: 'views/News.html'
        , ncyBreadcrumb: {
            label: 'News & Insights'
        }
    }
    var reports = {
        name: 'reports'
        , url: '/Reports'
        , templateUrl: 'views/Reports.html'
        , ncyBreadcrumb: {
            label: 'Reports'
        }
    }
    var resources = {
        name: 'resources'
        , url: '/Resources'
        , templateUrl: 'views/Resources.html'
        , ncyBreadcrumb: {
            label: 'Home'
        }
    }
    var logout = {
        name: 'logout'
        , url: '/LogOut'
        , templateUrl: 'views/LogOut.html'
    }
    var error = {
        name: '404'
        , url: '/404'
        , templateUrl: 'views/404.html'
    }
    var ie = {
        name: 'ie'
        , url: '/IE'
        , templateUrl: 'views/IE.html'
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
    $stateProvider.state(ie);
}]);
