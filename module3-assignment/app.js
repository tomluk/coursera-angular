(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController ', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	console.log("HALO");
	var menu = this;
	menu.found = [];
	menu.searchItem = "";

	menu.removeItem = function(itemIndex) {
		menu.found.splice(itemIndex, 1);
	}

	menu.getMatchedMenuItems = function(searchTerm) {
		var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
		promise.then(function (response) {
			menu.found = response.data;
		})
		.catch(function (error) {
			console.log("Something went terribly wrong.");
		});
		}
}


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'narrow',
    bindToController: true
  };

  return ddo;
}



MenuSearchService.$inject = ['http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
	var service = this;
	service.getMatchedMenuItems = function(searchTerm){
	    var response = $http({
	      method: "GET",
	      url: (ApiBasePath + "/categories.json")
	    });
 
	    return response;
  };
}

})()