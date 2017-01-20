app.controller('viewCandidateController', ['$scope', 'Factory', 'sharedProperties', 'commonFunctions', '$sce','$uibModal','config', function ($scope, Factory, sharedProperties, commonFunctions, $sce, $uibModal, config) {
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
                config.notes = $scope.notes;
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
$scope.confirmPopup = function(){

    if($scope.urlResumePdfDownload){
         alert( $scope.informationText)
        //confirm($scope.informationText)
    }else{
    alert( $scope.informationText)
    }

}
    var viewCandidates = function (id) {
        var promise = Factory.getviewCandidate(id);
        promise.then(function resolved(response) {
            $scope.row = response.data.candidateDetails[0];
            $scope.emailId = search("Email", $scope.row.contactMethods);
            $scope.phoneNo = search("Home", $scope.row.contactMethods);
            $scope.mobile = search("Mobile", $scope.row.contactMethods);
            sharedProperties.setCandidateListDetails($scope.row);
            if (sharedProperties.getCandidateListDetails()) {
                var urlResumeLink = $scope.candidateDetailsList = sharedProperties.getCandidateListDetails();
                var link = urlResumeLink.resumeLink

                if(link){

                    $scope.informationText = "The file is getting download"
                }else{

                     $scope.informationText = "Sorry the resume is not available"
                }
                 $scope.urlResumePdfDownload = link;
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
    function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if(myArray[i].location === nameKey){
            return myArray[i];
        }
        else if(myArray[i].type === nameKey) {
            return myArray[i];
        }
    }
}
    var canStatus = function (id) {
         var reqDetailsperRequisition = sharedProperties.getRequisitionDetails();
            if(reqDetailsperRequisition.ReqNumber){
                // page and status is static mentioned by Karthik position id dynamic//
               /* postData = {
                    "requestParams": {"page":"2","status":"New","orgId":"9855","positionId": reqDetailsperRequisition.ReqNumber}
                }*/
                sharedProperties.setPositionId(reqDetailsperRequisition.Position);
            }
        var posId = sharedProperties.getPositionId();
        var canId = id;
        $('.btn-selected').removeClass('btn-selected');
        var promise = Factory.getCandidateStatus(posId, canId);
        promise.then(function resolved(response) {
            if(response.data){
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
            }
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        });
    }
     var canReq = function (id) {
        var reqNo = sharedProperties.getRequisitionDetails().ReqNumber;
        var pro = Factory.getCandidateRequisition(id, reqNo);
        pro.then(function resolved(response) {
            $scope.canReq = response.data.candidateRequisition;
            angular.forEach($scope.canReq, function (value, key) {
                if (value.requisitionNumber == reqNo) {
                    $scope.canReq.splice(key, 1);
                }
            })
            if ($scope.canReq.length > 0){
                $scope.showReqPopover = true;
            }
            else{
                $scope.showReqPopover = false;
            }
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

    // call the mail function when mail icon clicked

     $scope.openMailPopup = function() {
        var modalInstance = $uibModal.open({
              animation: true
            , templateUrl: 'emailPopup.html'
            , controller: 'emailPopupController'
            , size: 'lg'
        });
    }
 $scope.updateCandidate = function(candidateID){
            var urlLink = commonFunctions.getIframeUrl('editCandidateLoop');
            var urliframJoin = commonFunctions.getIframeUrl('iframeTrue')
            var url = urlLink+candidateID+'/?'+urliframJoin;
        var modalInstance = $uibModal.open({
              animation: true
            , templateUrl: 'modalContentLoop.html'
             , windowClass: 'app-modal-window'
            , controller: 'ModalCancel'
            , controllerAs: '$ctrl'
            , size: 'lg'
            , resolve: {
                url: function () {
                    return url;
                }
            }
        });
     }
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
app.controller('emailPopupController', ['$uibModalInstance', '$scope','$timeout','Factory','commonFunctions','sharedProperties', function($uibModalInstance, $scope, $timeout, Factory, commonFunctions, sharedProperties ) {

    //companyDtls();
    emailProfileDtls();
    $scope.data={};
    var arrCandidateId =[];
     arrCandidateId.push(sharedProperties.getViewCandidateId());
    $scope.data.candidateIDs =arrCandidateId;
    $scope.data.userMailID = sharedProperties.getEmailID()
    function emailProfileDtls(){
         var promise = Factory.emailProfileDetails();
        promise.then(function resolved(response) {
           // console.log()
            // $scope.data.templateId = //set the templateid
            $scope.emailProfileOptions = response.data.emailProfile;
           // $scope.emailProfileOptions = companyName;
            $timeout(function () {
                $('#selectEmailProfile').selectpicker();
            }, 50, false);
           //loadCompany();
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        })
    }
     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
     $scope.emailProfileSelect = function(emailProfileID){

         $scope.data.profileId = emailProfileID.id

     }
     function companyDtls() {
        var promise = Factory.candidateCompany();
        promise.then(function resolved(response) {
            var companyName = response.data.company;
            $scope.options = companyName;
            $timeout(function () {
                $('#selectCompany').selectpicker();
            }, 50, false);
           //loadCompany();
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        })
    };


 $scope.companySelect = function (form) {
        var selectedCompanyOptions = form;
     if(selectedCompanyOptions){
        var companyID = selectedCompanyOptions.id;
         if( companyID){
             templateDropDownFunction(companyID);
         }
       }else{
           var companyID = "";
           templateDropDownFunction(companyID)
       }
    }
 var reqDtls = sharedProperties.getRequisitionDetails()
 if(reqDtls){
     templateDropDownFunction(reqDtls.EngagementId);
 }
  $scope.templateSelect = function (form) {
        var selectedTemplateOptions = form;
      if(selectedTemplateOptions){
      var templateID = selectedTemplateOptions.id;
     if( templateID){
         getTemplateContent(templateID);
         $scope.data.templateId=templateID
     }
    }else{
          $scope.data.body = "";
     }
  }

  function getTemplateContent(id){
       var promise = Factory.templateContent(id);

        promise.then(function resolved(response) {
            var templateDtls = response.data;

            $scope.data.body = templateDtls.templateContent.body;

           // $scope.templateOptions
           // $scope.options = companyName;
           /* $timeout(function () {
                $('#selectCompany').selectpicker();
            }, 50, false);*/
           //loadCompany();
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        })


  }
 function templateDropDownFunction(id){
        // id=2521
      var promise = Factory.candidateTemplate(id);

        promise.then(function resolved(response) {
            var template = response.data;
            console.log(template);
            $scope.templateOptions=template.template;
           // $scope.options = companyName;
            $timeout(function () {
                $('#selectTemplate').selectpicker();
            }, 50, false);
           //loadCompany();
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        })

 }
     function loadCompany(){

      var data = $scope.pdfDetailsData;
        var selectFunctionArray = ['All'];
        if (data) {
            angular.forEach(data, function (item) {
                var uniqueValue = item.Function;
                if (selectFunctionArray.indexOf(uniqueValue) == -1) {
                    selectFunctionArray.push(uniqueValue)
                }
            })
            $scope.options = selectFunctionArray;
            $scope.form = $scope.options[0];
            $timeout(function () {
                $('#selectCompany').selectpicker();
            }, 50, false);
        }
     }
     $scope.sendMail = function(){

         var promise = Factory.sendMail($scope.data);
        promise.then(function resolved(response) {
           console.log(response.data)
            $scope.cancel();
           alert(response.data.response.message);
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        })
    }
     //update candidate deep link

}])
