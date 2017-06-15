angular.
	module('informacionHogar').
		component('informacionHogar', {
			templateUrl: 'informacion-hogar/informacion-hogar.template.html',
			controller: ['$http', //Se incluye aquí para que al minificar los archivos js no exista problema(para que NO se borre $http )
				function informacion_hogarController($http){
					var self = this; //Buena practica es no manipular el this directamente
					
					//metodo para dicernir visualmente si es admin o alumno ===Ed=
					if(localStorage.getItem("isAdmin")){						//
						self.solicitudToMenu = "Menú principal";				//	
					}else{														//
						self.solicitudToMenu = "Regresar a solicitudes";		//
					}															//
					//==========================================================//
					
					//=Cambiar la locacion de la pagina en base a si es admin o no Ed=
					self.menuChangue = function(){									//
						if(localStorage.getItem("isAdmin")){
							console.log("is admin to #!menu_admin");				//
							window.location = "/#!/menu_admin";						//	
						}else{														//
							console.log("is not admin to #!solicitudes");
							window.location = "/#!/solicitudes";						//
						}															//
					}																//
					//================================================================
					
					
					self.method = 'POST';
					self.solicitudId = localStorage.getItem('idsolicitud'); //Pruebas de desarrollo solicitud == 1 <-- Recuperar del local storage
 					//self.solicitud = localStorage.getItem("idSolicitud");


 					object = $http({
						method 	: 	'GET',
						url 	: 	'http://localhost:8000/api/v1.0/informacionHogar/'+ self.solicitudId
					}).success(function(data){
						object = data[0];
						console.log(object);
						if(object){
							self.tipoCasa		= object.tipoCasa;
							self.materialParedes= object.materialParedes;
							self.materialPiso	= object.materialPiso;
							self.materialTecho	= object.materialTecho;
							self.habitantes 	= parseInt(object.habitantes);
							self.cuartos 		= parseInt(object.cuartos);
							self.banios 		= parseInt(object.banios);
							self.focos 			= parseInt(object.focos);
							self.method = 'PUT';
						}else{
							self.materialPiso	= "";
							self.materialTecho	= "";
							self.habitantes 	= 0;
							self.cuartos 		= 0;
							self.banios 		= 0;
							self.focos 			= 0;
						}   
					}).error(function(err){
						console.log(err);
					});
					self.saveData = function(){
						self.materialPisoError = false;
						self.materialTechoError = false;
						if(/^[a-z][a-z]*$/.test(self.materialPiso)==false){
							self.materialPisoError = true;
							return;
						}
						if(/^[a-z][a-z]*$/.test(self.materialTecho)==false){
							self.materialTechoError = true;
							return;
						}
						self.data =  {
							"solicitudId" : localStorage.getItem("idsolicitud"),
							"tipoCasa" : self.tipoCasa,
							"materialParedes" : self.materialParedes,
							"materialPiso" : self.materialPiso,
							"materialTecho" : self.materialTecho,
							"habitantes" : self.habitantes,
							"cuartos" : self.cuartos,
							"banios" : self.banios,
							"focos" : self.focos						
						};
						$http({
							method: self.method,
							//url: 'localhost:8000/api/v1.0/users/' + self.matricula + "/" + self.password //NO Funciona
							url: 'http://localhost:8000/api/v1.0/informacionHogar',   //Es necesario ponerle http:// al inicio para que funcione
							data : self.data,  //Pero también funciona enviarlo como simple objeto
							headers : {//Parametro opcional //Si se enviará la data a Node js no es necesario definir un 'Content-Type' pues por default el 'Content-Type' de $http es 'application/json'
								//'Content-Type' : 'application/x-www-form-urlencoded' //codificacion usada por defecto en PHP(con = y &) y en muchos otros servidores, Node js la soporta pero la 'data' se debe enviar en forma: 'matricula='+self.matricula+'&password='+self.password+
			                    //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			                    'Content-Type' : 'application/json' //Codificacion por defecto de Angular, y soportada por Node Js(No es soportado directamente por PHP) con esta tipo de contenido se puede enviar 'data' como un objeto o un String de objeto(stringify)
							}
						}).success(function(data){
							window.location = "#!/gastos_familiares";
						}).
						error(function(){
							alert('Error al intentar agregar informacion del hogar');
						});
					};
					self.regresar = function(){
						window.location = "#!/gastos_alumno";	
					};				
				}
			]
		});
