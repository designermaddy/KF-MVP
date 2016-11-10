app.controller('candidatePipelineController', ['$scope','Factory','commonFunctions','$timeout','$location','sharedProperties', function ($scope, Factory, commonFunctions, $timeout,$location,sharedProperties) {

    var graphName = "CandidatePipeline";
    var deeplinkURL = '';
 candidatePipelineDonutChart();

    function candidatePipelineDonutChart() {
        var promise = Factory.getcandidatePipelineData(graphName);
        var label = [];
        var data = [];
        var datainsert=[]
        promise.then(
          function resolved(response) {
               deeplinkURL = response.data.graphDetails.deepLinkURI;
              sharedProperties.setReportURL(deeplinkURL)
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
 $scope.onClick = function (points, evt) {
    console.log('hello'+deeplinkURL); // 0 -> Series A, 1 -> Series B
        $("li[class='active']").removeClass('active');
        $('#ReportHeader').addClass('active');
       $location.path( '/Reports' );

  };
        $timeout(function () {
        $('#candidatePipelineList').selectpicker();

        }, 50, false);

		  
        }

    ]);
