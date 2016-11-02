app.controller('rallyVerseController', ['$scope', 'Factory', function ($scope, Factory) {
        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        var currIndex = 0;
        var currLength = 0;


        function rallyVerseDetails() {
            var promise = Factory.rallyVerse();
            promise.then(function resolved(response) {
                $scope.rallyVerseItem = response.data.items

                if ($scope.rallyVerseItem) {
                    for (var i = 0; i < $scope.rallyVerseItem.length; i += 4) {
                        $scope.addSlide();
                    }
                }


            }, function rejected(response) {
                alert(response.status + ': ' + response.statusText);
            })
        };

        rallyVerseDetails();

        $scope.addSlide = function () {
            var newWidth = 600 + slides.length + 1;
            if (currLength < $scope.rallyVerseItem.length - 3) {
                $scope.slides.push({
                    asset_url: $scope.rallyVerseItem[currLength].asset_url,
                    asset_url1: $scope.rallyVerseItem[currLength + 1].asset_url,
                    asset_url2: $scope.rallyVerseItem[currLength + 2].asset_url,
                    asset_url3: $scope.rallyVerseItem[currLength + 3].asset_url,
                    _id:$scope.rallyVerseItem[currLength]._id,
                    _id1:$scope.rallyVerseItem[currLength + 1]._id,
                    _id2:$scope.rallyVerseItem[currLength + 2]._id,
                    _id3:$scope.rallyVerseItem[currLength + 3]._id,
                    short_url:$scope.rallyVerseItem[currLength].short_url,
                    short_url1:$scope.rallyVerseItem[currLength + 1].short_url,
                    short_url2:$scope.rallyVerseItem[currLength + 2].short_url,
                    short_url3:$scope.rallyVerseItem[currLength + 3].short_url,
                    source:$scope.rallyVerseItem[currLength].source,
                    source1:$scope.rallyVerseItem[currLength + 1].source,
                    source2:$scope.rallyVerseItem[currLength + 2].source,
                    source3:$scope.rallyVerseItem[currLength + 3].source,
                    title:$scope.rallyVerseItem[currLength].title,
                    title1:$scope.rallyVerseItem[currLength + 1].title,
                    title2:$scope.rallyVerseItem[currLength + 2].title,
                    title3:$scope.rallyVerseItem[currLength + 3].title,
                    id: currIndex++
                });
                currLength += 4;
            }
        }
}]);
