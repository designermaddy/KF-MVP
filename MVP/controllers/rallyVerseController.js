app.controller('rallyVerseController', ['$scope', 'Factory', function ($scope, Factory) {
        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        var currIndex = 0;
        rallyVerseDetails();

        function rallyVerseDetails() {
            var promise = Factory.rallyVerse();
            promise.then(function resolved(response) {
                console.log(response.data)
                $scope.rallyVerseDetails = response.data
                $scope.rallyVerseItem = response.data.items
                if ($scope.rallyVerseItem) {
                    for (var i = 0; i < $scope.rallyVerseItem.length; i++) {
                        $scope.addSlide();
                    }
                }
            }, function rejected(response) {
                alert(response.status + ': ' + response.statusText);
            })
        };
        $scope.addSlide = function () {
            var newWidth = 600 + slides.length + 1;
            //console.log(slides.length)
            slides.push({
                //image: $scope.rallyVerseItem[slides.length+1].asset_url ,
                asset_url: $scope.rallyVerseItem[slides.length].asset_url,
                id:$scope.rallyVerseItem[slides.length].id,
                title: $scope.rallyVerseItem[slides.length].title,
                short_url:$scope.rallyVerseItem[slides.length].short_url,
                source:$scope.rallyVerseItem[slides.length].source
            });
        };
        }
    ]);
