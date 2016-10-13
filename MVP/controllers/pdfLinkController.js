app.controller('pdfLinkController', ['$scope', function($scope) {
    $scope.url = 'pdf/1.pdf';
    $scope.changePdf = function(a) {
        var str = 'pdf/' + a + '.pdf';
        $scope.url = str;
    };
}]);