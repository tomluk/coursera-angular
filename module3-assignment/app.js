(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var menu = this;
	menu.found = [];
	menu.searchTerm = "";

	menu.removeItem = function(itemIndex) {
		menu.found.splice(itemIndex, 1);
	}

	menu.getMatchedMenuItems = function(searchTerm) {
		var matchedMenuItemsPromise = MenuSearchService.getMatchedMenuItems(searchTerm);
		matchedMenuItemsPromise.then(function(found_items){
			// console.log(found_items);
			menu.found = found_items;
		})
	}
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
	var service = this;
	service.getMatchedMenuItems = function(searchTerm){
	     return $http({
	      method: "GET",
	      url: (ApiBasePath + "/menu_items.json"),
	    }).then(function (response) {
	    	// console.log(searchTerm);
	    	var found_items = [];
	    	var items = response.data.menu_items;
	    	for (var index = 0; index < items.length; index++) {
	    		if (searchTerm != undefined){
	    			searchTerm = searchTerm.toUpperCase();
	    		}
	    		var menuElement = (items[index].name).toUpperCase();
	    		if (menuElement.indexOf(searchTerm) != -1) {

	    			var unique_counter = 0;
	    			for (var jndex = 0; jndex < found_items.length ; jndex++) {
	    				if (found_items[jndex].toUpperCase().indexOf(menuElement) != -1) {
	    					unique_counter = 1;
	    				}
	    			}
	    			if (unique_counter == 0){
	    			found_items.push(items[index].name);
	    			}
	    		}
	    	}
	    	return found_items;	
	    });

  };
}

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    restrict: "A",
    scope :  '<',


    controller: NarrowItDownController,
    controllerAs: 'menu',
    
    bindToController: true
  };

  return ddo;
}

})();