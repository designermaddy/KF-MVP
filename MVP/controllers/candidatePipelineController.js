app.controller('candidatePipelineController', ['$scope','Factory','commonFunctions','$timeout', function ($scope, Factory, commonFunctions, $timeout) {

    var graphName = "CandidatePipeline";

 candidatePipelineDonutChart();

    function candidatePipelineDonutChart() {
        var promise = Factory.getcandidatePipelineData(graphName);
        var label = [];
        var data = [];
        var datainsert=[]
        promise.then(
          function resolved(response) {

              // = response.data.candidateList;
               $scope.candidatePipelineData=[];
              for (var k in Object.keys(response.data.graphDetails.data))
              {

                      label.push((Object.keys(response.data.graphDetails.data)[k]))
                        data.push(response.data.graphDetails.data[Object.keys(response.data.graphDetails.data)[k]])
                         //datainsert.push[data[k]]
                  $scope.candidatePipelineData.push( {"label":label,"data":data});


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
