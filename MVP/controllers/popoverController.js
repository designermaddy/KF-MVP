app.controller('popoverController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.cancel = function () {
      $scope.isOpen = false;
    };

    $scope.ReqUrl = "partial/_RequisitionGoal.html";
    $scope.CanUrl = "partial/_CandidatePipeline.html";

  var list = {
        'reqGoal' : { 'status' : 1, 'type' : 'req', 'url' : 'RequisitionGoal'},
        'reqHistory'  : { 'status' : 0, 'type' : 'req', 'url' : 'RequisitionHistory'},
        'reqActivity' : { 'status' : 0, 'type' : 'req', 'url' : 'RequisitionActivity'},
        'canPipeline' : { 'status' : 1, 'type' : 'can', 'url' : 'CandidatePipeline'},
        'canHistory'  : { 'status' : 0, 'type' : 'can', 'url' : 'CandidateHistory'},
        'canSource'   : { 'status' : 0, 'type' : 'can', 'url' : 'CandidateSource'}
    }

  $scope.initial = function() {
      $timeout(function () { initialSetup(); }, 10);
  }

  var initialSetup = function() {
      var el = '';
    angular.forEach(list , function (val, key) {
        if (val.status == 1) {
            el = $('#' + key);
            el.prop('disabled', true);
            el.prop('checked', true);
        }
    })
  }

     $scope.open = function(type) {
        var el = $(event.target);
        var activeEl = '';
        if (el.is('input')) {
            angular.forEach(list, function(val, key) {
                if (val.type == type) {
                    if (val.status == 1) {
                        activeEl = $('#' + key);
                        val.status = 0;
                        activeEl.prop('disabled', false);
                        activeEl.prop('checked', false);
                    }
                    if (key == el.attr('id')) {
                        var str = 'partial/_' + val.url + '.html';
                        if (type == 'req') $scope.ReqUrl = str;
                        if (type == 'can') $scope.CanUrl = str;

                        el.prop('disabled', true);
                        val.status = 1;
                    }
                }
            });
        }
    }

}]);
