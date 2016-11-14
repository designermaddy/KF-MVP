app.controller('viewCandidateController', ['$scope', 'Factory', 'sharedProperties', 'commonFunctions', function ($scope, Factory, sharedProperties, commonFunctions) {

    $scope.id = sharedProperties.getViewCandidateId();

    var getData = function(id) {
        if (id) {
            var promise = Factory.getviewCandidate(id);
                  promise.then(
                  function resolved(response) {
                        $scope.row = response.data.candidateDetails[0];
                        $scope.notes = response.data.candidateNotes;
                        $scope.tags = response.data.candidateTags[0].tags.toString();
                        console.log(response.data);
                        getSocial($scope.row);
                  },
                  function rejected(response) {
                      commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
                  }
              )
        }
    }

    $scope.$watch(function() {
        return sharedProperties.getViewCandidateId();
        }, function(newValue, oldValue) {
            $scope.id = newValue;
            getData($scope.id);
    });

    $scope.backCandidateList = function() {
        $('#candidatelistid').show();
        $('#reqCanDet').hide();
    };

    getSocial = function(row) {
        var social = row.social;
        var url = '';
        social.forEach(function(obj){
            if (obj.type == 'LinkedIn') {
                url = obj.url;
            }
        })
        $scope.url = url;
    }

    $scope.saveNotes = function() {
        var data = {
            'id' : $scope.id,
            'note' : $('#notes').val()
        }
        var promise = Factory.getNoteToCandidate(data);
        promise.then(
          function resolved(response) {
                console.log(reposne.data);
          },
          function rejected(response) {
              commonFunctions.error('Failed to load Sujeet : ' + response.status + ': ' + response.statusText);
          }
        );
    }

}]);
