app.controller('requisitionGoalController', ['$scope','Factory',  function ($scope, Factory) {
  var labels=[];
  var datas = [];
   requisitonGoalStackBarChart();
    function requisitonGoalStackBarChart() {
        var promise = Factory.getRequestionGoalStackChart();
        promise.then(
          function resolved(response) {

              $scope.reqGoalStackBarData = response.data.requisitionStatusList;

              if($scope.reqGoalStackBarData){
               $scope.series = $scope.reqGoalStackBarData[0].months;
                for(var i in $scope.reqGoalStackBarData)
                  {
                        labels.push($scope.reqGoalStackBarData[i].label);
                        //datas.push([])
                       for(var j = 0; j < Object.keys($scope.reqGoalStackBarData[0].data).length; j++) {
    datas[j] = datas[j] || new Array();
  //  console.log('datas[' + j + '][' + i + ']' + ' = ' +$scope.reqGoalStackBarData[i].data[Object.keys($scope.reqGoalStackBarData[i].data)[j]])
    datas[j][i] = $scope.reqGoalStackBarData[i].data[Object.keys($scope.reqGoalStackBarData[i].data)[j]];
  }            

                         }
                }



             // globalDetails.userTypeID = response.data.userTypeId;
             // globalDetails.userId = response.data.userid;
             // globalDetails.userType = response.data.userType
          },
          function rejected(response) {
              alert(response.status + ': ' + response.statusText);
          }
      )
    };
   

   // $scope.labels = ['Source', 'Screen', 'Submit', 'Interview', 'Offer', 'Accept'];
    $scope.labels = labels;
    $scope.type = 'StackedBar';
   
    $scope.options = {
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
    };
    $scope.data = datas
    console.log($scope.data)
   /* $scope.data = [
      [65, 59, 90, 81, 56, 55],
      [28, 48, 40, 19, 96, 27],
      [34, 48, 46, 79, 76, 37]
    ];*/
  }]);
