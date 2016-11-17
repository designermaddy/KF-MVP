app.controller('candidateDetailsTabController', ['$scope', 'Factory', 'sharedProperties', 'commonFunctions', function ($scope, Factory, sharedProperties, commonFunctions) {

    $scope.id = sharedProperties.getViewCandidateId();
    $scope.position = sharedProperties.getPositionId();

    var getHistory = function () {
        if ($scope.id) {
            var promise = Factory.getCandidateHistory($scope.id, $scope.position);
            promise.then(
                function resolved(response) {
                    $scope.HistoryList = response.data.candidateHistory;
                },
                function rejected(response) {
                    commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
                }
            )
        }
    }
    getHistory();

    var getDocuments = function () {
        if ($scope.id) {
            var promise = Factory.getCandidateDocuments($scope.id);
            promise.then(
                function resolved(response) {
                    console.log(response.data);
                },
                function rejected(response) {
                    commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
                }
            )
        }
    }
    getDocuments();

    var getNotes = function () {
        if ($scope.id) {
            var promise = Factory.getViewAllNotes($scope.id);
            promise.then(
                function resolved(response) {
                    $scope.noteList = response.data.candidateNotes;
                    console.log('here');
                },
                function rejected(response) {
                    commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
                }
            );
        }
    }

    $scope.$watch(function () {
        return sharedProperties.getViewCandidateId();
    }, function (newValue, oldValue) {
        $scope.id = newValue;
        getHistory();
        getDocuments();
        getNotes();
    });

    $scope.$watch(function () {
        return sharedProperties.getAllNotesDetails();
    }, function (newValue) {
        $scope.indextab = newValue.activeTab;
        getNotes();
    })
}]);
