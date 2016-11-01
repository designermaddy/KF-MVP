app.controller('viewCandidateController', ['$scope', 'Factory', 'sharedProperties', function ($scope, Factory, sharedProperties) {

    $scope.id = sharedProperties.getViewCandidateId();

    var getData = function(id) {
        if (id) {
            var promise = Factory.getviewCandidate(id);
                  promise.then(
                  function resolved(response) {
                        $scope.row = response.data.candidateDetails[0];
                        getSocial($scope.row);
                  },
                  function rejected(response) {
                      alert(response.status + ': ' + response.statusText);
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

}]);
