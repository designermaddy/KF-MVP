app.controller('requisitionController', ['$scope', 'Factory', 'sharedProperties', '$http', 'commonFunctions', 'config', function ($scope, Factory, sharedProperties, $http, commonFunctions, config) {
    $scope.search = {};
    $scope.date = {};
     $scope.ch = {
        'open': false
        , 'closedFilled': false
        , 'closed': false
         ,'onhold':false
     }
commonFunctions.getSearcherJson();
    function getData() {
        var promise = Factory.getRequisitionTableList();
        promise.then(function resolved(response) {
            var collection = response.data.requisitions.concat(config.searcherReq);
            for(var i in collection)
            {
                 if(collection[i].Data){
                     if(collection[i].Data.data){
                        if(collection[i].Data.data.length>0){
                            if(isNaN(parseInt(collection[i].Data.data[0].open_days))){
                                collection[i].Data.data[0].open_days = 0;

                            }else{
                                collection[i].Data.data[0].open_days =  parseInt(collection[i].Data.data[0].open_days);
                                }
                        }
                   else{
                        collection[i].Data['data']=[];
                        collection[i].Data.data.push({
                        open_days:parseInt(0)
                        });

                        }
                     }
                }

                 //var name = data[i].name;
            }
                        $scope.rowCollection = collection;
                //response.data.requisitions.concat(config.searcherReq);
            setValues();
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        });
    }
    getData();

    function setValues() {
        if ($scope.rowCollection) {
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.rowCollection.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        }
    }
    $scope.displayVal=function(val){
        var value = parseInt(val);
        return value;
    }
    // call the API for selectedengagement per id
    $scope.onSelectEngagementPerID = function (engagementID, engagementType) {
        var engDtlsSelected = {};
        engDtlsSelected.id = engagementID;
        engDtlsSelected.thirdParty = engagementType;
        sharedProperties.setengagementPerIDSelected(engagementID);
        sharedProperties.setEngagmentSelectedObject(engDtlsSelected);
    }
    $scope.openTalentLinkIframe = function () {
         commonFunctions.GAEventHandler(sharedProperties.getGAEventData().EditRequisition);
        var url = commonFunctions.getIframeUrl('addNewRequisitionTalentLink');
        commonFunctions.openIframe(url);
    }
    $scope.openCrmIframe = function () {
        commonFunctions.GAEventHandler(sharedProperties.getGAEventData().EditRequisition);
        var url = commonFunctions.getIframeUrl('addNewRequisitionCRM');
        commonFunctions.openIframe(url);
    }
     $scope.changeActivelink = function(row, htmlPath) {
        commonFunctions.changeActivelink(row, htmlPath);
    }

     $scope.addNewReuqisitionClick = function (){
          commonFunctions.GAEventHandler(sharedProperties.getGAEventData().AddNewRequisition);
     }
	  /**Refresh Requisitions**/
	 $scope.refreshRequisitions = function() {
       getData();
    }

}]);
