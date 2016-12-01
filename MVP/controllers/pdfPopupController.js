app.controller('pdfPopupController', ['$uibModal', '$scope', 'Factory', 'sharedProperties', 'commonFunctions', 'config', '$timeout', '$http', '$sce', function ($uibModal, $scope, Factory, sharedProperties, commonFunctions, config, $timeout, $http, $sce) {
    $scope.engagmentIDName = ''
    $scope.saveButtonEnable = true;
    $scope.factivaURL = config.factivaURL;
    $scope.oneSourceURL = config.onesourceURL;
    sharedProperties.setprofileSelectedEngagementID($scope.engagmentIDName)
    $scope.check = function () {
        console.log($scope.searchText);
    }
    $scope.selectName = 'All';
    $scope.update = function (form) {
        $scope.selectName = form;
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
    $scope.postHayGroupToGetLink = function () {
        var credentialName = {
            activateName: sharedProperties.getActiveUserNameName()
            , activatePassword: sharedProperties.getActivePassword()
        }
        var promise = Factory.postHayGroupLink(credentialName)
        promise.then(function resolved(response) {
            if (response.data) {
                var responseData = response.data.data;
                var userId = responseData.userId;
                var locale = responseData.locale;
                var authToken = responseData.authToken;
                commonFunctions.openIframe(config.hayGroupUrl + userId + '/' + locale + '/' + authToken)
            }
        }, function rejected(response) {
            //commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        })
    }

    function pdfDetails() {
        var promise = Factory.pdfDetailsList();
        promise.then(function resolved(response) {
            $scope.original = $scope.pdfDetailsData = response.data.documentList;
            setValues();
            sortSelect();
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        })
    };
    pdfDetails();

    function setValues() {
        if ($scope.pdfDetailsData) {
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.pdfDetailsData.length;
            $scope.entryLimit = 8; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        }
    }

    function filterSort(selectValue) {
        var output = [];
        if (selectValue == 'All') {
            return $scope.original;
        }
        angular.forEach($scope.original, function (input) {
            if (input.Function == selectValue) output.push(input);
        });
        return output;
    };
    $scope.$watch(function () {
        return $scope.selectName
    }, function (newValue, oldValue) {
        $scope.pdfDetailsData = filterSort(newValue);
        setValues();
    });

    function sortSelect() {
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
                $('.selectpicker').selectpicker();
            }, 50, false);
        }
    }
    $scope.openPopForSave = function () {
        var modalInstance = $uibModal.open({
            controller: 'popUpSaveEngagmentClose'
            , templateUrl: 'partial/_ProfilePopUpSaveEngagment.html'
            , controllerAs: '$saveCtrl'
        , });
    }

    $scope.selectedDocumentId = [];
    $scope.selectedDocumentFunction = [];
    $scope.toggleSelection = function toggleSelection(selectedID, selectedFunction) {
        var idx = $scope.selectedDocumentId.indexOf(selectedID);
        var uniqueFunctionValue = $scope.selectedDocumentFunction.indexOf(selectedFunction);
        // is currently selected
        if (uniqueFunctionValue > -1) {
           // $scope.selectedDocumentFunction.splice(uniqueFunctionValue, 1);
           // sharedProperties.setprofileSelectedFunction($scope.selectedDocumentFunction)
        }
        // is newly selected
        else {
            $scope.selectedDocumentFunction.push(selectedFunction);
            sharedProperties.setprofileSelectedFunction($scope.selectedDocumentFunction)
        }


        // is currently selected
        if (idx > -1) {
            $scope.selectedDocumentId.splice(idx, 1);
            sharedProperties.setprofileSelectedDocumentID($scope.selectedDocumentId)
        }
        // is newly selected
        else {
            $scope.selectedDocumentId.push(selectedID);
            sharedProperties.setprofileSelectedDocumentID($scope.selectedDocumentId)
        }
        if (sharedProperties.getprofileSelectedDocumentID().length > 0) {
            $scope.saveButtonEnable = false;
        }
        else {
            $scope.saveButtonEnable = true;
        }
    };
    $scope.openFactivaIframe = function () {
        var url = commonFunctions.getIframeUrl('profileDesignResarchLinkFactiva');
        commonFunctions.openIframe(url)
    }
    $scope.openOneSourceIframe = function () {
        var url = commonFunctions.getIframeUrl('profileDesignResarchLinkOneSource');
        commonFunctions.openIframe(url)
    }
    $scope.openRecruiterTrendsIframe = function () {
        var url = commonFunctions.getIframeUrl('profileDesignResarchLinkRecruiterTrends');
        commonFunctions.openIframe(url)
    }
    var promise = Factory.getEngagementDetailsTableList();
    promise.then(function (response) {
        result = response.data.engagementList;
        sharedProperties.setrowCollection(result);
        $scope.engagement = result.map(function (item) {
            return item.EngagementNumber + '  ' + item.Engagement;
        });
    });
}]);
app.controller('popUpSaveEngagmentClose', ['$scope', '$uibModalInstance', 'sharedProperties', 'Factory', function ($scope, $uibModalInstance, sharedProperties, Factory) {
    $scope.selectedFunctiontoShowinPopup = sharedProperties.getprofileSelectedFunction();
    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.saveEngagment = function () {
        // console.log($scope.selectedDocumentId);
        console.log(sharedProperties.getprofileSelectedEngagementID())
            //var name = angular.element($('#engagementID')).val();
        var name = document.getElementById("engagementID").value;
        var engagementNumber = name.replace(/\D/g, '').trim();
        console.log(engagementNumber);
        console.log(sharedProperties.getprofileSelectedDocumentID())
        var data = {
            "documentId": 0
            , "engagementId": engagementNumber
            , "Documents": sharedProperties.getprofileSelectedDocumentID()
        }
        var promise = Factory.postSaveEngagement(data);
        promise.then(function resolved(response) {
                $scope.message = response.data.status;
                // $scope.responseStatus=$scope.message
                // globalDetails.userTypeID = response.data.userTypeId;
                // globalDetails.userId = response.data.userid;
                // globalDetails.userType = response.data.userType
            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            })
            // $uibModalInstance.dismiss('cancel');
    }
        }]);
app.controller('DocModalCtrl', ['$uibModalInstance', 'url', 'filename', '$scope', function ($uibModalInstance, url, filename, $scope) {
    $scope.url = url;
    $scope.fileName = filename;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])
