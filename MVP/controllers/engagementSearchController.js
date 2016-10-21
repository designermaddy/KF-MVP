/*app.controller('engagementSearchController', ['$scope','Factory', 'sharedProperties', '$http', function ($scope, Factory, sharedProperties, $http) {
    var promise = Factory.getEngagementDetailsTableList();
    $scope.ind = '';
    $scope.cli = '';
    $scope.name = '';
    promise.then(function(response){
        result = response.data.engagementList;
        sharedProperties.setrowCollection(result);
        $scope.engagement = result.map(function(item){
            return item.EngagementNumber + '  ' + item.Engagement;
        });
          $scope.client = result.map(function(item){
            return item.Client.ClientName;
        });
        $scope.industry = result.map(function(item){
            return item.Client.Industry;
        });
        $scope.recruiter = result.map(function(item) {
            return item.Recruiter;
        })
    });
    $scope.searchlist = function() {
       var name = $scope.name;
       var eng = name.replace(/[0-9]/g, '').trim();
       var num = name.replace(/\D/g,'').trim();
       var data = {
           'engagementNumber': num,
           'engagement': eng ,
           'client' : $scope.cli.trim(),
           'industry' : $scope.ind.trim(),
           'recruiter' : 'Anna Brown',
       }
       
     $http.post("http://172.25.148.147:8080/RD-WebApp/Requisition/searchRequisitions", data)
        .success(function(data, status, headers, config) {
            $scope.data = data;
            console.log(data);
        }).error(function(data, status, headers, config) {
            $scope.status = status;
            console.log('failed');
        });
    }
    
    
}]);*/

app.controller('engagementSearchController', ['$scope','Factory', 'sharedProperties', '$http', function ($scope, Factory, sharedProperties, $http) {
    var promise = Factory.getEngagementDetailsTableList();
    $scope.ind = '';
    $scope.cli = '';
    $scope.name = '';
    $scope.data = [];
    
    promise.then(function(response){
        $scope.data = result = response.data.engagementList;
        sharedProperties.setrowCollection(result);
        $scope.engagement = result.map(function(item){
            return item.EngagementNumber + '  ' + item.Engagement;
        });
          $scope.client = result.map(function(item){
            return item.Client.ClientName;
        });
        $scope.industry = result.map(function(item){
            return item.Client.Industry;
        });
        $scope.recruiter = result.map(function(item) {
            return item.Recruiter;
        })
    });
    
    $scope.searchlist = function() {
       var name = $scope.name;
       var engagement = name.replace(/[0-9]/g, '').trim();
       var engagementNumber = name.replace(/\D/g,'').trim();
       var client = $scope.cli.trim();
       var industry = $scope.ind.trim();
    
        /*
        var data = {
           'engagementNumber': engagementNumber,
           'engagement': engagement ,
           'client' : $scope.cli.trim(),
           'industry' : $scope.ind.trim(),
           'recruiter' : 'Anna Brown',
       }
       
    
     $http.post("http://172.25.148.147:8080/RD-WebApp/Requisition/searchRequisitions", data)
        .success(function(data, status, headers, config) {
            $scope.data = data;
            console.log(data);
        }).error(function(data, status, headers, config) {
            $scope.status = status;
            console.log('failed');
        });
        */
    
    var engagementNumberArray = [];
    var newArray = $scope.data;
        
    if (engagementNumber) {
        angular.forEach(newArray, function (input) {
        if (input.EngagementNumber == engagementNumber )
            engagementNumberArray.push(input);            
       });
        newArray = engagementNumberArray;
    }
    
    var engagementArray = [];
    if (engagement) {
        angular.forEach(newArray, function (input) {
        if (input.Engagement == engagement )
            engagementArray.push(input);            
       });
        newArray = engagementArray;
    }
    
    var clientArray = [];
    if (client) {
        angular.forEach(newArray, function (input) {
        if (input.Client.ClientName == client )
            clientArray.push(input);            
       });
        newArray = clientArray;
    }
    
    var industryArray = [];
    if (industry) {
        angular.forEach(newArray, function (input) {
        if (input.Client.Industry == industry )
            industryArray.push(input);            
       });
        newArray = industryArray;
    }
    
    if(newArray.length == 0) {
        alert('Result not found');
        sharedProperties.setrowCollection($scope.data);
    }else {
        sharedProperties.setrowCollection(newArray);
    }
    }
    
}]);
