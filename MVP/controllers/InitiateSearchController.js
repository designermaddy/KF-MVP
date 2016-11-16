(function() {
    'use strict';

    app.controller('initiateSearchController', ['Factory', '$location', 'sharedProperties', 'commonFunctions', initiateSearchController]);

    /* @ngInject */
    function initiateSearchController(Factory, $location, sharedProperties, commonFunctions) {

        /*jshint validthis: true */
        var vm = this;

         var getreq = function(a) {
            var requisitionNumber = sharedProperties.getRequisitionDetails().ReqNumber
            var promise = Factory.getAryaJobId(requisitionNumber);

            if (requisitionNumber) {
                promise.then(
                    function resolved(response) {
                        vm.data = response.data;
                        vm.data.ReqNumber = requisitionNumber;
                        if(a == 1){
                           vm.data.Description = vm.jobDesc.Description;
                           vm.data.SearchString = vm.jobDesc.SearchString;
                        }
                        disableInput();
                    },
                    function rejected(response) {
                        commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
                });
            }
        }

        var data = sharedProperties.getInitiateSearchData();
        if (data.length > 0) {
            var promise = Factory.getJobDescription(data);
            promise.then(
                function resolved(response) {
                    vm.jobDesc = response.data;
                    getreq(1);
                },
                function rejected(response) {
                    commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            });
        }else {
            getreq(0);
        }

        function disableInput() {
            var inputs = $('input');
            for (var i = 0; i < 7; i++ ){
                inputs[i].disabled = true;
            }
        }

        function getCriteria() {
            // TODO: This will likely need a service, to populate the criteria
            return new Criteria();
        }



        function Criteria() {
            // TODO: Get rid of the hard coded values; Provided here just for initial demo purposes
            var jobId = sharedProperties.getClientJobID()
            this.ClientJobID = jobId; //"562139";
            this.AryaOrgID = 1;
            this.ClientOrgID = 1;
            this.apikey = "Z/djRosu9qHKtR4+h0y3ET0wwtOautvomeSPp6U5ENE=";
            this.JobTitle = "Sales1 Account Executive";
            //this.JobTitle = vm.criteria.JobTitle
            this.JobTitle_Synonyms = null;
            this.Description = "<br />\n<p><strong><u>Job Summary</u></strong></p>\n<p>The Account Executive is responsible for achieving his/her assigned sales plan..</p>";
            this.job_start_date = "10/03/2016";
            this.job_end_date = null;
            this.Location = "CHICAGO, IL";
            //this.Location = vm.criteria.Location
            this.ZipCode = "60638";
            //this.ZipCode = vm.criteria.ZipCode
            this.Country = null;
            this.MinExp = 0.0;
            this.MaxExp = 0.0;
            this.NoOfPositions = 0;
            this.job_status = "Internal Job Posted - Sourcing";
            this.Recruiter_Name = "Gaurav Sharma, Nihkil Amudha";
            this.Recruiter_Email = "gsharma@leoforce.com,nikhil.amudha@leoforce.com";
            this.job_client = "BUS";
            this.SearchString = null;
            this.PostingDate = "2016-10-05 02:01:08";
            this.job_category = null;
            this.Job_apply_url = null;
        }

        vm.save = function save () {
             vm.criteria = getCriteria(sharedProperties);
            var promise = Factory.saveNewSearch(vm.criteria);
            promise.then(
                function resolved(response) {
                    //sharedProperties.setJobId(response.data.JobID);
                    console.log(response.data);
                    var redirectPath = "RequisitionDetails/3";
                    $location.path(redirectPath);
                },
                function rejected(response) {
                    commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            })

        };

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
