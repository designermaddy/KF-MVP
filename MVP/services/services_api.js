app.factory('Factory', ['$http', function ($http) {
    var dataFactory = {};
    
    dataFactory.getAgingRequisitionList = function () {
        // console.log(payRolNumber)
        //return $http.get('json/Requisition.json');
        //psyroll will be available while scan the passport
       // if (payRolNumber) {
           //return $http.get('http://172.25.148.147:8080/RD-WebApp/Requisition/getRequisition');
		   //return $http.get('http://recruiter-recruite-beyv5ne58xs5g-1681892743.us-east-1.elb.amazonaws.com/RD-WebApp/Requisition/getRequisition');
            return $http.get('json/Requisition.json');
        //}
    };
     dataFactory.getRequestionGoalStackChart = function () {
        // console.log(payRolNumber)
       // return $http.get('json/Stacked-Chart.json');
	  // http://172.25.148.147:8080/RD-WebApp/Requisition/getRequisitionStatus
	    //return $http.get(' http://172.25.148.147:8080/RD-WebApp/Requisition/getRequisitionStatus');
		return $http.get('http://recruiter-recruite-beyv5ne58xs5g-1681892743.us-east-1.elb.amazonaws.com/RD-WebApp/Requisition/getRequisitionStatus');
        //psyroll will be available while scan the passport
       // if (payRolNumber) {
        //    
        //}
    };
    dataFactory.getcandidatePipelineData = function (){
       // return $http.get('json/Donut-Chart.json')
	   //return $http.get('http://172.25.148.147:8080/RD-WebApp/Candidate/getCandidatePipeline');
	   return $http.get('http://recruiter-recruite-beyv5ne58xs5g-1681892743.us-east-1.elb.amazonaws.com/RD-WebApp/Candidate/getCandidatePipeline');
    }
    
     // for engagements
	dataFactory.getEngagementDetailsTableList = function(){
		
		return $http.get('json/engagementDetails.json');
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
	//engagementDetails
     return dataFactory;
}
]);