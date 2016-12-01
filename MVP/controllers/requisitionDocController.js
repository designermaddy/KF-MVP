app.controller('requisitionDocController', ['$uibModal', '$scope', 'Factory', 'commonFunctions', 'sharedProperties', 'config', '$sce'






    , function ($uibModal, $scope, Factory, commonFunctions, sharedProperties, config, $sce) {
        var $ctrl = this;
        $ctrl.url = 'pdf/1.pdf';
        $scope.deleteButtonEnable = true;
        var idList = [];
        $scope.openPdf = function (id, filename, doctype) {
            if (doctype == 'R') {
                var url = config.localUrl + '/Requisition/getRequisitionDocumentById/' + id;
            }
            else {
                var url = config.localUrl + '/Profile/getDocumentById/' + id;
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
            var modalInstance = $uibModal.open({
                animation: true
                , templateUrl: 'pdfDocUpload.html'
                , controller: 'pdfUploadModalCtrl'
                , controllerAs: '$ctrl'
                , size: 'lg'
            });
        }

        function pdfDetails() {
            var data = {
                'requisition': sharedProperties.getPositionId()
                , 'engagementId': parseInt(sharedProperties.getRequisitionDetails().EngagementId)
            }
            var promise = Factory.requisitionDocDetailsList(data);
            promise.then(function resolved(response) {
                console.log(response.data);
                $scope.pdfDetailsData = response.data.requisitionDocList;
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
app.controller('pdfUploadModalCtrl', ['$uibModalInstance', '$scope', 'fileUpload', 'config', function ($uibModalInstance, $scope, fileUpload, config) {
        var $ctrl = this;
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.uploadFile = function () {
            var file = $scope.myFile;
            var uploadUrl = config.localUrl + "/Requisition/uploadRequisitionDocument";
            fileUpload.uploadFileToUrl(file, uploadUrl);
        };
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
app.service('fileUpload', ['$http', 'sharedProperties', function ($http, sharedProperties) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('engagementId', sharedProperties.getRequisitionDetails().EngagementId);
        fd.append('requisitionId', sharedProperties.getPositionId());
        fd.append('searchString', $('#pduta').val());
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
    }
     }]);
