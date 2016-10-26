app.controller('requisitionSearchController', ['$scope', 'Factory', 'sharedProperties', function($scope, Factory, sharedProperties) {
    $scope.eng = '';
    $scope.cli = '';
    $scope.name = '';
    $scope.data = [];


    var promise = Factory.getAgingRequisitionList();

    promise.then(function(response){
            var result = $scope.data = response.data.requisitionList;
            $scope.requisition = result.map(function(item){
                return item.poolId + ' ' + item.requisitionTitle;
            });
            $scope.engagement = result.map(function(item){
                return item.engagementName;
            });
            $scope.client = result.map(function(item){
                return item.client;
            });
            $scope.recruiter = result.map(function(item) {
                //return item.Recruiter;
            })
        });


     $scope.searchlist = function() {
       var name = $scope.name;
       var requisition = name.replace(/[0-9]/g, '').trim();
       var requisitionNumber = name.replace(/\D/g,'').trim();
       var client = $scope.cli.trim();
       var engagement = $scope.eng.trim();


    var requisitionNumberArray = [];
    var newArray = $scope.data;

    if (requisitionNumber) {
        angular.forEach(newArray, function (input) {
        if (input.poolId == requisitionNumber )
            requisitionNumberArray.push(input);
       });
        newArray = requisitionNumberArray;
    }

    var requisitionArray = [];
    if (requisition) {
        angular.forEach(newArray, function (input) {
        if (input.requisitionTitle == requisition )
            requisitionArray.push(input);
       });
        newArray = requisitionArray;
    }

    var engagementArray = [];
    if (engagement) {
        angular.forEach(newArray, function (input) {
        if (input.engagementName == engagement )
            engagementArray.push(input);
       });
        newArray = engagementArray;
    }

    var clientArray = [];
    if (client) {
        angular.forEach(newArray, function (input) {
        if (input.client == client )
            clientArray.push(input);
       });
        newArray = clientArray;
    }



    if(newArray.length == 0) {
        alert('Result not found');
        sharedProperties.setRequisitionTable($scope.data);
    }else {
        sharedProperties.setRequisitionTable(newArray);
    }
    }


}]);
