

app.controller('engagementTableController', ['$scope','Factory', '$filter','filterFilter', function ($scope, Factory, filter, filterFilter) {

 $scope.viewLoading = false;
 agingRequisitionList();
    function agingRequisitionList() {
        var promise = Factory.getEngagementDetailsTableList();
        promise.then(
          function resolved(response) {

              $scope.rowCollection = response.data.engagementList;
              $scope.engagementListDtls = response.data;
			  if($scope.rowCollection){
				 $scope.viewLoading = true;
                    $scope.currentPage = 2;
                    $scope.totalItems = $scope.rowCollection.length;
                    $scope.entryLimit = 12; // items per page
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $scope.predicates = ['RequisitionNumber', 'Resources', 'Engagement', 'Sourced', 'Screened','Interviewed', 'Offered', 'Hired', 'DaysLeft'];
				// $scope.selectedPredicate = $scope.predicates[0];
				 //$scope.displayCollection = [].concat($scope.rowCollection);
			  }
             // globalDetails.userTypeID = response.data.userTypeId;
             // globalDetails.userId = response.data.userid;
             // globalDetails.userType = response.data.userType
          },
          function rejected(response) {
              alert(response.status + ': ' + response.statusText);
          }
      )
    };
$scope.itemsByPage=3;
    
    
    	// pagination controls
	

	// $watch search to update pagination
	$scope.$watch('search', function (newVal, oldVal) {
         if($scope.rowCollection){
		$scope.filtered = filterFilter($scope.rowCollection, newVal);
		$scope.totalItems = $scope.filtered.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
         }
	}, true);

  $scope.listVisible = true;
  $scope.gridVisible = false
            $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.listVisible = $scope.listVisible ? false : true;
				$scope.gridVisible = $scope.gridVisible ? false : true;
				console.log($scope.listVisible)
				console.log($scope.gridVisible)
            }

/*$scope.rowCollection = [
              { RequisitionNumber: '1029102', Requisition:'Suppliy Chain Director', RequisitionDate:'08/01/2016 - 09/01/2016', Resources:'10', Engagement: 'Paypal IT', DaysLeft: '1', Left:'Day', Sourced:'60', Screened: '45',
			  Interviewed:'30', Offered:'15', Hired:'5'},
              { RequisitionNumber: 'PL101', Requisition:'Director Human Resource', RequisitionDate:'08/01/2016 - 09/01/2016', Resources:'15', Engagement: 'IBM Director Human Resource', DaysLeft: '5' , Left:'Days', Sourced:'75', Screened: '50', Interviewed:'30', Offered:'15', Hired:'10'},
              {RequisitionNumber: '1029105', Requisition:'Technical Architect', RequisitionDate:'08/01/2016 - 09/02/2016', Resources:'7',  Engagement: 'Paypal Technical Architect', DaysLeft: '8' , Left:'Days', Sourced:'35', Screened: '33',
			  Interviewed:'30', Offered:'15', Hired:'4'},
			  { RequisitionNumber: '1029117', Requisition:'Director Finance', RequisitionDate:'08/01/2016 - 09/15/2016', Resources:'3', Engagement: 'Verizon Director Finance', DaysLeft: '14' , Left:'Day', Sourced:'25', Screened: '20', Interviewed:'30', Offered:'15', Hired:'4'},
			  { RequisitionNumber: '1029122', Requisition:'Reginal Sales Manager', RequisitionDate:'08/01/2016 - 09/30/2016', Resources:'5', Engagement: 'Rite Aid Regional Sales Manager', DaysLeft: '15' , Left:'Day', Sourced:'30', Screened: '80',
			  Interviewed:'30', Offered:'15', Hired:'4'},
			  
			  
			  //
          ];*/
		  //ng-class="[getClass(icolor)
		    $scope.getClass = function (strValue) {
                    if (strValue <= 5)
                        return "BGRed";
                    else if (strValue < 15)
                        return "BGOrange";
                    else if (strValue >= 15)
                        return "BGGreen";
                   
                }
        }
    ]);
	// app.filter('myStrictFilter', function($filter){
    // return function(input, predicate){
        // return $filter('filter')(input, predicate, true);
    // }
// });

// app.filter('unique', function() {
    // return function (arr, field) {
        // var o = {}, i, l = arr.length, r = [];
        // for(i=0; i<l;i+=1) {
            // o[arr[i][field]] = arr[i];
        // }
        // for(i in o) {
            // r.push(o[i]);
        // }
        // return r;
    // };
	  // })