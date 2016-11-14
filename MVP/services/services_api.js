app.factory('Factory', ['$http', 'config', function ($http, config) {
    var dataFactory = {};
    var urlAPI = config.projectUrl;

    dataFactory.getAgingRequisitionList = function () {
        // console.log(payRolNumber)
        //return $http.get('json/Requisition.json');
        //psyroll will be available while scan the passport
       // if (payRolNumber) {
           //return $http.get('http://172.25.148.147:8080/RD-WebApp/Requisition/getRequisition');
		   //return $http.get('http://recruiter-recruite-beyv5ne58xs5g-1681892743.us-east-1.elb.amazonaws.com/RD-WebApp/Requisition/getRequisition');
            //return $http.get('json/requisitionList.json');
			 return $http.get(urlAPI + '/Requisition/getAgingPositions');
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
		  return $http.get(urlAPI + '/Requisition/getAllPositions');
        //}
    };
     dataFactory.getRequestionGoalStackChart = function (graphName) {
         return $http.get(urlAPI + '/dashboard/graphs/' + graphName);
    };
    dataFactory.getcandidatePipelineData = function (graphName){
        return $http.get(urlAPI + '/dashboard/graphs/' + graphName);
      // return $http.get('json/getcandidatePipelineData.json');
      //  http://localhost:8080/RD-WebApp/dashboard/graphs/CandidatePipeline
    }
    
     // for engagements
	dataFactory.getEngagementDetailsTableList = function(){
		
		return $http.get(urlAPI+'/engagement/allEngagements');
	}
		dataFactory.getEngagementOther = function(){
		
		//return $http.get('json/engagementDetails.json')
	}
		dataFactory.getEngagementOverviewStatus = function(){
		
		return $http.get('json/engagementStatusdonut.json');
	}
		dataFactory.getEngagementOverviewIndustry = function(){
		
		return $http.get('json/engagementIndustrydonut.json');
	}
	dataFactory.getrequisitionCandidateTableList = function(){
		return $http.get('json/candidatelist.json');        
	}
    dataFactory.postrequisitionApplicationList = function(data){
		//return $http.get(urlAPI+'/Requisition/getPositionByRequisition');
          return $http({
            method : 'POST',
            url : urlAPI+'/Requisition/getPositionByRequisition',
            data : data
        });
                       //  https://api.recruiterdesktop.kf4d-dev.com//RD-WebApp/Requisition/getPositionByRequisition
	}
     dataFactory.getrequisitionCandidateList = function(positionID){
		//return $http.get('json/requisitionCandidateList.json');
        positionID = 9343;
        return $http.get(urlAPI + '/Candidate/allCandidataList/' + positionID);
	}
	
	dataFactory.pdfDetailsList = function(){
		  return $http.get(urlAPI+'/Profile/getAllDocuments')
	}
	dataFactory.getRequisitionSearchResults = function(){
        return $http.get('json/requisitionList.json')
    }
	dataFactory.requisitionDocDetailsList = function(){
        return $http.get('json/requisitionPdfDoc.json')
    }
    dataFactory.jobProfileDocDetailsList = function(engagment){
        var data = {
              "Documents": [
                "string"
              ],
              "documentId": 0,
              "engagementId": 0,
              "function": engagment,
              "requisition": 0
            }

        return $http({
            method: 'POST',
            url: urlAPI+'/Profile/getDocumentByRequisition',
            data: data

        });
//return $http.get('json/jobProfileDoc.json')
    }
	dataFactory.getIframeList = function(){
        return $http.get('json/iframeUrl.json')
    }

	dataFactory.postSaveEngagement = function(data){
		return $http({
			method: 'POST',
			url: urlAPI+'/Profile/saveDocumentToEngagement',
			data: data
			
		});
	 
	}
	 //getrequesitionlist tab on clicking on  anyone of the engagements.
    dataFactory.getRequisionforanEngagment = function(engagementId){
       // return $http.get('json/RequisitionList.json')
        return $http.get(urlAPI+'/engagement/viewEngagement/'+engagementId)
    }
    dataFactory.getViewRequisition = function() {
        return $http.get('json/viewRequisition.json');
    }
	dataFactory.postDocumentByEngagement = function(data) {
        return $http({
            method : 'POST',
            url : urlAPI + '/Profile/getDocumentByEngagement',
            data : data            
        });
    }
	dataFactory.postEngagmentRequisitionTable = function(data) {
        return $http({
            method : 'POST',
            url : urlAPI + '/Profile/getDocumentByEngagement',
            data : data            
        });
    }
    
    dataFactory.getDocumentByRequisition = function(data) {
        return $http({
            method : 'POST',
            url : urlAPI + '/Profile/getDocumentByRequisition',
            data : data
        })
    }

    dataFactory.sendRequisition = function(data) {
        data['orgID'] = '6';
        return $http({
            method : 'POST',
            url : urlAPI + '/Requisition/viewRequisition',
            data : data            
        });
    }
	
    dataFactory.getAryaJobId = function(id) {
        var orgId = '6';
        return $http.get(urlAPI+'/Requisition/getAryaJobID/'+ orgId + '/'+ id);
    }

    dataFactory.getRequisitionSearch = function(values) {
        var orgId = values.orgId
        var jobId = values.jobId;
        var count = values.limit
        var start = values.page * count;

        var url =   urlAPI + "/Requisition/getAryaCandidates/" + orgId + "/" + jobId + "/" + count + "/" + start;


        return $http.get(url)
                .then(getAryaCandidatesComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAvengers')(message);
                    $location.url('/');
                });

        function getAryaCandidatesComplete(data, status, headers, config) {
            return data;
        }

    }

    dataFactory.saveNewSearch = function(data) {
        // TODO: Get rid of hardcoded orgId will come from SSO
        var orgId = "6";

        return $http({
            method : 'POST',
            url : urlAPI + '/Requisition/createJob/' + orgId,
            data : data
        });
    };

    dataFactory.rallyVerse = function(){
         return $http.get('https://api.rallyverse.com/v1/profiles/2446/lists/content-hub/')
    }

    dataFactory.getviewCandidate = function(id) {
        return $http({
            method : 'GET',
            url : urlAPI + '/Candidate/viewCandidate/'+id,
           // data : id
        })
    };
     dataFactory.getLogOut = function(){
       // return $http.get('json/RequisitionList.json')
        return $http.get(urlAPI+'/user/logout');
    }

    dataFactory.getSavedSearchesResponse = function(data) {
        var orgId = data.orgId;
        var limit = data.limit;
        var page  = data.page * limit;
        return $http.get(urlAPI + '/Requisition/getAryaSavedSearches/' + orgId + '/' + limit + '/' + page);
    }

    dataFactory.getJobDescription = function(data) {
        return $http.get(urlAPI + '/Requisition/getJobDescription/' + data);
    }
     dataFactory.getPDF = function(url) {
        return $http.get(url,  {responseType: 'arraybuffer'});
    }


    dataFactory.getNoteToCandidate = function(data){
        return $http({
            method : 'POST',
            url : urlAPI + '/Candidate/addNoteToCandidate/',
            data : data
        });
    }

     return dataFactory;
}]);

