(function() {

	var app = angular
    	.module('ecart', []);

    app.controller('ShoppingCartController', function($scope, getDataService) {
    	// $scope.products = products;
    	getDataService.getData().then(function(data) {
	        console.log(data)        
	    });
    	$scope.cart = [];
    	// $scope.getAllProducts = function() {
    	// 	return products;
    	// };
    	
    	$scope.addToCart = function (product) {
    		var itemFound = $scope.isItemInCart(product);
			if (!(itemFound[0])) {
				$scope.cart.push(angular.extend({quantity: 1}, product));
			} else {
				itemFound[1].quantity++;
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
				} else {
					delete $scope.cart.splice(itemFound[2], 1);
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
	        return $http.get('data.json');
	    }
	});

    var products = [
    	{
    		id: '1',
    		product_img: 'http://www.bigbasket.com/media/uploads/p/s/20000487_2-bb-royal-tamarindimli.jpg',
    		brand_name: 'BB Royal',
    		product_name: 'Tamrind',
    		detail: '500gm Pouch',
    		price: '68'
    	},
    	{
    		id: '2',
    		product_img: 'http://www.bigbasket.com/media/uploads/p/s/20000487_2-bb-royal-tamarindimli.jpg',
    		brand_name: 'BB Royal',
    		product_name: 'Tamrind',
    		detail: '500gm Pouch',
    		price: '68'
    	},
    	{
    		id: '3',
    		product_img: 'http://www.bigbasket.com/media/uploads/p/s/20000487_2-bb-royal-tamarindimli.jpg',
    		brand_name: 'BB Royal',
    		product_name: 'Tamrind',
    		detail: '500gm Pouch',
    		price: '68'
    	}
    ];


})();