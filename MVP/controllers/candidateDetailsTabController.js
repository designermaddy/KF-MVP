app.controller('candidateDetailsTabController', ['$scope', 'Factory', 'sharedProperties', 'commonFunctions', '$sce','config','$rootScope', function ($scope, Factory, sharedProperties, commonFunctions, $sce, config, $rootScope) {
    $scope.id = sharedProperties.getViewCandidateId();
    $scope.position = sharedProperties.getPositionId();
    $scope.ns = $scope.date = {};
    $scope.byteThere = false;
    var getHistory = function () {
        if ($scope.id) {
            var promise = Factory.getCandidateHistory($scope.id);
            promise.then(function resolved(response) {
                $scope.historyList = response.data.candidateHistory;
            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            })
        }
    }
    getHistory();
    var getDocuments = function () {
        if ($scope.id) {
            var promise = Factory.getCandidateDocuments($scope.id);
            promise.then(function resolved(response) {
                $scope.doclist = response.data.attachedDocumentsCandidate;
                console.log(response.data);
            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            })
        }
    }
    getDocuments();
    var getNotes = function () {
        if ($scope.id) {
            var promise = Factory.getViewAllNotes($scope.id);
            promise.then(function resolved(response) {
                $scope.noteList = response.data.candidateNotes;
            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            });
        }
    }
    var getResume = function () {
        if ($scope.id) {
            $scope.byteThere = false;
            var promise = Factory.getCandidateResume($scope.id);
            promise.then(function resolved(response) {
                console.log(response.data);
                if (response.data.byteLength > 0) {
                    var file = new Blob([response.data], {
                        type: 'application/pdf'
                    });
                    var fileURL = URL.createObjectURL(file);
                    $scope.pdfContent = $sce.trustAsResourceUrl(fileURL);
                    sharedProperties.setURLPdf($scope.pdfContent);
                    $scope.byteThere = true;
                    //response.data.byteLength = 0;
                }
                else {
                    $scope.byteThere = false;
                }
            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            });
        }
    }
    $scope.$watch(function () {
        return sharedProperties.getViewCandidateId();
    }, function (newValue, oldValue) {
        $scope.id = newValue;
        getHistory();
        getDocuments();
        getNotes();
        getResume();
    });
    $scope.$watch(function () {
        return sharedProperties.getAllNotesDetails();
    }, function (newValue) {
        $scope.indextab = newValue.activeTab;
        getNotes();
    })
    $rootScope.$watch(function() {return config.notes}, function() {
        // do something here
        //config.searcherReq
       getNotes();
    }, true);
	 /**Refresh Requisitions Canditates History**/
	 $scope.refreshHistory = function() {
       getHistory();
    }
	 /**Refresh Requisitions Canditates Notes**/
	 $scope.refreshNotes = function() {
       getNotes();
    }
}]);

