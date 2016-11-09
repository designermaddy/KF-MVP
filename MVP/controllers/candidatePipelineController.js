app.controller('candidatePipelineController', ['$scope','Factory','commonFunctions','$timeout', function ($scope, Factory, commonFunctions, $timeout) {

    var graphName = "CandidatePipeline";

 candidatePipelineDonutChart();

    function candidatePipelineDonutChart() {
        var promise = Factory.getcandidatePipelineData(graphName);
        promise.then(
          function resolved(response) {

              // = response.data.candidateList;
               $scope.candidatePipelineData=[];
              for (var k in Object.keys(response.data.graphDetails.data))
              {
                  if (k < 5)
                  $scope.candidatePipelineData.push( {"label":(Object.keys(response.data.graphDetails.data)[k]),"data":response.data.graphDetails.data[Object.keys(response.data.graphDetails.data)[k]]});

                }
          },
          function rejected(response) {
              commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
          }
      )
    };

        $timeout(function () {
        $('#candidatePipelineList').selectpicker();

        }, 50, false);

		  
        }
    ]);
