/*app.controller('headerController', ['$scope', function($scope){
    var str = 'ZW1haWxfcHJhdmVlbkBnbWFpbC5jb206ZGlzcGxheU5hbWVfSm9obiBTdWplZXQ6ZGVzaWduYXRpb25fU2VuaW9yIFJlY3VyaXRlcjprZklkX1NVSklULUFERU5UOmxvb3BpZF9TVTEyNDU2RE86cm9sZV9VSSBERVZlbG9wZXI6YWNjZXNzdG9rZW5fMjE3ZWRkMzEtZGNkYi00NDhkLWJmZDQtYmMzODQxMzliYmMw';

    $scope.values = atob(str).split(':');
    $scope.name = $scope.values[1].split('_')[1];
    $scope.designation = $scope.values[2].split('_')[1];    
}]);*/


app.controller('headerController', ['$scope','$cookies', 'Factory', 'sharedProperties', function($scope, $cookies, Factory, sharedProperties){
    var str = $cookies.get('RD-Access-Token');
if (str!==undefined){
    $scope.values = atob(str).split(':');
    $scope.name = $scope.values[1].split('_')[1];
    $scope.designation = $scope.values[2].split('_')[1];    
    }
    
    
    var promise = Factory.getIframeList();
        promise.then(function(response) {
            var data = response.data.url;                
            sharedProperties.setIframeLinks(data);            
        })

}]);

