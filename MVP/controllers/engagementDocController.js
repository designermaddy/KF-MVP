app.controller('engagementDocController', ['$uibModal', '$scope', 'Factory', 'sharedProperties', 'config', 'commonFunctions', '$sce', function ($uibModal, $scope, Factory, sharedProperties, config, commonFunctions, $sce) {
    //getEngagementId
    var id = sharedProperties.getengagementPerIDSelected();
    //post data to backend with engagementId
    var data = {
        "engagementId": id
    };
    $scope.isDeleteButton = true;

    $scope.toggleDelButton = function() {
        if ($('input:checked').length){
            $scope.isDeleteButton = false;
        }else {
            $scope.isDeleteButton = true;
        }
    }

    var getDocs = function () {
        var promise = Factory.postDocumentByEngagement(data);
        promise.then(function resolved(response) {
            $scope.pdfDetailsData = response.data.documentList;
            setValues();
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        })
    }
    getDocs();


    function setValues() {
        if ($scope.pdfDetailsData) {
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.pdfDetailsData.length;
            $scope.entryLimit = 8; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        }
    }
    $scope.openPdf = function (url, filename) {
        var url = config.projectUrl + '/Profile/getDocumentById/' + url;
        var promise = Factory.getPDF(url);
        promise.then(function resolved(response) {
            var file = new Blob([response.data], {
                type: 'application/pdf'
            });
            var fileURL = URL.createObjectURL(file);
            $scope.pdfContent = $sce.trustAsResourceUrl(fileURL);
            $scope.fileName = filename
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
    $scope.deleteDocs = function () {
        //select all checkboxs
        var n = $('input[type=checkbox]:checked').map(function () {
            return $(this).val();
        })
        $uibModal.open({
                animation: true
                , templateUrl: 'deleteDocEngDetails.html'
                , controller: 'deleteDocEngDetailsModalCtrl'
                , size: 'md'
                , resolve: {
                    list: function () {
                        return n;
                    }
                }
            })
            //display the list
            //on confirm, delete the documents
            //refresh the list
    }
    $scope.uploadDoc = function () {
        $uibModal.open({
            animation: true
            , templateUrl: 'uploadDocEngDetails.html'
            , controller: 'uploadDocEngDetailsModalCtrl'
            , size: 'md'
        })
    }
    $scope.$watch(function () {
        return sharedProperties.refreshEngDetailsDocList();
    }, function () {
        getDocs();
    });
}]);
app.controller('DocModalCtrl', ['$uibModalInstance', 'url', 'filename', '$scope', function ($uibModalInstance, url, filename, $scope) {
    $scope.url = url;
    $scope.fileName = filename;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])
app.controller('uploadDocEngDetailsModalCtrl', ['$uibModalInstance', '$http', '$scope', 'sharedProperties', 'config','commonFunctions', function ($uibModalInstance, $http, $scope, sharedProperties, config, commonFunctions) {
    var uploadUrl =  config.projectUrl + '/engagement/uploadEngagementDocument';
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.uploadFile = function () {
        var file = $scope.myFile;
        var fd = new FormData();
        var pdfEmbedded = commonFunctions.checkPDFUpload (file);
        if (!pdfEmbedded || file.length < 1 || $('#udedfn').val().length < 1 || $('#udedss').val().length < 1) {
            if(!pdfEmbedded){
              var myfile= file.name;
              var ext = myfile.split('.').pop();
               commonFunctions.error('The '+ext+' file will not be allowed');
            }
            else{
                commonFunctions.error('Please fill the mandatory fields');
            }
            return false;
        }
        else {
            fd.append('file', file);
            fd.append('fileName', $('#udedfn').val());
            fd.append('engagementId', sharedProperties.getengagementPerIDSelected());
            fd.append('searchString', $('udedss').val());
        }
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity
            , headers: {
                'Content-Type': undefined
            }
        }).success(function (response) {
            if (response.status == 'Uploaded Successfully') {
                sharedProperties.refreshEngDetailsDocList(new Date());
            }
        }).error(function () {
            console.log('error');
        })
        $scope.cancel();
    }
}])
app.controller('deleteDocEngDetailsModalCtrl', ['$uibModalInstance', 'Factory', '$scope', 'sharedProperties', 'list', function ($uibModalInstance, Factory, $scope, sharedProperties, list) {
    $scope.present = false;
    if (list.length > 0) {
        $scope.opts = [];
        $scope.present = true;
        angular.forEach(list, function (value) {
            $scope.opts.push({
                'id': value.split(',')[0]
                , 'name': value.split(',')[1]
            });
        })
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.deleteFiles = function () {
        var list = [];
        angular.forEach($scope.opts, function (value) {
            list.push(value.id);
        })
        var promise = Factory.removeEngagementDocuments(list, sharedProperties.getengagementPerIDSelected());
        promise.then(function resolved(response) {
            if (response.data.status == "Removed Successfully") {
                //load the documents again.
                sharedProperties.refreshEngDetailsDocList(new Date());
            }
        }, function rejected(response) {
            //commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        })
        $scope.cancel();
    }


}])
