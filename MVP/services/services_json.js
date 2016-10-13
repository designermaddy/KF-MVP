app.factory('Factory', ['$http', function ($http) {
    var dataFactory = {};
    
    dataFactory.getAgingRequisitionList = function () {
        // console.log(payRolNumber)
        return $http.get('json/Requisition.json');
        //psyroll will be available while scan the passport
       // if (payRolNumber) {
        //    return $http.get('http://CCH1WTGTT/VAACSSISWebAPI_INT/api/Crews/GetEmpDetails?payRolNumber=' + payRolNumber);
        //}
    };
     dataFactory.getRequestionGoalStackChart = function () {
        // console.log(payRolNumber)
        return $http.get('json/Stacked-Chart.json');
        //psyroll will be available while scan the passport
       // if (payRolNumber) {
        //    return $http.get('http://CCH1WTGTT/VAACSSISWebAPI_INT/api/Crews/GetEmpDetails?payRolNumber=' + payRolNumber);
        //}
    };
	
    dataFactory.getcandidatePipelineData = function (){
        return $http.get('json/Donut-Chart.json')
    }
	
	// for engagements
	dataFactory.getEngagementDetailsTableList = function(){
		
		return $http.get('json/engagementDetails.json')
	}
		dataFactory.getEngagementOther = function(){
		
		//return $http.get('json/engagementDetails.json')
	}
		dataFactory.getEngagementOverviewStatus = function(){
		
		return $http.get('json/engagementStatusdonut.json')
	}
		dataFactory.getEngagementOverviewIndustry = function(){
		
		return $http.get('json/engagementIndustrydonut.json')
	}
	//engagementDetails
     return dataFactory;
}
]);