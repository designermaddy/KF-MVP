

app.controller('candidatePipelineController', ['$scope','Factory', function ($scope, Factory) {

 candidatePipelineDonutChart();
    function candidatePipelineDonutChart() {
        var promise = Factory.getcandidatePipelineData();
        promise.then(
          function resolved(response) {

              // = response.data.candidateList;
               $scope.candidatePipelineData=[];
              for (var k in Object.keys(response.data.graphDetails.data))
              {
                  $scope.candidatePipelineData.push( {"label":(Object.keys(response.data.graphDetails.data)[k]),"data":response.data.graphDetails.data[Object.keys(response.data.graphDetails.data)[k]]});

                  console.log($scope.candidatePipelineData)
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

        $timeout(function () {
        $('#candidatePipelineList').selectpicker();
        console.log($('.selectpicker'))
        }, 50, false);

		  
        }
    ]);
