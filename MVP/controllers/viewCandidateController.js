app.controller('viewCandidateController', ['$scope', 'Factory', 'sharedProperties', 'commonFunctions', '$sce', function ($scope, Factory, sharedProperties, commonFunctions, $sce) {
    $scope.id = sharedProperties.getViewCandidateId();
    $scope.alltags = [];
    /** -- Scope function definitons -- **/
    $scope.backCandidateList = function () {
        $('#candidatelistid').show();
        $('#reqCanDet').hide();
    };
    $scope.saveNotes = function () {
        var data = {
            'id': $scope.id
            , 'note': $('#notes').val()
        }
        var promise = Factory.getNoteToCandidate(data);
        promise.then(function resolved(response) {
            if (response.data.candidateNotes) {
                $scope.notes = response.data.candidateNotes;
                if ($scope.notes.length >= 2) {
                    $scope.noteValue1 = $scope.notes[$scope.notes.length - 2]
                    $scope.noteValue2 = $scope.notes[$scope.notes.length - 1]
                }
                else {
                    if ($scope.notes[0]) {
                        $scope.noteValue1 = $scope.notes[0]
                    }
                    if ($scope.notes[1]) {
                        $scope.noteValue2 = $scope.notes[1]
                    }
                }
                //   updateNotes( $scope.notes )
            }
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        });
    }
    $scope.viewAllNotes = function () {
            var data = {
                'activeTab': 5
                , 'time': new Date().getTime()
            }
            sharedProperties.setAllNotesDetails(data);
        }
        /** ---------- function definition ------------- **/
    var getData = function (id) {
        if (id) {
            viewCandidates(id);
            canReq(id);
            canStatus(id);
        }
    }
    var viewCandidates = function (id) {
        var promise = Factory.getviewCandidate(id);
        promise.then(function resolved(response) {
            $scope.row = response.data.candidateDetails[0];
            sharedProperties.setCandidateListDetails($scope.row);
            if (sharedProperties.getCandidateListDetails()) {
                var urlResumeLink = $scope.candidateDetailsList = sharedProperties.getCandidateListDetails();
                var link = urlResumeLink.resumeLink
                $scope.currentEmployer = $scope.row.profile.currentEmployer
                $scope.currentJobTitle = $scope.row.profile.currentJobTitle
                $scope.jobFunction = $scope.row.profile.jobFunction
                $scope.summary = $scope.row.profile.summary
            }
            $scope.notes = response.data.candidateNotes;
            if ($scope.notes.length >= 2) {
                $scope.noteValue1 = $scope.notes[$scope.notes.length - 2]
                $scope.noteValue2 = $scope.notes[$scope.notes.length - 1]
            }
            else {
                if ($scope.notes[0]) {
                    $scope.noteValue1 = $scope.notes[0]
                }
                if ($scope.notes[1]) {
                    $scope.noteValue2 = $scope.notes[1]
                }
            }
            // updateNotes( $scope.notes )
            $scope.tags = response.data.candidateTags[0].tags.toString();
            getSocial($scope.row);
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        })
    }
    var canStatus = function (id) {
        var posId = sharedProperties.getPositionId();
        var canId = id;
        $('.btn-selected').removeClass('btn-selected');
        var promise = Factory.getCandidateStatus(posId, canId);
        promise.then(function resolved(response) {
            var i = 1;
            var step = response.data.workFlowStatu[0].stepName;
            if (step == 'Sourced') {
                i = 1;
            }
            else if (step == 'Phone Screen') {
                i = 2;
            }
            else if (step == 'Candidate Submitted') {
                i = 3;
            }
            else {
                i = 1;
            }
            $($('.candidateContact').find('button')[i - 1]).addClass('btn-selected');
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        });
    }
    var canReq = function (id) {
        var pro = Factory.getCandidateRequisition(id);
        pro.then(function resolved(response) {
            $scope.canReq = response.data.candidateRequisition;
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        });
    }
    var getSocial = function (row) {
            var social = row.social;
            var url = '';
            social.forEach(function (obj) {
                if (obj.type == 'LinkedIn') {
                    url = obj.url;
                }
            })
            $scope.url = url;
        }
        // Called once to get all the tag list. No need to repeat as the list does not change.
    var getAllTags = function () {
        var p = Factory.getAllTags();
        p.then(function resolved(response) {
            $scope.alltags = response.data.allLoopTags;
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        })
    }
    getAllTags();
    /*//------ ! I don't know where is this used as of now. Written by karthik B --------------//
    var callPdf = function (urlResumeLink) {
        var url = urlResumeLink;
        var promise = Factory.resumeGetPDF(url);
        promise.then(function resolved(response) {
            var file = new Blob([response.data], {
                type: 'application/pdf'
            });
            var fileURL = URL.createObjectURL(file);
            $scope.pdfContent = $sce.trustAsResourceUrl(fileURL);
            $scope.url = $scope.pdfContent
        })
    }*/
    /** -- Watchers --- **/
    $scope.$watch(function () {
        return $scope.url;
    }, function (newValue, oldValue) {
        $scope.url = newValue;
    });
    $scope.$watch(function () {
        return sharedProperties.getViewCandidateId();
    }, function (newValue, oldValue) {
        $scope.id = newValue;
        getData($scope.id);
    });
            }]);
