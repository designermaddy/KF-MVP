app.controller('jobProfileController', ['$uibModal', '$scope', 'Factory', 'commonFunctions', 'sharedProperties', '$location', '$sce', 'config', function ($uibModal, $scope, Factory, commonFunctions, sharedProperties, $location, $sce, config) {
    function jobProfileDocDetails() {
        if (sharedProperties.getRequisitionDetails()) {
            $scope.item = sharedProperties.getRequisitionDetails();
        }
        if (sharedProperties.getRequisitionDetails().Position) {
            var positionID = sharedProperties.getRequisitionDetails().Position
        }
        var promise = Factory.jobProfileDocDetailsList($scope.item.ClientId, positionID);
        promise.then(function resolved(response) {
            $scope.pdfDetailsData = response.data.requisitionDocList;
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        })
    };
    jobProfileDocDetails();

    $scope.$watch(function() {
        return $scope.indextab
    }, function(newVal, oldVal){
        if (newVal === 0){
            jobProfileDocDetails();
        }
    });

    $scope.changePdf = function (id, docType) {
        var el = $(event.target);
        var div = $(event.currentTarget);
        var input = div.find('input');
        if (input.prop('checked')) {
            input.prop('checked', false);
        }
        else {
            input.prop('checked', true);
            callPdf(id, docType);
        }
    };
    var callPdf = function (id, docType) {
        if (docType == 'E') {
            var url = config.projectUrl + '/Profile/getDocumentById/' + id
                // var url = config.projectUrl + '/Profile/getDocumentById/' + a;
        }
        else {
            var url =  config.projectUrl + '/Requisition/getRequisitionDocumentById/' + id
        }
        var promise = Factory.getPDF(url);
        promise.then(function resolved(response) {
            var file = new Blob([response.data], {
                type: 'application/pdf'
            });
            var fileURL = URL.createObjectURL(file);
            $scope.pdfContent = $sce.trustAsResourceUrl(fileURL);
            $scope.url = $scope.pdfContent
        })
    }
    $scope.$watch(function () {
        return $scope.url
    }, function (newValue, oldValue) {
        $scope.url = newValue;
        //setValues();
    });
    $scope.initiateSearch = function () {
        var checked = $('input:checked');
        var data = [];
        var dataPost = {};
        for (var i = 0; i < checked.length - 1; i++) {
            //sdata.push(checked[i].value.split(','));
            var splitToArray = checked[i].value.split(',');
            // cart.push({element: element});
            data.push({
                "id": parseInt(splitToArray[0])
                , "docType": splitToArray[1].toString()
            });
        }
        dataPost.requisitionResponseList = data
        console.log(dataPost)
        sharedProperties.setInitiateSearchData(dataPost);
        var redirectPath = "/InitiateSearch";
        $("li[class='active']").removeClass('active');
        $('#searchHeader').addClass('active');
        $location.path(redirectPath);
        // console.log(data);
    }
}])
