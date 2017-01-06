// app.controller('headerController', ['$scope','sharedProperties', function($scope, sharedProperties){
    // var authToken = 'ZW1haWw6cHJhdmVlbkBnbWFpbC5jb20sZGVzaWduYXRpb246UmVjdXJpdGVyLGlkcFVzZXJJZDpQcmF2ZWVuSURQLGFyeWFVc2VySWQ6dXNlcklEYXJ5YSxhcnlhUGFzc3dvcmQ6YXJ5YVBXRCxhY3RpdmF0ZVVzZXJJZDphY3RpdmF0ZVVzZXJJRCxhY3RpdmF0ZVBhc3N3b3JkOmFjdGl2YXRlUHdkLG5hbWU6UHJhdmVlbixmaXJzdE5hbWU6UHJhdmVlRmlyc3ROYW1lLGxhc3ROYW1lOnByYXZlZW5MYXN0TmFtZSxkaXNwbGF5TmFtZTpQcmF2ZWVuRGlzcGxheU5hbWUs';
	// sharedProperties.setAuthGlobalToken(authToken)
    // $scope.values = atob(authToken).split(',');
    // $scope.name = $scope.values[10].split(':')[1];
    // $scope.designation = $scope.values[1].split(':')[1];

// }]);


app.controller('headerController', ['$scope','$http','$cookies', 'Factory', 'sharedProperties','$window','$cookies','commonFunctions','config', 'Idle', 'Keepalive','$uibModal', function($scope,$http, $cookies, Factory, sharedProperties,$window,$cookies,commonFunctions,config, Idle, Keepalive, $uibModal){
   var authToken = $cookies.get('RD-Access-Token');
   if (config.production < 9) {
        var authToken = config.token;
   }
if (authToken!==undefined){
   $scope.values = atob(authToken).split(',');
    $scope.name = $scope.values[9].split(':')[1]+" "+ $scope.values[10].split(':')[1];
    $scope.designation = $scope.values[2].split(':')[1];
    $scope.email = $scope.values[1].split(':')[1];

    sharedProperties.setUserName($scope.values[4].split(':')[1])
    sharedProperties.setPassword($scope.values[5].split(':')[1])
    sharedProperties.setActiveUserName($scope.values[6].split(':')[1])
    sharedProperties.setActivePassword($scope.values[7].split(':')[1])
    sharedProperties.setEmailID( $scope.email)
    sharedProperties.setEmail($scope.name);
     if (($http.defaults.headers.common['RD-Access-Token'])) {
                   var d = new Date();
                setcookie('RD-Access-Token',$http.defaults.headers.common['RD-Access-Token'], d.getTime() + 2*7*24*60*60 , '/');
               // setcookie('SSO-User-Id',$scope.values[2].split(':')[1], d.getTime() + 2*7*24*60*60 , '/');
               // header("Location: /");
                //exit();
               }else{
               die("Authentication Failed!!");
            }
    }else{

            window.location.href = config.loginUrl;

    }
    function setcookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

        commonFunctions.getGraphDropdown();
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

/*---------------REFRESH ACCESS TOKEN STARTS---------------------*/
 var a = window.localStorage.getItem('a');
 var tokenExpires = 900; // 15 min
 if (a === null) {
   getAccessToken();
 }else {
   checkIfAccessTokenExpired();
 }


function checkIfAccessTokenExpired(){
  var b = new Date().getTime();
  a = window.localStorage.getItem('a');
  var secDiff = b - a; //in ms
  //var minDiff = secDiff / 60 / 1000; //in minutes
  if (secDiff > tokenExpires*1000) {
    console.log("Time crossed>>..., Get the new token");
    getAccessToken();
  }else{
     setTimeout( checkIfAccessTokenExpired, 2000 );
  }
}

function getAccessToken() {
    console.log("Refreshing Access Token>>> ");

     var apiHandshakeUrl = "https://naapi.se.kornferry.com/v1/my/session/handshake";
     var handshakeToken  = $cookies.get('handshakeToken');

      $http.get(apiHandshakeUrl, {
          withCredentials: true,
          useXDomain : true,
          headers: {
              "Authorization": 'Basic '+handshakeToken
          }
        }).success(function(response){
          console.log(response);
          var d = new Date();
          setcookie('accessToken',response.accessToken, d.getTime() + 2*7*24*60*60 , '/');
          window.localStorage.setItem('a', d.getTime());
          console.log("Got New Token>>> Updated new accessToken >> ");
          checkIfAccessTokenExpired();

        });

  }
/*---------------REFRESH ACCESS TOKEN ENDS---------------------*/

    function closeModals() {
        if ($scope.warning) {
          $scope.warning.close();
          $scope.warning = null;
        }

        if ($scope.timedout) {
          $scope.timedout.close();
          $scope.timedout = null;
        }
      }

      $scope.$on('IdleStart', function() {
        closeModals();

        $scope.warning = $uibModal.open({
          templateUrl: 'warning-dialog.html',
          windowClass: 'modal-danger'
        });
      });

      $scope.$on('IdleEnd', function() {
        closeModals();
      });

      $scope.$on('IdleTimeout', function() {
        closeModals();
          // window.location.href = config.logOutUrl+"/Shibboleth.sso/Logout"
         // $scope.logOut();
       /* $scope.timedout = $uibModal.open({
          templateUrl: 'timedout-dialog.html',
          windowClass: 'modal-danger'
        });*/
      });

 /*$window.onbeforeunload = function (evt) {
    //$scope.logOut();
  }
 */
}]);

