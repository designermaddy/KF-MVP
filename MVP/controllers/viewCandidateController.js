app.controller('viewCandidateController', ['$scope', 'Factory', 'sharedProperties', 'commonFunctions', '$sce', function ($scope, Factory, sharedProperties, commonFunctions, $sce) {

    $scope.id = sharedProperties.getViewCandidateId();

    var getData = function (id) {
        if (id) {
            var promise = Factory.getviewCandidate(id);
            promise.then(
                function resolved(response) {
                    $scope.row = response.data.candidateDetails[0];
                    sharedProperties.setCandidateListDetails($scope.row);
                    if (sharedProperties.getCandidateListDetails()) {
                        var urlResumeLink = $scope.candidateDetailsList = sharedProperties.getCandidateListDetails();
                        var link = urlResumeLink.resumeLink
                        callPdf(link);
                    }

                    function callPdf(urlResumeLink) {
                        var url = urlResumeLink;
                        var promise = Factory.getPDF(url);
                        promise.then(
                            function resolved(response) {
                                var file = new Blob([response.data], {
                                    type: 'application/pdf'
                                });
                                var fileURL = URL.createObjectURL(file);
                                $scope.pdfContent = $sce.trustAsResourceUrl(fileURL);

                                $scope.url = $scope.pdfContent


                            })
                    }
                    $scope.notes = response.data.candidateNotes;
                    if ($scope.notes.length >= 2) {
                        $scope.noteValue1 = $scope.notes[$scope.notes.length - 2]
                        $scope.noteValue2 = $scope.notes[$scope.notes.length - 1]
                    } else {
                        if ($scope.notes[0]) {
                            $scope.noteValue1 = $scope.notes[0]
                        }
                        if ($scope.notes[1]) {
                            $scope.noteValue2 = $scope.notes[1]
                        }
                    }
                    // updateNotes( $scope.notes )


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
    updateNotes = function (notes) {

    }
    $scope.$watch(function () {
        return $scope.url
    }, function (newValue, oldValue) {
        $scope.url = newValue;
        //setValues();
    });
    $scope.$watch(function () {
        return sharedProperties.getViewCandidateId();
    }, function (newValue, oldValue) {
        $scope.id = newValue;
        getData($scope.id);
    });

    $scope.backCandidateList = function () {
        $('#candidatelistid').show();
        $('#reqCanDet').hide();
    };

    getSocial = function (row) {
        var social = row.social;
        var url = '';
        social.forEach(function (obj) {
            if (obj.type == 'LinkedIn') {
                url = obj.url;
            }
        })
        $scope.url = url;
    }

    $scope.saveNotes = function () {
        var data = {
            'id': $scope.id,
            'note': $('#notes').val()
        }
        var promise = Factory.getNoteToCandidate(data);
        promise.then(
            function resolved(response) {
                //  console.log(reposne.data);
                if (response.data.candidateNotes) {
                    $scope.notes = response.data.candidateNotes;
                    if ($scope.notes.length >= 2) {
                        $scope.noteValue1 = $scope.notes[$scope.notes.length - 2]
                        $scope.noteValue2 = $scope.notes[$scope.notes.length - 1]
                    } else {
                        if ($scope.notes[0]) {
                            $scope.noteValue1 = $scope.notes[0]
                        }
                        if ($scope.notes[1]) {
                            $scope.noteValue2 = $scope.notes[1]
                        }
                    }
                    //   updateNotes( $scope.notes )
                }
            },
            function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            }
        );
    }

    $scope.viewAllNotes = function(){
        var data = {
            'activeTab' : 5,
            'time' : new Date().getTime()
        }
        sharedProperties.setAllNotesDetails(data);
    }

}]);
