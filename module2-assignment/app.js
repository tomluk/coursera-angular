(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var itemBuyer = this;

	itemBuyer.toBuyList = ShoppingListCheckOffService.getToBuyItems();
	itemBuyer.buyItem = function (item) {
		ShoppingListCheckOffService.buyItem(item);
	}
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var itemBought = this;

	itemBought.boughtList = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
	var service = this;

	var toBuyList = [{name : "bags chips", quantity: 10},
					 {name : "carrots", quantity: 5},
					 {name : "beers", quantity: 5},
					 {name : "bottles of wine", quantity: 2},
					 {name : "cakes", quantity: 2}]
	var boughtList = [];

	service.buyItem = function(item){
		boughtList.push(item);
		service.delFromToButy(item);

	}

	service.getToBuyItems = function() {
		return toBuyList;
	}

	service.getBoughtItems = function() {
		return boughtList;
	}

	service.delFromToButy = function(item) {
		var index = toBuyList.indexOf(item);
		toBuyList.splice(index, 1);
	}
}

})();