app.factory('commonFunctions', ['Factory', 'sharedProperties','$uibModal', '$location', function(Factory, sharedProperties, $uibModal, $location) {
    var commonFunctions = {};
    
    commonFunctions.getIframeUrl = function(key) {
        var iFrameArray = sharedProperties.getIframeLinks();
        return iFrameArray[0][key];
    }

    commonFunctions.openIframe = function(url) {
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
    
    commonFunctions.error = function(message) {
        $uibModal.open({
            animation : true,
            templateUrl : 'LoadError.html',
            controller : 'LoadError',
            resolve : {
                message : function() {
                    return message;
                }
            }
        })
    }

    commonFunctions.changeActivelink = function(row, htmlPath) {
        $("li[class='active']").removeClass('active');
        $('#requistionHeader').addClass('active');
        sharedProperties.setRequisitionDetails(row);
        sharedProperties.setClientJobID(row.ReqNumber)
        console.log(row);
        $location.path( htmlPath );


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
	var tabCandidateList=false;
	var tabApplicationList=false;
    var profileSelectedEngagementID=''
    var rowCollection = [];
    var profileSelectedDocumentID = []
	var profileSelectedFunction = [];
	var engagementPerIDSelected ='';
    var iframeList = [];
	var authGlobalToken = ''
	var counter=0;
    var requisitionDetails = [];
    var RequisitionTable = [];
    var JobID = '';
    var userName='';
    var password='';
    var initiateSearchData = [];

    var ClientJobID = '';

    var viewCandidateId = '';

    var reportURL ='';


    return {
        setInitiateSearchData : function(value){
            initiateSearchData = value;
        },
        getInitiateSearchData : function() {
            return initiateSearchData;
        },
        setUserName : function(value){
            userName = value
        },
        getUserName: function(){
            return userName;
        },
         setPassword : function(value){
            password = value
        },
        getPassword: function(){
            return password;
        },
        setReportURL : function(value){
            reportURL = value
        },
        getReportURL: function(){
            return reportURL;
        },
        setViewCandidateId : function(value) {
            viewCandidateId = value;
        },
        getViewCandidateId : function(){
            return viewCandidateId;
        },
        setJobId : function(value) {
            JobID = value;
        },
        getJobId : function() {
            return JobID;
        },
        setClientJobID : function(value) {
            ClientJobID = value;
        },
        getClientJobID : function() {
            return ClientJobID;
        },
        setRequisitionTable : function(value) {
            RequisitionTable = value;
        },
        
        getRequisitionTable : function(){
            return RequisitionTable;
        },
        
        getAuthGlobalToken : function() {
            return authGlobalToken;
        },
        setAuthGlobalToken : function(value) {
            authGlobalToken = value;            
        },
		 getCounter : function() {
            return counter;
        },
        
        setCounter : function(value) {
            counter = value;            
        },
        getRequisitionDetails : function() {
            return requisitionDetails;
        },
        setRequisitionDetails : function(value) {
            requisitionDetails  = value;
        },
        getIframeLinks : function() {
            return iframeList;
        },
        setIframeLinks : function(value) {
            iframeList = value;            
        },
	    getprofileSelectedEngagementID: function(){
            return profileSelectedEngagementID
        },
        setprofileSelectedEngagementID : function(value){
             profileSelectedEngagementID = value;
        },
        getprofileSelectedDocumentID : function(){
            return profileSelectedDocumentID;
        },
        setprofileSelectedDocumentID:function(value){
            profileSelectedDocumentID=value
        },
         getengagementPerIDSelected : function(){
            return engagementPerIDSelected;
        },
        setengagementPerIDSelected:function(value){
            engagementPerIDSelected=value
        },
		getprofileSelectedFunction : function(){
            return profileSelectedFunction;
        },
        setprofileSelectedFunction:function(value){
            profileSelectedFunction=value
        },
        gettabJobProfile: function () {
            return tabJobProfile;
        },
        settabJobProfile: function (value) {
            tabJobProfile = value;
        },

         gettabDocumentation: function () {
            return tabDocumentation;
        },
        settabDocumentation: function (value) {
            tabDocumentation = value;
        },

         gettabSearchResults: function () {
            return tabSearchResults;
        },
        settabSearchResults: function (value) {
            tabSearchResults = value;
        },

         gettabCandidateList: function () {
            return tabCandidateList;
        },
        settabCandidateList: function (value) {
            tabCandidateList = value;
        },
        gettabApplicationList: function () {
            return tabApplicationList;
        },
        settabApplicationList: function (value) {
            tabApplicationList = value;
        },
        getrowCollection : function() {
            return rowCollection;
        },
        setrowCollection : function(value) {
            rowCollection = value;            
        }
           
    }
	});
