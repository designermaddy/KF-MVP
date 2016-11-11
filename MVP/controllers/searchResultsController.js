app.controller('searchResultsController', ['$scope', 'Factory', 'commonFunctions', '$sce', 'config', 'sharedProperties','$timeout', function ($scope, Factory, commonFunctions, $sce, config, sharedProperties, $timeout) {

    $scope.name = '';
    $scope.start = 1;
    $scope.data = [];
    $scope.total = 0;

     var values = {
        'orgId' : 6,
        'limit' : 10,
        'page'  : 1,
        'jobId' : 0
    }

    function getAryaJobId() {
        if (sharedProperties.getClientJobID()) {
            id = sharedProperties.getClientJobID();
            var promise = Factory.getAryaJobId(id);
            promise.then(
                function resolved(response) {
                    sharedProperties.setJobId(response.data.AryaJobID);
                    $scope.total = response.data.TotalSourcedCount;
                    if (sharedProperties.getJobId()) {
                        getData();
                    }
                },
                function rejected(response) {
                 commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
                }
            );

        }
    }

    getAryaJobId();

    function getData() {
        values.jobId = sharedProperties.getJobId();
        var promise = Factory.getRequisitionSearch(values);
        promise.then(
          function resolved(response) {
              $scope.data = $scope.rowCollection = response.data.aryaSourcedCandidatesList;
              $scope.start = values.page * values.limit - values.limit || 1;
              $scope.end = values.page * values.limit;
              //setValues();
              $scope.candidateName = $scope.rowCollection.map(function(item) {
                  return item.candidateName;
              });
          },
          function rejected(response) {
              commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
          }
        )
    };

    $scope.prev = function () {
        if (values.page > 1) {
            values.page -= 1;
        }
        getData();
    }
    $scope.next = function () {
        if ($scope.rowCollection.length > 1) {
            values.page += 1;
            getData();
        }
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
            str += '<i class="fa fa-circle" aria-hidden="true"></i>';
            //str += "";
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
        userName = sharedProperties.getUserName();
        password = sharedProperties.getPassword();
        $("input[name='LoginName']").attr('value', userName);
        $("input[name='Password']").attr('value', password);
        $("input[name='ReturnUrl']").attr('value', url);
        $('#arya').attr('action', config.iframeAction);
        $('#arya').submit()
        $('#searchResultdiv').hide();
        $('#searchListCandidateDetails').show();
    };
    $scope.searchResultBack = function() {
        $('#searchListCandidateDetails').hide();
        $('#searchResultdiv').show();
    };

    $scope.refreshResults = function() {
        if (sharedProperties.getJobId()) {
            getData();
        }
    }
    $timeout(function () {
        $('#searchSavedSearchesList').selectpicker();
        console.log($('.selectpicker'))
        }, 50, false);
}])
