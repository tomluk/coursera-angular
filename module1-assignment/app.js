(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
	// $scope.message = "Enjoy";

	$scope.checkData = function() {
		if ($scope.data == undefined) {
			$scope.message = "Please enter data first";
			return;
		}
		var splitedData = $scope.data.split(",");
		var len = splitedData.length;
		for (let i = 0; i < splitedData.length; i++) {
  			if (splitedData[i] == ""){
  				len--;
  			}
		}
		console.log(len);
		if (len <= 3 && len > 0){
			$scope.message = "Enjoy!";
		}
		else if (len > 3){
			$scope.message = "Too much!";
		}
	}

};

})();
