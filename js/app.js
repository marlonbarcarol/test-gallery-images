var app = angular.module("app", []);
app.controller("imageGridController", function($scope, $http) {
	"use strict";
	var imagesService = 'http://marlonbarcarol.com/tests/modal/images.json';
	$scope.images = [];
	$http.get(imagesService).then(function(response) {
		/* If request success */
		$scope.images = response.data.gallery;
		console.log("images success", $scope.images);
	}, function() {
		/* If request fail */
		$scope.images = { error : "Fail to get images. Please refresh your page, if the problem persists get in touch." };
	});

	$scope.modal = {
		active : false,
		current  : {},
		close    : function() {
			$scope.modal.active = false;
			$scope.modal.current = {};
		},
		/* Param = Object */
		open     : function($event, image) {
			$event.preventDefault();
			$scope.modal.current = image;
			$scope.modal.active = true;
		},
		next     : function() {
			var currentIndex,
			image = $scope.images.find(function(element, index) {
				if($scope.modal.current.id == element.id) {
					currentIndex = index;
				}
				return false;
			});
			image = $scope.images[currentIndex+1];
			if(!!image) {
				$scope.modal.current = image;
			}else {
				if($scope.images.length > 0) {
					$scope.modal.current = $scope.images[0];
				}
			}
		},
		prev     : function() {
			var currentIndex,
			image = $scope.images.find(function(element, index) {
				if($scope.modal.current.id == element.id) {
					currentIndex = index;
				}
				return false;
			});
			image = $scope.images[currentIndex-1];
			if(!!image) {
				$scope.modal.current = image;
			}else {
				if($scope.images.length > 0) {
					$scope.modal.current = $scope.images[$scope.images.length-1];
				}
			}
		}
	};
});