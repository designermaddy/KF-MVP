// app.controller('headerController', ['$scope','sharedProperties', function($scope, sharedProperties){
    // var authToken = 'ZW1haWw6cHJhdmVlbkBnbWFpbC5jb20sZGVzaWduYXRpb246UmVjdXJpdGVyLGlkcFVzZXJJZDpQcmF2ZWVuSURQLGFyeWFVc2VySWQ6dXNlcklEYXJ5YSxhcnlhUGFzc3dvcmQ6YXJ5YVBXRCxhY3RpdmF0ZVVzZXJJZDphY3RpdmF0ZVVzZXJJRCxhY3RpdmF0ZVBhc3N3b3JkOmFjdGl2YXRlUHdkLG5hbWU6UHJhdmVlbixmaXJzdE5hbWU6UHJhdmVlRmlyc3ROYW1lLGxhc3ROYW1lOnByYXZlZW5MYXN0TmFtZSxkaXNwbGF5TmFtZTpQcmF2ZWVuRGlzcGxheU5hbWUs';
	// sharedProperties.setAuthGlobalToken(authToken)
    // $scope.values = atob(authToken).split(',');
    // $scope.name = $scope.values[10].split(':')[1];
    // $scope.designation = $scope.values[1].split(':')[1];   
	
// }]);


app.controller('headerController', ['$scope','$http','$cookies', 'Factory', 'sharedProperties','$window','$cookies','commonFunctions','config', function($scope,$http, $cookies, Factory, sharedProperties,$window,$cookies,commonFunctions,config){
   var authToken = $cookies.get('RD-Access-Token');
   if (config.production === 0) {
    var authToken = "cmRBdXRoVG9rZW46TXpVME9XWXlaalF0WWpFek5TMDBPR1V4TFRnell6VXRNVGs0WlRZME1qUXdaalpsT25Wa1lYbHVRRzF2WW1GamF5NWpiMjA9LGVtYWlsOnVkYXluQG1vYmFjay5jb20sZGVzaWduYXRpb246Q1RPLGlkcFVzZXJJZDphNGQ2M2NhNy04Y2Y5LTQxY2ItYWJiNS1kNGIyMGJmZTkxZTMsYXJ5YVVzZXJJZDpSYWplbmRyYW5zdWRoYWthclJAaGV4YXdhcmUuY29tLGFyeWFQYXNzd29yZDpXZWxjb21lQDEyMyxhY3RpdmF0ZVVzZXJJZDp1ZGF5bkBtb2JhY2suY29tLGFjdGl2YXRlUGFzc3dvcmQ6QXNkZjEyMzQhLG5hbWU6VWRheSxmaXJzdE5hbWU6VWRheSxsYXN0TmFtZTpOYXlhayxkaXNwbGF5TmFtZTpVZGF5Tg==";
   }
if (authToken!==undefined){
   $scope.values = atob(authToken).split(',');
    $scope.name = $scope.values[9].split(':')[1]+" "+ $scope.values[10].split(':')[1];;
    $scope.designation = $scope.values[2].split(':')[1];
    $scope.email = $scope.values[1].split(':')[1];
    sharedProperties.setUserName($scope.values[4].split(':')[1])
    sharedProperties.setPassword($scope.values[5].split(':')[1])
     if (($http.defaults.headers.common['RD-Access-Token'])) {
                   var d = new Date();
                setcookie('RD-Access-Token',$http.defaults.headers.common['RD-Access-Token'], d.getTime() + 2*7*24*60*60 , '/');
               // setcookie('SSO-User-Id',$scope.values[2].split(':')[1], d.getTime() + 2*7*24*60*60 , '/');
               // header("Location: /");
                //exit();
               }else{
               die("Authentication Failed!!");
            }
    }
    function setcookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
    
    var promise = Factory.getIframeList();
        promise.then(function(response) {
            var data = response.data.url;                
            sharedProperties.setIframeLinks(data);            
        })

        $scope.logOut=function(){
           var promise = Factory.getLogOut();
            promise.then(
              function resolved(response) {
                  if(response.data){
                   console.log(response.data)
                }
              },
              function rejected(response) {
                  commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
              }
            )
            var cookies = $cookies.getAll();
            angular.forEach(cookies, function (v, k) {
                $cookies.remove(k);
            });

            window.location.href = config.logOutUrl+"/Shibboleth.sso/Logout"
        }



 /*$window.onbeforeunload = function (evt) {
    //$scope.logOut();
  }
 */
}]);

