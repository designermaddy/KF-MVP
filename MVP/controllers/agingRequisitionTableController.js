

app.controller('agingRequisitionTableController', ['$scope','Factory', function ($scope, Factory) {
$scope.viewLoading = false;
 agingRequisitionList();
    function agingRequisitionList() {
        var promise = Factory.getAgingRequisitionList();
        promise.then(
          function resolved(response) {

              $scope.rowCollection = response.data.requisitionList;
			  if($scope.rowCollection){
				 $scope.viewLoading = true;
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
$scope.itemsByPage=15;

  $scope.listVisible = true;
  $scope.gridVisible = false
            $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.listVisible = $scope.listVisible ? false : true;
				$scope.gridVisible = $scope.gridVisible ? false : true;
				console.log($scope.listVisible)
				console.log($scope.gridVisible)
            }

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