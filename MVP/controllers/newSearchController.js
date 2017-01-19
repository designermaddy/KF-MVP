    app.controller('newSearchController', ['$scope', 'Factory', '$location', 'sharedProperties', 'commonFunctions', '$timeout', 'config', '$sce', '$uibModal','$filter', function ($scope, Factory, $location, sharedProperties, commonFunctions, $timeout, config, $sce, $uibModal, $filter) {
        $scope.data = {};
        $scope.vm = {};
        $scope.freeSearch = {};
        $scope.freeSearch.radioModel = true;
        $scope.milesOptions=["10", "25", "35", "50", "75", "100", "Auto Expand"];
        $scope.freeSearch.Miles = "Auto Expand";
        $scope.data.Miles = "Auto Expand";
        var redirectPath = "Search";
        var result;
        var reqValue = 0;

        $timeout(function(){$('#searchHeader').addClass('active')},100);
        $timeout(function () {
                $('.selectMiles').selectpicker('refresh');
            }, 50, false);

        function getReq() {
            var promise = Factory.getRequisitionTableList();
            promise.then(function (response) {
                result = response.data.requisitions.concat(config.searcherReq);
				$scope.talentReq = result;
                $scope.requisition = result.map(function (item) {
                    return item.ReqNumber + ' ' + item.JobTitle;
                });
            });
        }
        if (sharedProperties.getNewSearchData() !== 0) {
            reqValue = sharedProperties.getNewSearchData();
            var reqNum = reqValue[0];
            $scope.vm.name = reqNum + ' ' + reqValue[1];
            getArya(reqNum, 1);
            redirectPath = "RequisitionDetails/3"
            sharedProperties.setNewSearchData(0);
        }
        else {
            getReq();
        }
        $scope.fillData = function ($item, $model, $label, $event) {
            var reqNum = $item.split(' ')[0];
			$scope.selectedReq =  $filter('filter')($scope.talentReq, {ReqNumber:reqNum})[0];
            getArya(reqNum);
        }
        $scope.cancelButton = function() {
            $location.path(redirectPath);
        }

        function getArya(reqNum, i) {
            var i = i || 0;
            var promise = Factory.getAryaJobId(reqNum);
            promise.then(function (response) {
                $scope.data = response.data;
                var jobStatus = response.data.job_status;
				$scope.data.job_client = $scope.selectedReq.Client;
				$scope.data.JobTitle = $scope.selectedReq.JobTitle;

                    if(jobStatus != 'Open' && jobStatus != 'Pending' && jobStatus != 'Close'){
                        $scope.data.job_status = "Please Select";
                    }
                if($scope.milesOptions.indexOf(response.data.Miles) < 0){
                      $scope.data.Miles = "Auto Expand";
                }
                disableInput(i);
                console.log($scope.data.Miles);
            });
        }

        function disableInput(i) {
            var inputs = $('input');
            var i = i ? 0 : 1;
            for (i; i < 7; i++) {
                inputs[i].disabled = true;
            }
        }
        $scope.save = function (radioModel) {
            try{
                //Validation
                if($scope.data.job_status == "Please Select") {
                    throw "Your search cannot be created without selecting a 'Status' of Pending, Open or Closed";
                }

                if (radioModel) {
                    if (reqValue !== 0) {
                        if (reqValue[0] + ' ' + reqValue[1] == $scope.vm.name) {
                            callBackend();
                        }
                        else {
                            commonFunctions.error('Please enter valid Requistion value');
                        }
                    }
                    else if (checkReq()) {
                        callBackend();
                    }
                    else {
                        commonFunctions.error('Please select a valid Requisition Name or ID');
                    }
                }
                else {
                    callBackend(1);
                }
             }catch(errMsg) {
                commonFunctions.error(errMsg);
            }
        }

        function callBackend(radioModel) {
            var data = $scope.data;
            if (radioModel) {
                data = createFreeSearchData();
            }

            /*if(data.Miles){
                 delete data.Miles;
            }*/
            if(data.TotalSourcedCount){
                delete data.TotalSourcedCount;
            }
            data.ClientOrgID= 6;
           /* data.Recruiter_Name  = "Wes Frederick"
                , "Recruiter_Email";
            data.Recruiter_Email = "Wes.Frederick@KornFerry.com";*/
              data.PostingDate = getTimeStamp();
             console.log(data);
            var promise = Factory.saveNewSearch(data);

            promise.then(function (response) {
                var code = response.data.Code;
                if (code == 0) {
                    $location.path(redirectPath);
                }
                else {
                    commonFunctions.error('Error : ' + response.data.Message);
                }
            });
        }
// most of the items are static should be dynamic - karthik
        function createFreeSearchData() {
            var data = {
                "ClientJobID": ""
                , "AryaOrgID": 6
                , "ClientOrgID": 6
                , "apikey": "Z/djRosu9qHKtR4+h0y3ET0wwtOautvomeSPp6U5ENE="
                , "JobTitle": ""
                , "JobTitle_Synonyms": null
                , "Description": ""
                , "job_start_date": ""
                , "job_end_date": null
                , "Location": $scope.freeSearch.Location
                , "ZipCode": ""
                , "Country": null
                , "Miles" : $scope.freeSearch.Miles
                , "MinExp": 0.0
                , "MaxExp": 0.0
                , "NoOfPositions": 0
                , "job_status": $scope.freeSearch.job_status
                , "Recruiter_Name":  sharedProperties.getEmail()
                , "Recruiter_Email": sharedProperties.getUserName() //"gsharma@leoforce.com,nikhil.amudha@leoforce.com"
               // , "Recruiter_Name": "Gaurav Sharma"
                //, "Recruiter_Email": "gsharma@leoforce.com"
                , "job_client": ""
                , "SearchString": null
                , "PostingDate": ""
                , "job_category": null
                , "Job_apply_url": null,

            }

            for (var key in $scope.freeSearch) {
                if (data[key] !== undefined) data[key] = $scope.freeSearch[key];
            }
            data.Country = $scope.freeSearch.country.Country;
            data.ClientJobID = "MANUAL - " +$scope.freeSearch.JobTitle;
            return data;
        }

        function checkReq() {
            var val = $scope.vm.name;
            var found = false;
            if (val) {
                angular.forEach(result, function (value, key) {
                    if (value.ReqNumber + ' ' + value.JobTitle == val) {
                        found = true;
                    }
                })
            }
            return found;
        }

        function getTimeStamp() {
            var now = new Date();
            return (now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate()) + " " + now.getHours() + ':' + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now.getSeconds()) : (now.getSeconds())));
        }
        $scope.vm = {
                name: reqValue.length > 0 ? reqValue[0] + ' ' + reqValue[1] : ''
                , priceSlider1: {
                    value: 5
                    , options: {
                        ceil: 5
                        , floor: 0
                        , showTicksValues: true
                    }
                }
                , priceSlider2: {
                    value: 5
                    , options: {
                        ceil: 5
                        , floor: 0
                        , showTicksValues: true
                    }
                }
                , priceSlider3: {
                    value: 5
                    , options: {
                        ceil: 5
                        , floor: 0
                        , showTicksValues: true
                    }
                }
                , priceSlider4: {
                    value: 5
                    , options: {
                        ceil: 5
                        , floor: 0
                        , showTicksValues: true
                    }
                }
                , priceSlider5: {
                    value: 5
                    , options: {
                        ceil: 5
                        , floor: 0
                        , showTicksValues: true
                    }
                }
                , priceSlider6: {
                    value: 5
                    , options: {
                        ceil: 5
                        , floor: 0
                        , showTicksValues: true
                    }
                }
                , priceSlider8: {
                    value: 5
                    , options: {
                        ceil: 5
                        , floor: 0
                        , showTicksValues: true
                    }
                }
                , priceSlider7: {
                    minValue: 1
                    , maxValue: 8
                    , options: {
                        ceil: 10
                        , floor: 0
                        , showTicksValues: false
                    }
                }
                , refreshSlider: function () {
                    $timeout(function () {
                        $scope.$broadcast('rzSliderForceRender');
                    });
                }
            }
            /** -------- Code for Free Search ----------------- **/
        function pdfDetails() {
            var promise = Factory.pdfDetailsList();
            promise.then(function resolved(response) {
                $scope.original = $scope.pdfDetailsData = response.data.documentList;
                sortSelect();
                $scope.updateSelectDocument();
            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            })
        };
        pdfDetails();

        function sortSelect() {
            var data = $scope.pdfDetailsData;
            var obj = {};
            obj['All Functions'] = $scope.pdfDetailsData;
            var selectFunctionArray = [];
            if (data) {
                angular.forEach(data, function (item) {
                    var uniqueValue = item.Function;
                    var data = {
                        'DocumentNumber': item.DocumentNumber
                        , 'FileName': item.FileName
                    };
                    if (!obj[uniqueValue]) {
                        obj[uniqueValue] = [data]
                    }
                    else {
                        obj[uniqueValue].push(data);
                    }
                })
                for (var key in obj) {
                    selectFunctionArray.push(key + ' (' + obj[key].length + ')')
                }
                $scope.docObj = obj;
                $scope.options = selectFunctionArray;
                $scope.profileValue = $scope.options[0];
            }
        }
        $scope.updateSelectDocument = function (value) {
            var value = value || 'All Functions';
            $scope.pdfDoc = [];
            for (var key in $scope.docObj) {
                if (key == value.replace(/[^a-z\s]/gi, "").trim()) {
                    $scope.pdfDoc = $scope.docObj[key].slice(0);
                }
            }
            $timeout(function () {
                $('.selectpicker').selectpicker('refresh');
            }, 5, false);
        }
        $scope.updateViewProfile = function (filename) {
            if (filename) {
                $scope.pdfValues = [filename.DocumentNumber, filename.FileName];
                var data = {'requisitionResponseList' : [{
                    'docType' : '',
                    id : filename.DocumentNumber
                }]}
                var promise = Factory.getJobDescription(data);
                promise.then(function resolved(response) {
                    $scope.freeSearch.SearchString = response.data.SearchString;
                    $scope.freeSearch.Description = response.data.Description;
                }, function error(response){
                    commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
                })
            }
            else {
                $scope.pdfValues = [];
                $scope.freeSearch.SearchString = "";
                $scope.freeSearch.Description = "";
            }
        }
        $scope.showPdf = function () {
                if ($scope.pdfValues.length) {
                    $scope.openPdf($scope.pdfValues[0], $scope.pdfValues[1]);
                }
            }
            //TODO : duplicat function. Need to make a common one.
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
            // This function gets the country list from the countries.json
        var getCountries = function () {
            var promise = Factory.getCountries();
            promise.then(function resolved(response) {
                var countries = response.data.Country;
                $scope.freeSearch.countries = countries.map(function (item) {
                    return item;
                });
            }, function rejected(response) {})
        }
        getCountries();
    }]);
