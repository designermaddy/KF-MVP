app.controller('popoverController', ['$scope', '$timeout','sharedProperties','commonFunctions', function ($scope, $timeout, sharedProperties, commonFunctions) {
    $scope.cancel = function () {
      $scope.isOpen = false;
    };
  commonFunctions.getSearcherJson();
    $scope.ReqUrl = "partial/_RequisitionHistory.html";
    $scope.CanUrl = "partial/_CandidateHistory.html";

    var turn = 1;

  var list = {
        'reqGoal' : { 'status' : 1,  'url' : 'RequisitionGoal'},
        'reqHistory'  : { 'status' : 0,  'url' : 'RequisitionHistory'},
        'reqActivity' : { 'status' : 0,  'url' : 'RequisitionStatus'},
        'canPipeline' : { 'status' : 2,  'url' : 'CandidatePipeline'},
        'canHistory'  : { 'status' : 0,  'url' : 'CandidateHistory'},
        'canSource'   : { 'status' : 0,  'url' : 'CandidateSource'}
    }

  $scope.initial = function() {
      $timeout(function () { initialSetup(); }, 10);
  }

  var initialSetup = function() {
      var el = '';
    angular.forEach(list , function (val, key) {
        if (val.status !== 0) {
            el = $('#' + key);
            el.parent().addClass('Selected');
            el.prop('disabled', true);
            el.prop('checked', true);
        }
    })
  }

     $scope.open = function() {
        var el = $(event.target);
        var activeEl = '';
        if (el.is('input')) {
            angular.forEach(list, function(val, key) {
                    if (val.status == 1) {
                        activeEl = $('#' + key);
                        val.status = 0;
                        activeEl.parent().removeClass('Selected');
                        activeEl.prop('disabled', false);
                        activeEl.prop('checked', false);
                    }

                    if (val.status == 2){
                        val.status = 1;
                    }

                    if (key == el.attr('id')) {
                        var str = 'partial/_' + val.url + '.html';
                        sharedProperties.setSelectedForesightGraph(val.url);
                        if (turn == 1) {
                            $scope.ReqUrl = str;
                            turn = 2;
                        }else {
                            $scope.CanUrl = str;
                            turn = 1;
                        }
                        el.parent().addClass('Selected');
                        el.prop('disabled', true);
                        val.status = 2;
                    }
                }
            );
        }
    }

}]);
