(function () {
    'use strict';
    app.controller('initiateSearchController', ['Factory', '$location', 'sharedProperties', 'commonFunctions', '$timeout', '$scope', '$rootScope', initiateSearchController]);
    /* @ngInject */
    function initiateSearchController(Factory, $location, sharedProperties, commonFunctions, $timeout, $scope, $rootScope) {
        /*jshint validthis: true */
        $scope.milesOptions = ["10", "25", "35", "50", "75", "100", "Auto Expand"];
        var vm = this;
        var taglist = {};
        vm.editClick = true;
        vm.tags = '';
        vm.type = 'fromSaveSearch';
        vm.alltags = ['hii'];
        var getAllTags = function () {
            var p = Factory.getAryaIndustriesList();
            p.then(function resolved(response) {
                var d = response.data.Industry;
                for (var i = 0, j = []; i < d.length; i++) {
                    j.push(d[i].IndustryName)
                }
                vm.alltags = j;
            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            })
        }
        getAllTags();
        vm.editClickJobProfile = function () {
            if (vm.editClick) {
                vm.editClick = false;
            }
        }
        $timeout(function () {
            $('#searchHeader').addClass('active');
        }, 100);
        var getCountries = function () {
            var promise = Factory.getCountries();
            promise.then(function resolved(response) {
                var countries = response.data.Country;
                vm.countryList = countries.map(function (item) {
                    return item;
                });
            }, function rejected(response) {})
        }
        getCountries();
        var getreq = function (a) {
            var requisitionNumber = sharedProperties.getRequisitionDetails().ReqNumber
            var savedSearchDetails = sharedProperties.getSavedSearchDetails();
            if (savedSearchDetails.fromSavedSearch == true) {
                var requisitionNumber = savedSearchDetails.clientJobId;
                sharedProperties.setClientJobID(requisitionNumber)
                sharedProperties.setSavedSearchDetails({
                    clientJobId: requisitionNumber
                    , fromSavedSearch: false
                });
                // savedSearchDetails.fromSavedSearch = false;
            }
            $('#searchHeader').addClass('active');
            $timeout(function () {
                $('.selectpicker').selectpicker('refresh');
            }, 5, false);
            var promise = Factory.getAryaJobId(requisitionNumber);
            if (requisitionNumber) {
                promise.then(function resolved(response) {
                    vm.data = response.data;
                    var jobStatus = response.data.job_status;
                    if (jobStatus != 'Open' && jobStatus != 'Pending' && jobStatus != 'Close') {
                        vm.data.job_status = "Please Select";
                    }
                    vm.data.ReqNumber = requisitionNumber;
                    vm.tags = vm.data.industries ? vm.data.industries : '';
                    if ((sharedProperties.getWhereFromInitiateSearch() == "RequisitionDetails/0") || (sharedProperties.getWhereFromInitiateSearch() == "RequisitionDetails/3")) {
                        var change = sharedProperties.getRequisitionDetails();
                        vm.data.JobTitle = vm.data.searchName = change.JobTitle;
                        vm.data.job_client = change.Client;
                        vm.data.ReqNumber = change.ReqNumber;
                    }
                    if (a == 1) {
                        vm.data.Description = vm.jobDesc.Description;
                        vm.data.SearchString = vm.jobDesc.SearchString;
                    }
                    if (vm.data.JobTitle) {
                        disableInput();
                    }
                    //
                }, function rejected(response) {
                    commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
                });
            }
        }
        var data = sharedProperties.getInitiateSearchData();
        if (data.requisitionResponseList && data.requisitionResponseList.length > 0) {
            var promise = Factory.getJobDescription(data);
            promise.then(function resolved(response) {
                vm.jobDesc = response.data;
                getreq(1);
            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            });
        }
        else {
            getreq(0);
        }

        function disableInput() {
            var i = 0;
            if (vm.data.ReqNumber.indexOf("MANUAL") != -1) i = 3;
            var inputs = $('input');
            for (; i < 3; i++) {
                inputs[i].disabled = true;
            }
        }
        $rootScope.$on('tagChange', function (event, val) {
            taglist = val;
        })

        function getCriteria() {
            // TODO: This will likely need a service, to populate the criteria
            return new Criteria();
        }

        function Criteria() {
            // TODO: Get rid of the hard coded values; Provided here just for initial demo purposes
            var jobId = sharedProperties.getClientJobID();
            this.ClientJobID = jobId; //"562139";
            this.AryaOrgID = 6;
            this.ClientOrgID = 6;
            this.apikey = "Z/djRosu9qHKtR4+h0y3ET0wwtOautvomeSPp6U5ENE=";
            //this.JobTitle = "Sales1 Account Executive";
            this.JobTitle = vm.data.JobTitle
            this.JobTitle_Synonyms = vm.data.JobTitle_Synonyms;
            this.Description = vm.data.Description;
            this.job_start_date = "10/03/2016";
            this.job_end_date = null;
            this.Location = vm.data.Location;
            //this.Location = vm.criteria.Location
            this.ZipCode = vm.data.ZipCode;
            //this.ZipCode = vm.criteria.ZipCode
            this.Country = vm.data.Country.CountryName;
            this.MinExp = 0.0;
            this.MaxExp = 0.0;
            this.NoOfPositions = vm.data.NoOfPositions;
            this.job_status = vm.data.job_status;
            this.Recruiter_Name = sharedProperties.getEmail();
            this.Recruiter_Email = sharedProperties.getUserName()
            this.job_client = vm.data.job_client; //"BUS";
            this.SearchString = vm.data.SearchString;
            this.PostingDate = vm.data.PostingDate;
            this.job_category = null;
            this.Job_apply_url = null;
            this.Miles = vm.data.Miles;
        }
        vm.save = function save() {
            try {
                //Validation
                if (vm.data.job_status == "Please Select") {
                    throw "Your search cannot be created without selecting a 'Status' of Pending, Open or Closed";
                }
                var data = [];
                sharedProperties.setInitiateSearchData(data);
                var savedSearchDetails = sharedProperties.getSavedSearchDetails();
                vm.criteria = getCriteria();
                /*if (vm.criteria.Miles) {
                    delete vm.criteria.Miles;
                }*/
                if (vm.criteria.TotalSourcedCount) {
                    delete vm.criteria.TotalSourcedCount;
                }
                vm.criteria.Industries = taglist.tags;
                var promise = Factory.saveNewSearch(vm.criteria);
                promise.then(function resolved(response) {
                    //sharedProperties.setJobId(response.data.JobID);
                    console.log(response.data);
                    if (savedSearchDetails.fromSavedSearch) {
                        sharedProperties.getSavedSearchDetails().fromSavedSearch = false;
                        var redirectPath = "Search"
                    }
                    else if (sharedProperties.getWhereFromInitiateSearch() == 'Search') {
                        var redirectPath = "Search";
                    }
                    else {
                        var redirectPath = "RequisitionDetails/3";
                    }
                    $location.path(redirectPath);
                }, function rejected(response) {
                    commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
                })
            }
            catch (errMsg) {
                commonFunctions.error(errMsg);
            }
        };
        vm.cancelButton = function () {
            var data={};
            sharedProperties.setInitiateSearchData(data)
            var redirect = sharedProperties.getWhereFromInitiateSearch();
            $location.path(redirect);
        }
        vm.priceSlider1 = {
            value: 5
            , options: {
                ceil: 5
                , floor: 0
                , showTicksValues: true
            }
        };
        vm.priceSlider2 = {
            value: 5
            , options: {
                ceil: 5
                , floor: 0
                , showTicksValues: true
            }
        };
        vm.priceSlider3 = {
            value: 5
            , options: {
                ceil: 5
                , floor: 0
                , showTicksValues: true
            }
        };
        vm.priceSlider4 = {
            value: 5
            , options: {
                ceil: 5
                , floor: 0
                , showTicksValues: true
            }
        };
        vm.priceSlider5 = {
            value: 5
            , options: {
                ceil: 5
                , floor: 0
                , showTicksValues: true
            }
        };
        vm.priceSlider6 = {
            value: 5
            , options: {
                ceil: 5
                , floor: 0
                , showTicksValues: true
            }
        };
        vm.priceSlider8 = {
            value: 5
            , options: {
                ceil: 5
                , floor: 0
                , showTicksValues: true
            }
        };
        vm.priceSlider7 = {
            minValue: 1
            , maxValue: 8
            , options: {
                ceil: 10
                , floor: 0
                , showTicksValues: false
            }
        };
        vm.refreshSlider = function () {
            $timeout(function () {
                $scope.$broadcast('rzSliderForceRender');
            });
        };
    }
})();
