app.factory('Factory', ['$http', 'config', '$cookies', function ($http, config, $cookies) {
    var dataFactory = {};
    var urlAPI = config.projectUrl;
    var urlHayGroupAction = config.hayGroupAction;
    dataFactory.getAgingRequisitionList = function () {
        // console.log(payRolNumber)
        //return $http.get('json/Requisition.json');
        //psyroll will be available while scan the passport
        // if (payRolNumber) {
        //return $http.get('http://172.25.148.147:8080/RD-WebApp/Requisition/getRequisition');
        //return $http.get('http://recruiter-recruite-beyv5ne58xs5g-1681892743.us-east-1.elb.amazonaws.com/RD-WebApp/Requisition/getRequisition');
        //return $http.get('json/requisitionList.json');
        //return $http.get(urlAPI + '/Requisition/getAgingPositionsById');
        return $http.get('json/AgingRequisitionsAcme.json');
        //}
    };
    dataFactory.getRequisitionTableList = function () {
        // console.log(payRolNumber)
        //return $http.get('json/Requisition.json');
        //psyroll will be available while scan the passport
        // if (payRolNumber) {
        //return $http.get('http://172.25.148.147:8080/RD-WebApp/Requisition/getRequisition');
        //return $http.get('http://recruiter-recruite-beyv5ne58xs5g-1681892743.us-east-1.elb.amazonaws.com/RD-WebApp/Requisition/getRequisition');
        //return $http.get('json/requisitionList.json');
        //return $http.get(urlAPI + '/Requisition/getAllPositionsById');
        //return $http.get('json/AllRequisitions.json');
        return $http.get('json/allRequisitionswithAcme.json');
        //}
    };
    dataFactory.getChart = function (graphName, selectedBtn, companySelected) {
        //  return $http.get(urlAPI + '/dashboard/graphs/' + graphName);
        data = {
            "companyName": "LambWeston"
            , "graphName": graphName
            , "graphType": selectedBtn
            , "quater": ""
            , "quaterYear": ""
            , "year": ""
        }
        return $http({
            method: 'POST'
            , url: (urlAPI + '/dashboard/graphDetails')
            , data: data
        });
        // return $http.get('json/requisitionGoal.json')
    };
    dataFactory.getcandidatePipelineData = function (graphName, selectedBtn, companySelected) {
        // return $http.get(urlAPI + '/dashboard/graphs/' + graphName);
        /*    data = {
              "companyName":"LambWeston",
              "graphName":"CandidatePipeline",
              "graphType":"Company",
              "quater":"",
              "quaterYear":"",
              "year":""
            }

         return $http({
                method: 'POST',
                url: (urlAPI + '/dashboard/graphDetails'),
                data: data

            });*/
        return $http.get('json/getcandidatePipelineData.json');
        //  http://localhost:8080/RD-WebApp/dashboard/graphs/CandidatePipeline
    }
    dataFactory.getcandidateSource = function (graphName, selectedBtn, companySelected) {
        // return $http.get(urlAPI + '/dashboard/graphs/' + graphName);
        /*    data = {
              "companyName":"LambWeston",
              "graphName":"CandidatePipeline",
              "graphType":"Company",
              "quater":"",
              "quaterYear":"",
              "year":""
            }

         return $http({
                method: 'POST',
                url: (urlAPI + '/dashboard/graphDetails'),
                data: data

            });*/
        return $http.get('json/candidateSource.json');
        //  http://localhost:8080/RD-WebApp/dashboard/graphs/CandidatePipeline
    }
    dataFactory.getRequisitionStatusData = function (graphName, selectedBtn, companySelected) {
        // return $http.get(urlAPI + '/dashboard/graphs/' + graphName);
        /*    data = {
              "companyName":"LambWeston",
              "graphName":"CandidatePipeline",
              "graphType":"Company",
              "quater":"",
              "quaterYear":"",
              "year":""
            }

         return $http({
                method: 'POST',
                url: (urlAPI + '/dashboard/graphDetails'),
                data: data

            });*/
        return $http.get('json/getRequisitonStatus.json');
        //  http://localhost:8080/RD-WebApp/dashboard/graphs/CandidatePipeline
    }
    dataFactory.getCandidateHistoryData = function (graphName, selectedBtn, companySelected) {
        // return $http.get(urlAPI + '/dashboard/graphs/' + graphName);
        /*    data = {
              "companyName":"LambWeston",
              "graphName":"CandidatePipeline",
              "graphType":"Company",
              "quater":"",
              "quaterYear":"",
              "year":""
            }

         return $http({
                method: 'POST',
                url: (urlAPI + '/dashboard/graphDetails'),
                data: data

            });*/
        return $http.get('json/candidateHistory.json');
        //  http://localhost:8080/RD-WebApp/dashboard/graphs/CandidatePipeline
    }
    dataFactory.getRequisitionHistoryData = function (graphName, selectedBtn, companySelected) {
            // return $http.get(urlAPI + '/dashboard/graphs/' + graphName);
            /*    data = {
              "companyName":"LambWeston",
              "graphName":"CandidatePipeline",
              "graphType":"Company",
              "quater":"",
              "quaterYear":"",
              "year":""
            }

         return $http({
                method: 'POST',
                url: (urlAPI + '/dashboard/graphDetails'),
                data: data

            });*/
            return $http.get('json/requisitionHistory.json');
            //  http://localhost:8080/RD-WebApp/dashboard/graphs/CandidatePipeline
        }
        // for engagements
    dataFactory.getEngagementDetailsTableList = function () {
        return $http.get(urlAPI + '/engagement/allEngagements');
    }
    dataFactory.getEngagementOther = function () {
        //return $http.get('json/engagementDetails.json')
    }
    dataFactory.getEngagementOverviewStatus = function () {
        return $http.get('json/engagementStatusdonut.json');
    }
    dataFactory.getEngagementOverviewIndustry = function () {
        return $http.get('json/engagementIndustrydonut.json');
    }
    dataFactory.getrequisitionCandidateTableList = function () {
        return $http.get('json/candidatelist.json');
    }
    dataFactory.postrequisitionApplicationList = function (data) {
        //return $http.get(urlAPI+'/Requisition/getPositionByRequisition');
        /*   return $http({
               method: 'POST',
               url: urlAPI + '/Requisition/getPositionByRequisition',
               data: data
           });*/
        return $http.get(urlAPI + '/Requisition/getApplicants/' + data)
            // return $http.get('json/applicantList.json');
            //  https://api.recruiterdesktop.kf4d-dev.com//RD-WebApp/Requisition/getPositionByRequisition
    }
    dataFactory.getrequisitionCandidateList = function (positionID) {
        //return $http.get('json/requisitionCandidateList.json');
        //  positionID = 9343;
        return $http.get(urlAPI + '/Candidate/allCandidataList/' + positionID);
    }
    dataFactory.pdfDetailsList = function () {
        return $http.get(urlAPI + '/Profile/getAllDocuments')
    }
    dataFactory.getRequisitionSearchResults = function () {
        return $http.get('json/requisitionList.json')
    }
    dataFactory.requisitionDocDetailsList = function (data) {
        //return $http.get('json/requisitionPdfDoc.json')
        return $http({
            method: 'POST'
            , url: config.localUrl + '/Requisition/getAllRequisitionDocument'
            , data: data
        });
    }
    dataFactory.jobProfileDocDetailsList = function (engagmentID, positionID) {
        var data = {
                "engagementId": engagmentID
                , "requisition": positionID
            }
            /*var data = {
                  "Documents": [
                    "string"
                  ],
                   "engagementId": 0,
                  "function": engagment,
                  "function": '',
                  "requisition": 0
                }*/
        return $http({
            method: 'POST'
            , url: config.localUrl + '/Requisition/getAllProfileDocument'
            , data: data
        });
        /* {
             var data = {
                 "Documents": [
                   "string"
               ]
                 , "documentId": 0
                 , "engagementId": engagmentID
                 , "function": " "
                 , "requisition": 0
             }
         }
         return $http({
             method: 'POST'
             , url: urlAPI + '/Profile/getDocumentByEngagement'
             , data: data
         });*/
        //return $http.get('json/jobProfileDoc.json')
    }
    dataFactory.getIframeList = function () {
        return $http.get('json/iframeUrl.json')
    }
    dataFactory.postSaveEngagement = function (data) {
            return $http({
                method: 'POST'
                , url: urlAPI + '/Profile/saveDocumentToEngagement'
                , data: data
            });
        }
        //getrequesitionlist tab on clicking on  anyone of the engagements.
    dataFactory.getRequisionforanEngagment = function (engagementId) {
        if (engagementId == 9848) {
            return $http.get('json/LambWeston.json');
        }
        else {
            return $http.get('json/Acme.json');
        }
        // return $http.get('json/RequisitionList.json')
        // return $http.get(urlAPI + '/engagement/viewEngagement/' + engagementId)
    }
    dataFactory.getViewRequisition = function () {
        return $http.get('json/viewRequisition.json');
    }
    dataFactory.postDocumentByEngagement = function (data) {
        return $http({
            method: 'POST'
            , url: urlAPI + '/Profile/getDocumentByEngagement'
            , data: data
        });
    }
    dataFactory.postEngagmentRequisitionTable = function (data) {
        return $http({
            method: 'POST'
            , url: urlAPI + '/Profile/getDocumentByEngagement'
            , data: data
        });
    }
    dataFactory.getDocumentByRequisition = function (data) {
        return $http({
            method: 'POST'
            , url: urlAPI + '/Profile/getDocumentByRequisition'
            , data: data
        })
    }
    dataFactory.sendRequisition = function (data) {
        data['orgID'] = '6';
        return $http({
            method: 'POST'
            , url: urlAPI + '/Requisition/viewRequisition'
            , data: data
        });
    }
    dataFactory.getAryaJobId = function (id) {
        var orgId = '6';
        return $http.get(urlAPI + '/Requisition/getAryaJobID/' + orgId + '/' + id);
    }
    dataFactory.getRequisitionSearch = function (values) {
        var orgId = values.orgId
        var jobId = values.jobId;
        var count = values.limit
        var start = values.page * count;
        var url = urlAPI + "/Requisition/getAryaCandidates/" + orgId + "/" + jobId + "/" + count + "/" + start;
        return $http.get(url).then(getAryaCandidatesComplete).catch(function (message) {
            exception.catcher('XHR Failed for getAvengers')(message);
            $location.url('/');
        });

        function getAryaCandidatesComplete(data, status, headers, config) {
            return data;
        }
    }
    dataFactory.saveNewSearch = function (data) {
        // TODO: Get rid of hardcoded orgId will come from SSO
        var orgId = "6";
        return $http({
            method: 'POST'
            , url: urlAPI + '/Requisition/createJob/' + orgId
            , data: data
        });
    };
    dataFactory.rallyVerse = function () {
        // console.log('getInfo');
        //res.removeHeader('Transfer-Encoding');
        //$cookies.remove('RD-Access-Token');
        //  delete  $http.defaults.headers.common['RD-Access-Token'] // Remove header before call
        return $http({
                method: 'GET'
                , url: 'https://api.rallyverse.com/v1/profiles/2446/lists/content-hub/'
                , headers: {
                    'RD-Access-Token': undefined
                }
            })
            //}
            //return (req)
            //var authToken = $cookies.get('RD-Access-Token');
            // $http.defaults.headers.common['RD-Access-Token'] = authToken
    }
    dataFactory.getviewCandidate = function (id) {
        return $http({
            method: 'GET'
            , url: urlAPI + '/Candidate/viewCandidate/' + id, // data : id
        })
    };
    dataFactory.getLogOut = function () {
        // return $http.get('json/RequisitionList.json')
        return $http.get(urlAPI + '/user/logout');
    }
    dataFactory.getSavedSearchesResponse = function (data) {
        var orgId = data.orgId;
        var limit = data.limit;
        if (data.page == 0) {
            var page = 0;
        }
        else {
            var page = (data.page - 1) * limit;
        }
        return $http.get(urlAPI + '/Requisition/getAryaSavedSearches/' + orgId + '/' + limit + '/' + page);
        //return $http.get('json/Savedsearch.json')
    }
    dataFactory.getJobDescription = function (data) {
        var postData = data;
        return $http({
            method: 'POST'
            , url: config.localUrl + '/Requisition/jobSearch'
            , data: postData
        });
    }
    dataFactory.getPDF = function (url) {
        return $http.get(url, {
            responseType: 'arraybuffer'
        });
    }
    dataFactory.resumeGetPDF = function (url) {
            /*  return $http({
                 method: 'GET',
                 url: url,
                 headers: {
                   'RD-Access-Token': undefined
                  },
                 responseType: 'arraybuffer'

                })*/
            return $http.get('https://integrations.loopworks.com/api/candidate/get/35269247/true');
            // return $http.get(url,  {responseType: 'arraybuffer'});
        }
        /** ------- Candidate Details page api's -------**/
    dataFactory.getCandidateStatus = function (posId, canId) {
        return $http.get(urlAPI + '/Candidate/CandidateStatus/' + posId + '/' + canId);
    }
    dataFactory.getCandidateHistory = function (id) {
        //id = 35273950;
        return $http.get(urlAPI + '/Candidate/CandidateHistory/' + id);
    }
    dataFactory.getCandidateResume = function (id) {
        return $http.get(urlAPI + '/Candidate/candidateResume/' + id, {
            responseType: 'arraybuffer'
        });
    }
    dataFactory.getCandidateRequisition = function (id, reqNo) {
        return $http.get(urlAPI + '/Candidate/CandidateRequisition/' + id + '/' + reqNo);
    }
    dataFactory.getCandidateDocuments = function (id) {
        // id = 35107633;
        return $http.get(urlAPI + '/Candidate/attachDocument/' + id);
    }
    dataFactory.getNoteToCandidate = function (data) {
        return $http({
            method: 'POST'
            , url: urlAPI + '/Candidate/addNoteToCandidate/'
            , data: data
        });
    }
    dataFactory.removeRequisitionDocument = function (data) {
        return $http({
            method: 'POST'
            , url: config.localUrl + '/Requisition/removeRequisitionDocument'
            , data: data
        })
    }
    dataFactory.getViewAllNotes = function (id) {
        return $http.get(urlAPI + '/Candidate/viewAllNote/' + id);
    }
    dataFactory.getAllTags = function () {
        return $http.get(urlAPI + '/Candidate/allTag');
    }
    dataFactory.addTag = function (id, tag) {
        return $http({
            method: 'POST'
            , url: urlAPI + '/Candidate/AddTag'
            , data: {
                "candidateId": id
                , "tag": tag
            }
        });
    }
    dataFactory.removeTag = function (id, tag) {
        return $http({
            method: 'POST'
            , url: urlAPI + '/Candidate/removeTag'
            , data: {
                "candidateId": id
                , "tag": tag
            }
        });
    }
    dataFactory.postHayGroupLink = function (creditentialDtls) {
        return $http({
            method: 'POST'
            , url: urlHayGroupAction
            , headers: {
                'RD-Access-Token': undefined
            }
            , data: {
                "outageUnfinished": false
                , //"username":'eric.johnson@fmcg.com',
                //"password":'hay'
                "username": creditentialDtls.activateName
                , "password": creditentialDtls.activatePassword
            }
        });
    }
    dataFactory.aryaStatusSelected = function (orgID, aryaJobId, aryaStatus) {
        if (aryaStatus == "Active") {
            aryaStatus = 'activate';
        }
        else {
            aryaStatus = 'deactivate';
        }
        return $http({
            method: 'POST'
            , url: urlAPI + '/Requisition/updateAryaActivateStatus/' + orgID + '/' + aryaJobId
            , data: {
                "action": aryaStatus
            }
        });
    }
    dataFactory.getCountries = function () {
        return $http.get('json/countries.json');
    }
    dataFactory.updateStatus = function (RequisitionDetail) {
        return $http({
            method: 'POST'
            , url: urlAPI + '/Requisition/changeStatus'
            , data: RequisitionDetail
        });
    }
    dataFactory.kornferry = function () {
        return $http.get('https://qaapi.se.kornferry.com/v1/my/engagements/active', {
  withCredentials: true,
            useXDomain : true,
    headers: {
        "Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJFQUFBQUlLQXVDb3Y0RUJGa2lQeUNtS29tcFRldmhIdVo1U1JSZEUycWlsakh3S1F5djNqRzAvRVhuYm1jMzJxK1VIbE5mZXMvck9CenpGUkQ5L3FJODhoNGtVPSIsImlzcyI6Imh0dHBzOi8vcWFhcGkuc2Uua29ybmZlcnJ5LmNvbSIsImF1ZCI6Imh0dHBzOi8vcWFhcGkuc2Uua29ybmZlcnJ5LmNvbSIsImV4cCI6MTQ4MDY3OTQ5MiwibmJmIjoxNDgwNjc4MjkyfQ.bBNeMX0_JL85TPbUHeVKkjqatOQYknjOQ5NuxwID9y8',
        "Cookie" : "__kfsest3aaa3b340af128dd17df19c0e5e35dbf=EAAAALPGYHNbY751p1cpITBG5FKnHWLqbRCOup1jFSNG/G+tTXu0oJEQgZDSnfBzMruRRnfCmzSumKaewWVWojAq1/6SE1B16u9ljVqoEC+jgtg2V7vMH7oGPADBu5I77wC8rnTIQ6r0VULOhVVs6dy3VxZvaHL5PznRDxQ8Lg958jPJrW4DRV+72RwJ+ulWeXiiAaHrGrJH3rjpHwvsb+nN6/SNp9BcVSgxXwgcEeuQzPKad7VbfJ8l8jztf8m1biDjftzFARVe01SLg5zIv5+wiFI=; __kfseit=EAAAABb4mstJ0wV2iL1rMFrC9IzxpgcuYc4+nylBlXyDUhI7dYMbVGTzuIGHj7eaSXBGJifT2O3UtaObesrg7ZnajmntsIcs6+Cz8+8RFQAnjHGoQEuB6oICxkte3rnSqQ/7aMGG0BRakDJW1nqb0zS9RQ0fFkjP7TfgrvwT6smcyCm3; __kfsestd767ee1a06b8562e23c6f8579bc0aaf2=EAAAAJUiaXVCDWQ6mcihyiIrE+9mrz52nH5fbTB4pSJT990NC582jJsiw9iHssY6xv+5MI/Iw5EOrljib8XqbXwU+SqRJsi/eeNTpSiMe5ZCy2q4lQnpPfuZMns+Tbaai57i3DuT2C2wEH80+h8xlZy7jo1cy5Tgy1O5C+7bNoJycz7wlx7ziztBxFy0K4znySlAnoiQjEz9h2mdf206HVbvPYUIDoFz1kCvKXGlGz6ZfWzQAErhUvvc+ysPK9HXm99BKMU3yoW1JsYbGtHGYSWmoP8="
    }
  })

    }
    return dataFactory;
}]);
app.factory('commonFunctions', ['Factory', 'sharedProperties', '$uibModal', '$location', function (Factory, sharedProperties, $uibModal, $location) {
    var commonFunctions = {};
    commonFunctions.getIframeUrl = function (key) {
        var iFrameArray = sharedProperties.getIframeLinks();
        return iFrameArray[0][key];
    }
    commonFunctions.openIframe = function (url) {
        var modalInstance = $uibModal.open({
            animation: true
            , templateUrl: 'modalContent.html'
            , controller: 'ModalCancel'
            , size: 'lg'
            , resolve: {
                url: function () {
                    return url;
                }
            }
        });
    }
    commonFunctions.openIframeAriyaCount = function (action, userName, password, ReturnUrl) {
        var modalInstance = $uibModal.open({
            animation: true
            , templateUrl: 'modalAryaCount.html'
            , controller: 'modalAryaController'
            , size: 'lg'
            , resolve: {
                userName: function () {
                    return userName;
                }
                , password: function () {
                    return password;
                }
                , ReturnUrl: function () {
                    return ReturnUrl;
                }
                , action: function () {
                    return action;
                }
            }
        });
    }
    commonFunctions.error = function (message) {
        $uibModal.open({
            animation: true
            , templateUrl: 'LoadError.html'
            , controller: 'LoadError'
            , resolve: {
                message: function () {
                    return message;
                }
            }
        })
    }
    commonFunctions.changeActivelink = function (row, htmlPath) {
        $("li[class='active']").removeClass('active');
        $('#requistionHeader').addClass('active');
        sharedProperties.setRequisitionDetails(row);
        sharedProperties.setClientJobID(row.ReqNumber)
        console.log(row);
        $location.path(htmlPath);
        /*var promise = Factory.sendRequisition(row);
        promise.then(
          function resolved(response) {
              console.log(response.data);
              sharedProperties.setRequisitionDetails(response.data);
              sharedProperties.setJobId(response.data.requisitionDetails[0].aryaJobID);
              sharedProperties.setClientJobID(response.data.requisitionDetails[0].requisitionNumber)
              $location.path( htmlPath );
          },
          function rejected(response) {
              commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
          }
      )*/
    }
    return commonFunctions;
}]);
app.service('sharedProperties', function () {
    var tabJobProfile = false;
    var tabDocumentation = false;
    var tabSearchResults = false;
    var tabCandidateList = false;
    var tabApplicationList = false;
    var profileSelectedEngagementID = ''
    var rowCollection = [];
    var profileSelectedDocumentID = []
    var profileSelectedFunction = [];
    var engagementPerIDSelected = '';
    var iframeList = [];
    var authGlobalToken = ''
    var counter = 0;
    var requisitionDetails = [];
    var RequisitionTable = [];
    var JobID = '';
    var userName = '';
    var password = '';
    var initiateSearchData = [];
    var positionId = '';
    var newSearchData = 0;
    var ClientJobID = '';
    var noteDetails = {};
    var savedSearchDetails = {};
    var viewCandidateId = '';
    var reportURL = '';
    var candidateListDetails = [];
    var activeUserName = '';
    var activePassword = '';
    var selectedForesightGraph = '';
    var urlPdf = '';
    var email = '';
    var date = '';
    return {
        refreshPdfDocList(d) {
                date = d ? d : date;
                return date;
            }
            , setAllNotesDetails(data) {
                noteDetails = data;
            }, getAllNotesDetails() {
                return noteDetails;
            }, setURLPdf(data) {
                urlPdf = data;
            }, getURLPdf() {
                return urlPdf;
            }
            , setSelectedForesightGraph(data) {
                selectedForesightGraph = data;
            }, getSelectedForesightGraph() {
                return selectedForesightGraph;
            }, setSavedSearchDetails(data) {
                savedSearchDetails = data;
            }, getSavedSearchDetails() {
                return savedSearchDetails;
            }, setNewSearchData: function (value) {
                newSearchData = value;
            }, getNewSearchData: function () {
                return newSearchData;
            }, setPositionId: function (value) {
                positionId = value;
            }, getPositionId: function () {
                return positionId;
            }, setInitiateSearchData: function (value) {
                initiateSearchData = value;
            }, getInitiateSearchData: function () {
                return initiateSearchData;
            }, setCandidateListDetails: function (value) {
                candidateListDetails = value;
            }, getCandidateListDetails: function () {
                return candidateListDetails;
            }, setUserName: function (value) {
                userName = value
            }, getUserName: function () {
                return userName;
            }, setPassword: function (value) {
                password = value
            }, getEmail: function () {
                return email;
            }, setEmail: function (value) {
                email = value
            }
            , getPassword: function () {
                return password;
            }, setActiveUserName: function (value) {
                activeUserName = value
            }, getActiveUserNameName: function () {
                return activeUserName;
            }, setActivePassword: function (value) {
                activePassword = value
            }, getActivePassword: function () {
                return activePassword;
            }, setReportURL: function (value) {
                reportURL = value
            }, getReportURL: function () {
                return reportURL;
            }, setViewCandidateId: function (value) {
                viewCandidateId = value;
            }, getViewCandidateId: function () {
                return viewCandidateId;
            }, setJobId: function (value) {
                JobID = value;
            }, getJobId: function () {
                return JobID;
            }, setClientJobID: function (value) {
                ClientJobID = value;
            }, getClientJobID: function () {
                return ClientJobID;
            }, setRequisitionTable: function (value) {
                RequisitionTable = value;
            }, getRequisitionTable: function () {
                return RequisitionTable;
            }, getAuthGlobalToken: function () {
                return authGlobalToken;
            }, setAuthGlobalToken: function (value) {
                authGlobalToken = value;
            }, getCounter: function () {
                return counter;
            }, setCounter: function (value) {
                counter = value;
            }, getRequisitionDetails: function () {
                return requisitionDetails;
            }, setRequisitionDetails: function (value) {
                requisitionDetails = value;
            }, getIframeLinks: function () {
                return iframeList;
            }, setIframeLinks: function (value) {
                iframeList = value;
            }, getprofileSelectedEngagementID: function () {
                return profileSelectedEngagementID
            }, setprofileSelectedEngagementID: function (value) {
                profileSelectedEngagementID = value;
            }, getprofileSelectedDocumentID: function () {
                return profileSelectedDocumentID;
            }, setprofileSelectedDocumentID: function (value) {
                profileSelectedDocumentID = value
            }, getengagementPerIDSelected: function () {
                return engagementPerIDSelected;
            }, setengagementPerIDSelected: function (value) {
                engagementPerIDSelected = value
            }, getprofileSelectedFunction: function () {
                return profileSelectedFunction;
            }, setprofileSelectedFunction: function (value) {
                profileSelectedFunction = value
            }, gettabJobProfile: function () {
                return tabJobProfile;
            }, settabJobProfile: function (value) {
                tabJobProfile = value;
            }, gettabDocumentation: function () {
                return tabDocumentation;
            }, settabDocumentation: function (value) {
                tabDocumentation = value;
            }, gettabSearchResults: function () {
                return tabSearchResults;
            }, settabSearchResults: function (value) {
                tabSearchResults = value;
            }, gettabCandidateList: function () {
                return tabCandidateList;
            }, settabCandidateList: function (value) {
                tabCandidateList = value;
            }, gettabApplicationList: function () {
                return tabApplicationList;
            }, settabApplicationList: function (value) {
                tabApplicationList = value;
            }, getrowCollection: function () {
                return rowCollection;
            }, setrowCollection: function (value) {
                rowCollection = value;
            }
    }
});
