app.controller('requisitionGoalController', ['$scope','Factory','sharedProperties','$location', 'commonFunctions', '$timeout', function ($scope, Factory,sharedProperties,$location, commonFunctions, $timeout) {
  var labels=[];
  var datas = [];
  var deeplinkURL = '';
  var graphName = 'RequisitionGoal';//'CandidatePipeline';

   requisitonGoalStackBarChart();
    function requisitonGoalStackBarChart() {
        var promise = Factory.getRequestionGoalStackChart(graphName);
        promise.then(
          function resolved(response) {
              deeplinkURL = response.data.graphDetails.deepLinkURI;
              sharedProperties.setReportURL(deeplinkURL)
               datas.push(JSON.parse("[" +response.data.graphDetails.data.Okay+ "]"));
              datas.push(JSON.parse("[" +response.data.graphDetails.data["Nearly Due"] + "]"));
              datas.push(JSON.parse("[" +response.data.graphDetails.data.Overdue+ "]"));
                $scope.series = response.data.graphDetails.series
                $scope.labels = response.data.graphDetails.lables;
              $scope.data = datas
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
  //  $scope.data = datas
 //  console.log("karthik"+$scope.data)
               /*
			 arr=[];var array=[];label=[]
              for (var k in Object.keys(response.data.graphDetails.data))
              {for(var j in Object.keys(response.data.graphDetails.data[Object.keys(response.data.graphDetails.data)[k]])){
                   array.push(response.data.graphDetails[Object.keys(response.data.graphDetails.data)[k]][Object.keys(response.data.graphDetails.data[Object.keys(response.data.graphDetails.data)[k]])[j]])
				  }arr.push( {"label":(Object.keys(response.data.graphDetails.data)[k]),"data":array, "months":Object.keys(response.data.graphDetails.data[Object.keys(response.data.graphDetails.data)[k]])});array=[]

                  console.log(arr)
}
             // $scope.reqGoalStackBarData = response.data.requisitionStatusList;

              if(arr){
               $scope.series = arr[0].months;
                for(var i in arr)
                  {
                        labels.push(arr[i].label);
                        //datas.push([])
                       for(var j = 0; j < Object.keys(arr[0].data).length; j++) {
    datas[j] = datas[j] || new Array();
  //  console.log('datas[' + j + '][' + i + ']' + ' = ' +arr[i].data[Object.keys(arr[i].data)[j]])
    datas[j][i] = arr[i].data[Object.keys(arr[i].data)[j]];
  }            

                         }
                }
*/



             // globalDetails.userTypeID = response.data.userTypeId;
             // globalDetails.userId = response.data.userid;
             // globalDetails.userType = response.data.userType
          },
          function rejected(response) {
              commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
          }
      )
    };
  $scope.onClick = function (points, evt) {
    console.log('hello'+deeplinkURL); // 0 -> Series A, 1 -> Series B
        $("li[class='active']").removeClass('active');
        $('#ReportHeader').addClass('active');
       $location.path( '/Reports' );

  };

   // $scope.labels = ['Source', 'Screen', 'Submit', 'Interview', 'Offer', 'Accept'];
   

   /* $scope.kick = [
      [65, 59, 90, 81, 56, 55],
      [28, 48, 40, 19, 96, 27],
      [34, 48, 46, 79, 76, 37]
    ];
    console.log($scope.kick)*/

    $timeout(function () {
        $('#requisitionGoalList').selectpicker();
        console.log($('.selectpicker'))
        }, 50, false);
  }]);
