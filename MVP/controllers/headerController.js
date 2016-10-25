// app.controller('headerController', ['$scope','sharedProperties', function($scope, sharedProperties){
    // var authToken = 'ZW1haWw6cHJhdmVlbkBnbWFpbC5jb20sZGVzaWduYXRpb246UmVjdXJpdGVyLGlkcFVzZXJJZDpQcmF2ZWVuSURQLGFyeWFVc2VySWQ6dXNlcklEYXJ5YSxhcnlhUGFzc3dvcmQ6YXJ5YVBXRCxhY3RpdmF0ZVVzZXJJZDphY3RpdmF0ZVVzZXJJRCxhY3RpdmF0ZVBhc3N3b3JkOmFjdGl2YXRlUHdkLG5hbWU6UHJhdmVlbixmaXJzdE5hbWU6UHJhdmVlRmlyc3ROYW1lLGxhc3ROYW1lOnByYXZlZW5MYXN0TmFtZSxkaXNwbGF5TmFtZTpQcmF2ZWVuRGlzcGxheU5hbWUs';
	// sharedProperties.setAuthGlobalToken(authToken)
    // $scope.values = atob(authToken).split(',');
    // $scope.name = $scope.values[10].split(':')[1];
    // $scope.designation = $scope.values[1].split(':')[1];   
	
// }]);


app.controller('headerController', ['$scope','$cookies', 'Factory', 'sharedProperties', function($scope, $cookies, Factory, sharedProperties){
    var authToken = $cookies.get('RD-Access-Token');
   // var authToken = "ZW1haWw6U2VldGhhaWFoTUBoZXhhd2FyZS5jb20sZGVzaWduYXRpb246bnVsbCxpZHBVc2VySWQ6NTYxN2RmMjAtYTg2NS00Yjk3LWFjODAtYmNiZTllZDA2NDQwLGFyeWFVc2VySWQ6bnVsbCxhcnlhUGFzc3dvcmQ6bnVsbCxhY3RpdmF0ZVVzZXJJZDpudWxsLGFjdGl2YXRlUGFzc3dvcmQ6bnVsbCxuYW1lOm51bGwsZmlyc3ROYW1lOm51bGwsbGFzdE5hbWU6bnVsbCxkaXNwbGF5TmFtZTpudWxsLA=="
if (authToken!==undefined){
   $scope.values = atob(authToken).split(',');
    $scope.name = $scope.values[10].split(':')[1];
    $scope.designation = $scope.values[1].split(':')[1];  
    }
    
    
    var promise = Factory.getIframeList();
        promise.then(function(response) {
            var data = response.data.url;                
            sharedProperties.setIframeLinks(data);            
        })

}]);

