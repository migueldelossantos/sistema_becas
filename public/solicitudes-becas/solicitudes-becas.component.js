angular.
	module('solicitudesBecas').
		component('solicitudesBecas', {
			templateUrl: 'solicitudes-becas/solicitudes-becas.template.html',

			controller: ['$http', '$scope',//Se incluye aquí para que al minificar los archivos js no exista problema(para que NO se borre $http )
				function SolicitudesBecasController($http,$scope){

					$scope.datos = {}; //declarar arreglo de arreglos

					$scope.pendientes = [];
					$scope.terminados = [];

					//$scope.valor = 5; //ejemplo para declarar variables

					var self = this; //BUena practica es no manipular el this directamente
					//self.matricula = '12345'; // Boleano que servirá para saber si se muestra o no un mensaje de error.//Al inicio no se muestra
					
					//localStorage.setItem("matricula","12345");

					self.validar = function(){
						$scope.matricula = localStorage.getItem("matricula");
					


						console.log(localStorage.getItem("matricula"));

						if($scope.matricula == null){
							window.location = "/#!/login";
						}
					};

					self.validar();


					
					self.imprimir = function(){
						$scope.datos = {};
						
						$http({
							method: 'GET',
							url: 'http://localhost:8000/api/v1.0/solicitudes/'+$scope.matricula

						}).success(function(data){
							//alert("success "+data)
							if(typeof(data) == 'object'){
								//console.log(data);
								if(data == ""){ //Si no se encuentra ningun usuario con ese user y ese password
									//self.dataValid = false; //Boolean activará mensaje de error en la vista
								}else{

										$scope.datos = data;

										$scope.pendientes = [];
										$scope.terminados = [];

										
										//guardar las solicitudes pendientes en un arreglo
										angular.forEach($scope.datos, function(solicitudes){

											if(solicitudes.estado == 'pendiente')
												$scope.pendientes.push(solicitudes);

											
											if(solicitudes.estado == 'terminado')
												$scope.terminados.push(solicitudes);

											
										});

								}
							}else{
								alert('Error al intentar recuperar el cliente');
							}
						}).
						error(function(){
							alert('Error al intentar recuperar el cliente');
						});

					}

					self.imprimir();


						$http({
							method: 'GET',
							url: 'http://localhost:8000/api/v1.0/users/' + $scope.matricula

						}).success(function(data){
							//alert("success "+data)
							if(typeof(data) == 'object'){
								//console.log(data);
								if(data == ""){ //Si no se encuentra ningun usuario con ese user y ese password
									//self.dataValid = false; //Boolean activará mensaje de error en la vista
								}else{
									//alert(data[0].matricula);

									$scope.dato = data;
								}
							}else{
								alert('Error al intentar recuperar el cliente');
							}
						}).
						error(function(){
							alert('Error al intentar recuperar el cliente');
						});


						$scope.remove = function(idm){

							confirmar=confirm("Esta seguro que desea eliminar"); 
							if(confirmar){  
						        $http({ 
						            method: 'DELETE',
									url: 'http://localhost:8000/api/v1.0/solicitudes/id/' + idm
						        }).success(function(data){
						        	self.imprimir();
						        	window.location = "/#!/solicitudes";
						        }).
								error(function(){
									alert('Error al intentar recuperar el cliente');
								});
							}

						};

						$scope.modificar = function(id){

							window.location = "/#!/entrada";

						};

						$scope.agregar = function(id){

							window.location = "/#!/entrada";

						};


						$scope.cerrarSesion = function() {
					  
					        localStorage.removeItem("matricula");
					        window.location = "/#!/login";
					    }









					//}
				}
			]
		});