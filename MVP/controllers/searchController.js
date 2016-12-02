app.controller('searchController', ['$scope', 'Factory', 'commonFunctions', '$sce', 'config', 'sharedProperties', '$location', function ($scope, Factory, commonFunctions, $sce, config, sharedProperties, $location) {

    $scope.start = 1;
    sharedProperties.setNewSearchData(0);


    $scope.orgID = 6;

    var data = {
        'orgId' : 6,
        'limit' : 10,
        'page'  : 0
    }

    function getData() {
        var promise = Factory.getSavedSearchesResponse(data);
        promise.then(
              function resolved(response) {
                  $scope.rowCollection = response.data;
                  $scope.start = data.page * data.limit - data.limit || 1;

                  if(data.page == 0){
                      $scope.end = 10;
                      data.page = 1;
                      //$scope.end = data.page * data.limit;
                  }else{
                      $scope.end = data.page * data.limit
                  }
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
        $scope.ReturnUrl=url;
        $scope.userName = sharedProperties.getUserName();
        $scope.password = sharedProperties.getPassword();
        $scope.action = config.iframeAction;
       // var url = config.projectUrl + '/Profile/getDocumentById/' + url;
         /* var promise = Factory.getPDF(url);
        promise.then(
          function resolved(response) {
               var file = new Blob([response.data], { type: 'application/pdf' });
             var fileURL = URL.createObjectURL(file);
             $scope.pdfContent = $sce.trustAsResourceUrl(fileURL);
              $scope.fileName = filename;
               var modalInstance = $uibModal.open({
            animation: true
            , templateUrl: 'modalAryaCount.html'
            , controller: 'modalAryaController'
            , size: 'lg'
            , resolve: {
                url: function () {
                    return  $scope.ReturnUrl;
                },
                 userName: function () {
                    return   $scope.userName;
                },
                password: function () {
                    return   $scope.password;
                },
                ReturnUrl: function () {
                    return   $scope.ReturnUrl;
                },
                 action: function () {
                    return   $scope.action;
                }


            }
        });
          },
              function rejected(response) {
              commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
          }
      )*/


        // var url = config.iframeUrl;
       // url = url.replace("{candidateId}", candidateId);
       // url=url.replace("{jobId}",  sharedProperties.getJobId());
       /* userName = sharedProperties.getUserName();
        password = sharedProperties.getPassword();
        $("input[name='LoginName']").attr('value', userName);
        $("input[name='Password']").attr('value', password);
        $("input[name='ReturnUrl']").attr('value', url);
        $('#arya').attr('action', config.iframeAction);
        $('#arya').submit()*/
      //  $('#searchResultdiv').hide();
     /*   $('#searchListCandidateDetails').show();*/

     // commonFunctions.openIframeAriyaCount($scope.action,  $scope.userName,  $scope.password,  $scope.ReturnUrl)
         commonFunctions.openIframe(url)
       // url = url.replace("{candidateId}", candidateId);
       /* //url=url.replace("{jobId}",  sharedProperties.getJobId());
        userName = sharedProperties.getUserName();
        $scope.userName = sharedProperties.getUserName();
        password = sharedProperties.getPassword();
        $("input[name='LoginName']").attr('value', userName);
        $("input[name='Password']").attr('value', password);
        $("input[name='ReturnUrl']").attr('value', url);
        $('#arya').attr('action', config.iframeAction);
        $('#arya').submit()*/
        //$('#searchResultdiv').hide();
        //$('#searchListCandidateDetails').hide();

    }
      $scope.initiateSearch = function(clientJobID) {
        var checked = $('input:checked');
          var dataPost=undefined;
       // var data = [];
       /* for(var i = 0; i < checked.length - 1; i++) {
            data.push(checked[i].value);
        }
        sharedProperties.setInitiateSearchData(data);*/
          sharedProperties.setInitiateSearchData(dataPost);
        var savedSearchVal = {clientJobId:clientJobID, fromSavedSearch:true}
        sharedProperties.setSavedSearchDetails(savedSearchVal)
         var redirectPath = "/InitiateSearch";
         // $("li[class='active']").removeClass('active');
        $('#searchHeader').addClass('active');
         $location.path(redirectPath);
       // console.log(data);
    }
}]);

/*
app.controller('ModalCancel', ['$uibModalInstance', 'url', '$scope', '$sce','sharedProperties','config', function ($uibModalInstance, url, $scope, $sce, sharedProperties, config) {
   var url = config.iframeUrlAriyaSavedSearch+35164
      userName = sharedProperties.getUserName();
        password = sharedProperties.getPassword();
      $scope.userName = sharedProperties.getUserName();
     $scope.password = sharedProperties.getPassword();
    $scope.action = config.iframeAction;
    $scope.ReturnUrl =
        $("input[name='LoginName']").attr('value', userName);
        $("input[name='Password']").attr('value', password);
        $("input[name='ReturnUrl']").attr('value', url);
        $('#arya').attr('action', config.iframeAction);
        $('#arya').submit()

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])
*/
app.controller('modalAryaController', ['$uibModalInstance', 'action', 'userName', 'password', 'ReturnUrl', '$scope', function ($uibModalInstance, action, userName, password, ReturnUrl, $scope) {
    $scope.action = action;
    $scope.userName = userName;
    $scope.password = password;
    $scope.ReturnUrl = ReturnUrl
     $('#aryaCount').submit()
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])
