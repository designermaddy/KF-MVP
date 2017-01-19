(function () {
    app.directive('tagInput', ['Factory', 'commonFunctions', '$rootScope', function (Factory, commonFunctions, $rootScope) {
        return {
            restrict: 'E'
            , scope: {
                inputTags: '=taglist'
                , autocomplete: '=autocomplete'
                , canId: '=id',
                type : '=type'
            }
            , link: function ($scope, element, attrs) {
                $scope.defaultWidth = 150;
                $scope.tagText = '';
                $scope.placeholder = attrs.placeholder;
                if ($scope.autocomplete) {
                    $scope.autocompleteFocus = function (event, ui) {
                        $(element).find('input').val(ui.item.value);
                        return false;
                    };
                    $scope.autocompleteSelect = function (event, ui) {
                        $scope.$apply('tagText=\'' + ui.item.value + '\'');
                        $scope.$apply('addTag()');
                        return false;
                    };
                    $(element).find('input').autocomplete({
                        minLength: 1
                        , source: function (request, response) {
                            var results = $.ui.autocomplete.filter($scope.autocomplete, request.term);
                            response(results.slice(0, 10));
                        }
                        , focus: function (_this) {
                            return function (event, ui) {
                                return $scope.autocompleteFocus(event, ui);
                            };
                        }(this)
                        , select: function (_this) {
                            return function (event, ui) {
                                return $scope.autocompleteSelect(event, ui);
                            };
                        }(this)
                    });
                }
                $scope.tagArray = function () {
                    if ($scope.inputTags === undefined) {
                        return [];
                    }
                    return $scope.inputTags.split(',').filter(function (tag) {
                        return tag !== '';
                    });
                };
                $scope.addTag = function () {
                    var tagArray;
                    if ($scope.tagText.length === 0) {
                        return;
                    }
                    if (!$scope.checkTag($scope.tagText)) {
                        commonFunctions.error($scope.tagText + ' -- No such tag exists. Please select one of the tags from Dropdown.');
                        return;
                    }
                    if ($scope.type == 'candidate')Factory.addTag($scope.canId, $scope.tagText);
                     if ($scope.inputTags.indexOf($scope.tagText) !== -1) {

                        commonFunctions.tagInputError($scope.tagText + ' -- Tag aleady exists.');

                        return $scope.tagText = '';

                    }
                    tagArray = $scope.tagArray();
                    tagArray.push($scope.tagText);
                    $scope.inputTags = tagArray.join(',');
                    $rootScope.$broadcast('tagChange', $scope.inputTags);
                    return $scope.tagText = '';
                };

                $scope.checkTag = function(tag) {
                    if ($scope.autocomplete.indexOf(tag) !== -1) {
                        return true;
                    }
                    return false;
                };

                $scope.deleteTag = function (key) {
                    var tagArray;
                    var tag = '';
                    tagArray = $scope.tagArray();
                    if (tagArray.length > 0 && $scope.tagText.length === 0 && key === undefined) {
                        tag = tagArray.pop();
                    }
                    else {
                        if (key !== undefined) {
                            tag = tagArray.splice(key, 1)[0];
                        }
                    }
                    if (tag.length > 1 && $scope.type == 'candidate')Factory.removeTag($scope.canId, tag);
                    $scope.inputTags = tagArray.join(',');
                    $rootScope.$broadcast('tagChange', $scope.inputTags);
                    return $scope.inputTags;
                };
                $scope.$watch('tagText', function (newVal, oldVal) {
                    var tempEl;
                    if (!(newVal === oldVal && newVal === undefined)) {
                        tempEl = $('<span>' + newVal + '</span>').appendTo('body');
                        $scope.inputWidth = tempEl.width() + 5;
                        if ($scope.inputWidth < $scope.defaultWidth) {
                            $scope.inputWidth = $scope.defaultWidth;
                        }
                        return tempEl.remove();
                    }
                });
                element.bind('keydown', function (e) {
                    var key;
                    key = e.which;
                    if (key === 9 || key === 13) {
                        e.preventDefault();
                    }
                    if (key === 8) {
                        return $scope.$apply('deleteTag()');
                    }
                });
                return element.bind('keyup', function (e) {
                    var key;
                    key = e.which;
                    if (key === 9 || key === 13 || key === 188) {
                        e.preventDefault();
                        return $scope.$apply('addTag()');
                    }
                });
            }
            , template: '<div class=\'tag-input-ctn\'><div class=\'input-tag\' data-ng-repeat="tag in tagArray()">{{tag}}<div class=\'delete-tag\' data-ng-click=\'deleteTag($index)\'>&times;</div></div><input type=\'text\' data-ng-style=\'{width: inputWidth}\' data-ng-model=\'tagText\' placeholder=\'{{placeholder}}\'/></div>'
        };
                    }]);
}.call(this));
