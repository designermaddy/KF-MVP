app.controller('searchResultsController', ['$scope', 'Factory', 'commonFunctions', '$sce', 'config', 'sharedProperties', function ($scope, Factory, commonFunctions, $sce, config, sharedProperties) {

    $scope.name = '';
    $scope.data = [];


    function getData(JobId) {
        var promise = Factory.getRequisitionSearch(JobId);
        promise.then(
          function resolved(response) {
              $scope.data = $scope.rowCollection = response.data.aryaSourcedCandidatesList;
              setValues();
              $scope.candidateName = $scope.rowCollection.map(function(item) {
                  return item.candidateName;
              });
          },
          function rejected(response) {
              alert(response.status + ': ' + response.statusText);
          }
        )
    };

    if (sharedProperties.getJobId()) {
        getData(sharedProperties.getJobId());
        console.log(sharedProperties.getJobId());
    }

    function setValues() {
      if($scope.rowCollection){
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.rowCollection.length;
            $scope.entryLimit = 8; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
      }
    }

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

    $scope.searchlist = function(v) {
        var name = v.trim();
        var newArray = $scope.data;

        var candidateArray = [];
        if (name) {
            angular.forEach(newArray, function(input) {
                if (input.candidateName == name) {
                    candidateArray.push(input);
                }
            });
            newArray = candidateArray;
        }

        if (newArray.length == 0) {
            alert('Result not found');
        }else {
            $scope.rowCollection = newArray;
        }
    }

    $scope.$watch(function() {
        return $scope.rowCollection;
        }, function(newValue, oldValue) {
            $scope.rowCollection = newValue;
            setValues();
    });

    $scope.openSearchIframe = function (candidateId) {
        var url = config.iframeUrl;
        url = url.replace("{candidateId}", candidateId);
        url=url.replace("{jobId}",  sharedProperties.getJobId());
        $("input[name='ReturnUrl']").attr('value', url);
        $('#arya').attr('action', config.iframeAction);
        $('#arya').submit()
        $('#searchResultdiv').hide();
        $('#searchListCandidateDetails').show();
    };
    $('#searchResultBack').click(function (event) {
        event.preventDefault();
        $('#searchListCandidateDetails').hide();
        $('#searchResultdiv').show();
    });

    $scope.refreshResults = function() {
        getData();
    }
}])
