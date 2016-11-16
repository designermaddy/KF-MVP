angular.module('tag-input', [])
.directive('tagInput', function(){
    return {
        restrict : 'E',
        scope : {
            inputTags : '=taglist'
        },
        link : function($scope, element, attrs) {
             $scope.defaultWidth = 600
             $scope.tagText = ''
             $scope.placeholder = attrs.placeholder

             $scope.tagArray = function() {
                if ($scope.inputTags === undefined) {
                    return [];
                }
                return $scope.inputTags.split(',').filter(tag => tag !== "");
             };

              $scope.addTag = function() {
                if ($scope.tagText.length === 0) { return; }
                let tagArray = $scope.tagArray();
                tagArray.push($scope.tagText);
                $scope.inputTags = tagArray.join(',');
                return $scope.tagText = "";
              };

              $scope.deleteTag = function(key) {
                let tagArray = $scope.tagArray();
                if (tagArray.length > 0 && $scope.tagText.length === 0 && key === undefined) {
                  tagArray.pop();
                } else if (key !== undefined) { tagArray.splice(key, 1); }
                return $scope.inputTags = tagArray.join(',');
              };

              // Watch for changes in text field
              $scope.$watch('tagText', function(newVal, oldVal) {
                if (newVal !== oldVal || newVal !== undefined) {

                  let tempEl = $(`<span>${newVal}</span>`).appendTo("body");
                  $scope.inputWidth = tempEl.width() + 5;
                  if ($scope.inputWidth < $scope.defaultWidth) { $scope.inputWidth = $scope.defaultWidth; }
                  return tempEl.remove();
                }
              });

              element.bind("keydown", function(e) {
                let key = e.which;

                if (key === 9 || key === 13) { e.preventDefault(); }
                if (key === 8) { return $scope.$apply('deleteTag()'); }
              });

              return element.bind("keyup", function(e) {
                let key = e.which;

                // Tab, Enter or , pressed
                if (key === 9 || key === 13 || key === 188) {
                  e.preventDefault();
                  return $scope.$apply('addTag()');
                }
              });
        },
        template: "<div class='tag-input-ctn'><div class='input-tag' data-ng-repeat=\"tag in tagArray()\">{{tag}}<div class='delete-tag' data-ng-click='deleteTag($index)'>&times;</div></div><input type='text' data-ng-style='{width: inputWidth}' data-ng-model='tagText' placeholder='{{placeholder}}'/></div>"
      }
});
