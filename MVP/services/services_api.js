app.factory('Factory', ['$http', function ($http) {
    var dataFactory = {};
    
    dataFactory.getAgingRequisitionList = function () {
        // console.log(payRolNumber)
        //return $http.get('json/Requisition.json');
        //psyroll will be available while scan the passport
       // if (payRolNumber) {
           //return $http.get('http://172.25.148.147:8080/RD-WebApp/Requisition/getRequisition');
		   //return $http.get('http://recruiter-recruite-beyv5ne58xs5g-1681892743.us-east-1.elb.amazonaws.com/RD-WebApp/Requisition/getRequisition');
            return $http.get('json/requisitionList.json');
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
		
		return $http.get('https://api.recruiterdesktop.kf4d-dev.com/RD-WebApp/engagement/getAllEngagements');
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
	dataFactory.pdfDetailsList = function(){
		  return $http.get('https://api.recruiterdesktop.kf4d-dev.com/RD-WebApp/Profile/getAllDocuments')
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
		
	//engagementDetails
     return dataFactory;
}]);

app.factory('commonFunctions', ['Factory', 'sharedProperties', function(Factory, sharedProperties) {
    var commonFunctions = {};
    
    commonFunctions.getIframeUrl = function(key) {
        var iFrameArray = sharedProperties.getIframeLinks();
        return iFrameArray[0][key];
    }        
    
    
    return commonFunctions;    
}]);

app.service('sharedProperties', function () {
    var tabJobProfile = false;
    var tabDocumentation = false;
    var tabSearchResults = false;
	var tabCandidateList=false;
	var tabApplicationList=false;
    var rowCollection = [];
    var iframeList = [];

    return {
        getIframeLinks : function() {
            return iframeList;
        },
        setIframeLinks : function(value) {
            iframeList = value;            
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