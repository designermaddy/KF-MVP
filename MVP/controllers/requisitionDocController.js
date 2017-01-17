app.controller('requisitionDocController', ['$uibModal', '$scope', 'Factory', 'commonFunctions', 'sharedProperties', 'config', '$sce'


    , function ($uibModal, $scope, Factory, commonFunctions, sharedProperties, config, $sce) {
        var $ctrl = this;
        $ctrl.url = 'pdf/1.pdf';
        $scope.deleteButtonEnable = true;
        var idList = [];
        $scope.openPdf = function (id, filename, doctype) {
            if (doctype == 'R' || doctype == 'O') {
                var url =  config.projectUrl + '/Requisition/getRequisitionDocumentById/' + id;
            }
            else {
                var url =  config.projectUrl + '/Profile/getDocumentById/' + id;
            }
            var promise = Factory.getPDF(url);
            promise.then(function resolved(response) {
                var file = new Blob([response.data], {
                    type: 'application/pdf'
                });
                var fileURL = URL.createObjectURL(file);
                $scope.pdfContent = $sce.trustAsResourceUrl(fileURL);
                $scope.fileName = filename;
                var modalInstance = $uibModal.open({
                    animation: true
                    , templateUrl: 'Docmodal.html'
                    , controller: 'DocModalCtrl'
                    , size: 'lg'
                    , resolve: {
                        url: function () {
                            return $scope.pdfContent;
                        }
                        , filename: function () {
                            return $scope.fileName;
                        }
                    }
                });
            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            })
        }
        $scope.uploadDocPdf = function () {
             commonFunctions.GAEventHandler(sharedProperties.getGAEventData().AttachNewDocument);
            var modalInstance = $uibModal.open({
                animation: true
                , templateUrl: 'pdfDocUpload.html'
                , controller: 'pdfUploadModalCtrl'
                , controllerAs: '$ctrl'
                , size: 'md'
            });
        }

        function pdfDetails() {
            var data = {
                'requisition': sharedProperties.getPositionId()
                , 'engagementId': sharedProperties.getRequisitionDetails().EngagementId
            }
            var promise = Factory.requisitionDocDetailsList(data);
            promise.then(function resolved(response) {
                $scope.pdfDetailsData = response.data.requisitionDocList;
                //Pagination Details
              $scope.currentPage = 1;
              $scope.entryLimit = 10;
              $scope.totalItems = $scope.pdfDetailsData.length;
              $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            })
        };
        pdfDetails();
        $scope.addId = function (id) {
            var index = idList.indexOf(id);
            if (index > -1) {
                idList.splice(index, 1);
            }
            else {
                idList.push(id);
            }
            $scope.deleteButtonEnable = idList.length ? false : true;
        }
        $scope.deleteDoc = function () {
            if (idList.length > 0) {
                var list = [];
                angular.forEach(idList, function (key, value) {
                    list.push({
                        'id': key
                    });
                })
                var data = {
                    "reqDocument": list
                }
                var promise = Factory.removeRequisitionDocument(data);
                promise.then(function resolved(response) {
                    if (response.data.status == "Removed Successfully") {
                        pdfDetails();
                    }
                }, function rejected(response) {
                    commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
                })
            }
        }
        $scope.$watch(function () {
            return sharedProperties.refreshPdfDocList();
        }, function (newValue, oldValue) {
            pdfDetails();
        });
}]);
app.controller('ModalCtrl', ['$uibModalInstance', 'url', function ($uibModalInstance, url) {
    var $ctrl = this;
    $ctrl.url = url;
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])
app.controller('pdfUploadModalCtrl', ['$uibModalInstance', '$scope', 'fileUpload', 'config', 'commonFunctions', 'sharedProperties', function ($uibModalInstance, $scope, fileUpload, config, commonFunctions, sharedProperties) {
        var $ctrl = this;
        $scope.radioModel = true;
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.uploadFile = function () {
            var file1 = $scope.myFile1;
            var file2 = $scope.myFile2;
            var uploadUrl =  config.projectUrl + "/Requisition/uploadRequisitionDocument";
            if (fileUpload.uploadFileToUrl(file1, file2, uploadUrl, $scope.radioModel)) {
                $uibModalInstance.dismiss('cancel');
            }
        };
        $scope.GAEventTrigger = function(){
             commonFunctions.GAEventHandler(sharedProperties.getGAEventData().AddNewRequisitionOther);
        }
}])
    //http://angularcode.com/simple-file-upload-example-using-angularjs/
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A'
        , link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
     }]);
app.service('fileUpload', ['$http', 'sharedProperties','commonFunctions', function ($http, sharedProperties, commonFunctions) {
    this.uploadFileToUrl = function (file1, file2, uploadUrl, radioModel) {
        var doc = radioModel ? 'R' : 'O';
        var fd = new FormData();
        if (doc == 'O') {
            var pdfEmbedded = commonFunctions.checkPDFUpload (file2);
            if (!pdfEmbedded || file2.length < 1 || $('#pdoin').val().length < 1) {
                if(!pdfEmbedded){
                     var myfile= file2.name;
              var ext = myfile.split('.').pop();
               commonFunctions.error('The '+ext+' file will not be allowed');

                }
                else{
                    commonFunctions.error('Please fill the mandatory fields');
                }
                return false;
            }
            else {
                fd.append('file', file2);
                fd.append('fileName', $('#pdoin').val());
            }
        }
        else {
            var pdfEmbedded = commonFunctions.checkPDFUpload (file1);
            if (!pdfEmbedded || $('#pduin').val().length < 1 || $('#pduJd').val().length < 1 || file1.length < 1 || $('#pduss').val().length < 1) {
                if(!pdfEmbedded){
                    var myfile= file1.name;
                    var ext = myfile.split('.').pop();
                    commonFunctions.error('The '+ext+' file will not be allowed');

                }
                else{
                    commonFunctions.error('Please fill the mandatory fields');
                }
                return false;
            }
            else {
                fd.append('file', file1);
                fd.append('searchString', $('#pduss').val());
                fd.append('fileName', $('#pduin').val());
                fd.append('jobDesc', $('#pduJd').val());
            }
        }
        fd.append('engagementId', sharedProperties.getRequisitionDetails().EngagementId);
        fd.append('requisitionId', sharedProperties.getPositionId());
        fd.append('docType', doc)
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity
            , headers: {
                'Content-Type': undefined
            }
        }).success(function (response) {
            if (response.status == 'Uploaded Successfully') {
                sharedProperties.refreshPdfDocList(new Date());
            }
        }).error(function () {
            console.log('error');
        });
        return true;
    }


}]);
