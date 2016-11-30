app.directive('bsActiveLink', ['$location', function ($location) {
    return {
        restrict: 'A', //use as attribute
        replace: false
        , link: function (scope, elem) {
            //after the route has changed
            scope.$on("$routeChangeSuccess", function () {
                var selectors = ['li > [href="/#' + $location.path() + '"]'
                    , 'li > [href="#' + $location.path() + '"]', //html5: false
                'li > [href="' + $location.path() + '"]']; //html5: true
                $(elem).find(selectors.join(',')) //find the matching link
                    .parent('li').addClass('active') //add active class to the matching element
                    .siblings('li').removeClass('active'); //remove it from the sibling elements
            });
        }
    }
}]);
/*
$scope.options = {legend: {display: true}};
    var resetHeight = function() {
        var height = document.getElementById('Height').offsetHeight;
       $('#ChgHeight').css("height", height);
    }
    $timeout(resetHeight, 300);
  }]);*/
// Custom Popover
//customDirectives = angular.module('customDirectives', []);
app.directive('customPopover', function () {
    return {
        restrict: 'A'
        , template: '<span>{{label}}</span>'
        , link: function (scope, el, attrs) {
            scope.label = attrs.popoverLabel;
            $(el).popover({
                trigger: 'click'
                , html: true
                , content: attrs.popoverHtml
                , placement: attrs.popoverPlacement
            });
        }
    };
});
app.controller('PopupDemoCont', ['$scope', '$uibModal', function ($scope, $uibModal) {
    $scope.open = function () {
        var modalInstance = $uibModal.open({
            controller: 'PopupCont'
            , templateUrl: 'partial/_PopupHelp.html'
        , });
    }
}]);
app.controller('PopupCont', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };
        }]);
