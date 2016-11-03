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
			 return $http.get(urlAPI + '/Requisition/agingRequisition');
        //}
    };
     dataFactory.getRequestionGoalStackChart = function () {
        // console.log(payRolNumber)
       // return $http.get('json/Stacked-Chart.json');
	  // http://172.25.148.147:8080/RD-WebApp/Requisition/getRequisitionStatus
	    //return $http.get(' http://172.25.148.147:8080/RD-WebApp/Requisition/getRequisitionStatus');
		//return $http.get('json/Stacked-Chart.json');
         return $http.get('json/requisitionGoal.json');
        //psyroll will be available while scan the passport
       // if (payRolNumber) {
        //    
        //}
    };
    dataFactory.getcandidatePipelineData = function (){
       // return $http.get('json/Donut-Chart.json')
	   //return $http.get('http://172.25.148.147:8080/RD-WebApp/Candidate/getCandidatePipeline');
	   //return $http.get('http://recruiter-recruite-beyv5ne58xs5g-1681892743.us-east- 1.elb.amazonaws.com/RD-WebApp/Candidate/getCandidatePipeline');
        
        return $http.get('json/candidatePipeline.json');
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
     dataFactory.getrequisitionCandidateList = function(){
		//return $http.get('json/requisitionCandidateList.json');
        return $http.get(urlAPI + '/Candidate/allCandidataList ');
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
        return $http({
            method : 'POST',
            url : urlAPI + '/Requisition/viewRequisition',
            data : data            
        });
    }
	
    dataFactory.getRequisitionSearch = function(jobId) {
        // return $http.get('json/requisitionSearch.json');
        var orgId = "2";
        var jobId = 18508;
        var count = "60";
        var start = "25";
        var url =   urlAPI + "/Requisition/getAryaCandidates/" + orgId + "/" + jobId + "/" + count + "/" + start;
        //return $http.get(url);

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
        var orgId = "2";

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
    
    commonFunctions.changeActivelink = function(row, htmlPath) {
        $("li[class='active']").removeClass('active');
        $('#requistionHeader').addClass('active');


                                
        var promise = Factory.sendRequisition(row);        
        promise.then(
          function resolved(response) {
              sharedProperties.setRequisitionDetails(response.data);
              sharedProperties.setJobId(response.data.requisitionDetails[0].aryaJobID);
              sharedProperties.setClientJobID(response.data.requisitionDetails[0].jobId)
              $location.path( htmlPath );
          },
          function rejected(response) {
              alert(response.status + ': ' + response.statusText);
          }
      )
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

    var ClientJobID = '';

    var viewCandidateId = '';


    return {
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
            return JobID;
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
