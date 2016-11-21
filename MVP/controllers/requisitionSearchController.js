app.controller('requisitionSearchController', ['$scope', 'Factory', 'sharedProperties', function($scope, Factory, sharedProperties) {
    $scope.eng = '';
    $scope.cli = '';
    $scope.name = '';
    $scope.data = [];


    var promise = Factory.getRequisitionTableList();

    promise.then(function(response){
            var result = $scope.data = response.data.requisitions;
            $scope.requisition = result.map(function(item){
                return item.ReqNumber + ' ' + item.JobTitle;
            });
            $scope.engagement = result.map(function(item){
                return item.Engagement;
            });
            $scope.client = result.map(function(item){
                return item.Client;
            });
            $scope.recruiter = result.map(function(item) {
                //return item.Recruiter;
            })
        });
 $scope.Status = function(row) {
        var str = '';
        if (row.Ignore == 'false') {
            //str += '<i class="fa fa-circle" aria-hidden="true"></i>';
            str += "";
        }else if (row.Ignore == 'true') {
            str += '<i class="fa fa-ban" aria-hidden="true"></i>';
        }

        if (row.Shortlist == 'true') {
            str += '<i class="fa fa-star" aria-hidden="true"></i>';
        }else if (row.Shortlist == 'false') {
            //str += '<i class="fa fa-star-o" aria-hidden="true"></i>';
            str += "";
        }

        return $sce.trustAsHtml(str);
    }

     $scope.searchlist = function() {
       var name = $scope.name;
       var requisitionNumber = name.substr(0,name.indexOf(' '));
       var requisition = name.substr(name.indexOf(' ')+1);
       //var requisition = name.replace(/[0-9]/g, '').trim();
       //var requisitionNumber = name.replace(/\D/g,'').trim();
       var client = $scope.cli.trim();
       var engagement = $scope.eng.trim();


    var requisitionNumberArray = [];
    var newArray = $scope.data;

    if (requisitionNumber) {
        angular.forEach(newArray, function (input) {
        if (input.ReqNumber == requisitionNumber )
            requisitionNumberArray.push(input);
       });
        newArray = requisitionNumberArray;
    }

    var requisitionArray = [];
    if (requisition) {
        angular.forEach(newArray, function (input) {
        if (input.JobTitle == requisition )
            requisitionArray.push(input);
       });
        newArray = requisitionArray;
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
        if (input.Client == client )
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
