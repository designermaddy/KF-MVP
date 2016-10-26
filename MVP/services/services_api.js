app.factory('Factory', ['$http', function ($http) {
    var dataFactory = {};
    var urlAPI = 'https://api.recruiterdesktop.kf4d-dev.com/RD-WebApp'
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
		return $http.get('json/Stacked-Chart.json');
        //psyroll will be available while scan the passport
       // if (payRolNumber) {
        //    
        //}
    };
    dataFactory.getcandidatePipelineData = function (){
       // return $http.get('json/Donut-Chart.json')
	   //return $http.get('http://172.25.148.147:8080/RD-WebApp/Candidate/getCandidatePipeline');
	   //return $http.get('http://recruiter-recruite-beyv5ne58xs5g-1681892743.us-east- 1.elb.amazonaws.com/RD-WebApp/Candidate/getCandidatePipeline');
        
        return $http.get('json/Donut-Chart.json');
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
    
    dataFactory.sendRequisition = function(data) {
        return $http({
            method : 'POST',
            url : urlAPI + '/Requisition/viewRequisition',
            data : data            
        });
    }
	
    dataFactory.getRequisitionSearch = function() {
        return $http.get('json/requisitionSearch.json');
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
    
    commonFunctions.changeActivelink = function(row, htmlPath) {
        $("li[class='active']").removeClass('active');
        $('#requistionHeader').addClass('active');
                                
        var promise = Factory.sendRequisition(row);        
        promise.then(
          function resolved(response) {
              sharedProperties.setRequisitionDetails(response.data);
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

    return {
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
