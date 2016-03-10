(function() {

	var app = angular
    	.module('ecart', []);

    app.controller('ShoppingCartController', function($scope, getDataService) {
    	getDataService.getData().then(function(data) {
	        $scope.products = data.data;
	    });
    	$scope.cart = [];
    	$scope.getAllProducts = function() {
    		return $scope.products;
    	};

    	$scope.checkCartOnLoad = function() {
    		if(localStorage.coviamCart) {
    			$scope.cart = JSON.parse(localStorage.coviamCart);
    		}
    		
    	};
    	
    	$scope.addToCart = function (product) {
    		var itemFound = $scope.isItemInCart(product);
			if (!(itemFound[0])) {
				$scope.cart.push(angular.extend({quantity: 1}, product));
				localStorage.coviamCart = JSON.stringify($scope.cart);
			} else {
				itemFound[1].quantity++;
				localStorage.coviamCart = JSON.stringify($scope.cart);
			}
		};

		$scope.isItemInCart = function (product) {
			var found = false;
			var foundedtItem;
			var indexOfFoundedItem;
			$scope.cart.forEach(function (item, index) {
				if (item.id === product.id) {
					foundedtItem = item;
					found = true;
					indexOfFoundedItem = index;
				}
			});
			return [found, foundedtItem, indexOfFoundedItem];
		}

		$scope.removeItem = function(product, removeAll) {
			var itemFound = $scope.isItemInCart(product);
			if (itemFound[0]) {
				if(itemFound[1].quantity > 1 && !removeAll) {
					itemFound[1].quantity--;
					localStorage.coviamCart = JSON.stringify($scope.cart);
				} else {
					delete $scope.cart.splice(itemFound[2], 1);
					localStorage.coviamCart = JSON.stringify($scope.cart);
				}
			}
		};

		$scope.getTotalCartPrice = function () {
			var total = 0;
			$scope.cart.forEach(function (product) {
				total += product.price * product.quantity;
			});
			return total;
		};

	});

	app.service('getDataService', function ($http) {
	    this.getData = function () {
	        return $http.get('../data/data.json');
	    }
	});

})();