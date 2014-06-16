interface IActionScope extends IExprScope {
	type: string;
	user: string;
	message: string;
	keys: string[];
	submit: () => void;
}

bosunControllers.controller('ActionCtrl', ['$scope', '$http', '$location', '$route', function($scope: IActionScope, $http: ng.IHttpService, $location: ng.ILocationService, $route: ng.route.IRouteService) {
	var search = $location.search();
	$scope.type = search.type;
	if (!angular.isArray(search.key)) {
		$scope.keys = [search.key];
	} else {
		$scope.keys = search.key;
	}
	$scope.submit = () => {
		var data = {
			Type: $scope.type,
			User: $scope.user,
			Message: $scope.message,
			Keys: $scope.keys,
		};
		$http.post('/api/action', data)
			.success((data) => {
				$location.url('/');
			})
			.error((error) => {
				alert(error);
			});
	};
}]);