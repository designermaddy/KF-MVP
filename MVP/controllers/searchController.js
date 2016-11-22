app.controller('searchController', ['$scope', 'Factory', 'commonFunctions', '$sce', 'config', 'sharedProperties', '$location', function ($scope, Factory, commonFunctions, $sce, config, sharedProperties, $location) {

    $scope.start = 1;
    sharedProperties.setNewSearchData(0);
    $scope.orgID = 6;

    var data = {
        'orgId' : 6,
        'limit' : 10,
        'page'  : 1
    }

    function getData() {
        var promise = Factory.getSavedSearchesResponse(data);
        promise.then(
              function resolved(response) {
                  $scope.rowCollection = response.data;
                  $scope.start = data.page * data.limit - data.limit || 1;
                  $scope.end = data.page * data.limit;
                    //$scope.rowCollection[0].AryaStatus = "Inactive"
                  //$scope.rowCollection[1].AryaStatus = "Active"
              },
              function rejected(response) {
                  commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
              }
          )
    }
    getData();

    function setValues() {
      if($scope.rowCollection){
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.rowCollection.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
      }
    }

    $scope.prev = function () {
        if (data.page > 1) {
            data.page -= 1;
        }
        getData();
    }
    $scope.next = function () {
        data.page += 1;
        getData();
    }

    $scope.refreshResults = function() {
        getData();
    }

   $scope.newSearch = function() {
        $location.path('NewSearch');
    }
    // to load image based on the ariya status key... active green ariya or normal arya image

    $scope.ariaStatusImgLoad=function(value){
      var sourceImage = ''
         if(value == "Active"){
            sourceImage = 'Active'
         }
         if(value == "Inactive"){
            sourceImage = 'Inactive'
         }
         return sourceImage;
    }
// call API when ariya status icon is clicked - orgid is static to be passed dynamically
    $scope.onClickAryaStatusIcon = function(orgId, aryaJobId, aryaStaus, index){
      var statusOfArya = ''
      if(aryaStaus == "Active"){
          statusOfArya = "Inactive"
      }else{
          statusOfArya = "Active"
      }
      var promise = Factory.aryaStatusSelected($scope.orgID, aryaJobId, statusOfArya)


        promise.then(
              function resolved(response) {
                 console.log(response.data)
                 var imageSource = $scope.ariaStatusImgLoad(statusOfArya)
                 $scope.rowCollection[index].AryaStatus = statusOfArya
              },
              function rejected(response) {
                  commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
              }
          )
    }

    // open iframe arya candidate
    $scope.openIframe = function(aryajobID){
       var url = config.iframeUrlAriyaSavedSearch+aryajobID
       // url = url.replace("{candidateId}", candidateId);
        //url=url.replace("{jobId}",  sharedProperties.getJobId());
        userName = sharedProperties.getUserName();
        password = sharedProperties.getPassword();
        $("input[name='LoginName']").attr('value', userName);
        $("input[name='Password']").attr('value', password);
        $("input[name='ReturnUrl']").attr('value', url);
        $('#arya').attr('action', config.iframeAction);
        $('#arya').submit()
        $('#searchResultdiv').hide();
        $('#searchListCandidateDetails').hide();
        commonFunctions.openIframe(url)
    }
      $scope.initiateSearch = function(clientJobID) {
        var checked = $('input:checked');
       // var data = [];
       /* for(var i = 0; i < checked.length - 1; i++) {
            data.push(checked[i].value);
        }
        sharedProperties.setInitiateSearchData(data);*/
        var savedSearchVal = {clientJobId:clientJobID, fromSavedSearch:true}
        sharedProperties.setSavedSearchDetails(savedSearchVal)
         var redirectPath = "/InitiateSearch";
         // $("li[class='active']").removeClass('active');
        $('#searchHeader').addClass('active');
         $location.path(redirectPath);
       // console.log(data);
    }
}]);
