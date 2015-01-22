angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
		
		$scope.importAlbumsFromLastFM = function(artistName)
		{
			  var albums = new Array();
			  var artistName = $scope.formData.artist;
			 // $scope.submitLastFm = function() 
			 // {
				 // if ($scope.text) 
				 // {
					
					var lastFMApiRequestLink = "http://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist="+artistName+
					"&api_key=83d674fdb0f2798509110d0ed6261672&format=JSON";
					$http.get(lastFMApiRequestLink).success(function(data) 
					{
									var albumsObjects = data.topalbums.album;
									for(var i=0; i<albumsObjects.length; i++)
									{
										albums[i]=albumsObjects[i].name
									}
								//data.topalbums.album[1].name ('Master of Puppets');
					})			
				 // }
			//  }
			  $scope.albums=albums;
					
		};
	}]);
