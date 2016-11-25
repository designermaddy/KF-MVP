app.controller('candidateSourceController', ['$scope','Factory','commonFunctions','$timeout','$location','sharedProperties', function ($scope, Factory, commonFunctions, $timeout,$location,sharedProperties) {

    var graphName = "CandidateSource";
    var deeplinkURL = '';

     $scope.selectedButton = 'company';
  $scope.callmyClientRequisition = function(selectedButton){
      $scope.selectedButton = selectedButton;
      if(selectedButton == "mygraph"){
            $("#clientCandidateSource").removeClass('active');
        $('#myCandidateSource').addClass('active');
      }else if(selectedButton == "company"){
           $("#myCandidateSource").removeClass('active');
        $('#clientCandidateSource').addClass('active');
      }

 candidatePipelineDonutChart(graphName, $scope.selectedButton);

  }
 candidatePipelineDonutChart(graphName, $scope.selectedButton);

    function candidatePipelineDonutChart() {
        var promise = Factory.getChart(graphName, $scope.selectedButton);
        var label = [];
        var data = [];
        var datainsert=[]
         $scope.candidatePipelineData = []
        promise.then(
          function resolved(response) {
              if(response.data.graphDetails){
               deeplinkURL = response.data.graphDetails.deepLinkURI;


              // = response.data.candidateList;
               $scope.candidatePipelineData=[];
              for (var k in Object.keys(response.data.graphDetails.data))
              {

                      label.push((Object.keys(response.data.graphDetails.data)[k]))
                        data.push(response.data.graphDetails.data[Object.keys(response.data.graphDetails.data)[k]])
                         //datainsert.push[data[k]]
                  $scope.candidatePipelineData.push( {"label":label,"data":data});


                }

 }else{
     data=[0,0,0]
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
        sharedProperties.setReportURL(deeplinkURL)
        $("li[class='active']").removeClass('active');
        $('#ReportHeader').addClass('active');
       $location.path( '/Reports' );

  };
        $timeout(function () {
        $('#candidatePipelineList').selectpicker();

        }, 50, false);


        }

    ]);
