

app.controller('candidatePipelineController', ['$scope','Factory', function ($scope, Factory) {

 candidatePipelineDonutChart();
    function candidatePipelineDonutChart() {
        var promise = Factory.getcandidatePipelineData();
        promise.then(
          function resolved(response) {

              $scope.candidatePipelineData = response.data.candidateList;
             // globalDetails.userTypeID = response.data.userTypeId;
             // globalDetails.userId = response.data.userid;
             // globalDetails.userType = response.data.userType
          },
          function rejected(response) {
              alert(response.status + ': ' + response.statusText);
          }
      )
    };



		  
        }
    ]);