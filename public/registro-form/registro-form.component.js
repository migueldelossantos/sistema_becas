angular.
	module('registroForm').
		component('registroForm',{
			templateUrl: 'registro-form/registro-form.template.html',
			controller: ['$http',
				function RegistroFormController($http){
					var self = this;

					self.carreras = ['Lic. en Informática',
									'Ing. en Agronomía',
									'Lic. en Administración'];

					self.semestres = ['1°','2°','3°','4°','5°','6°','7°','8°','9°','10°'];

					self.grupos = [];
					self.valueGrupo = function(){
						if(self.carrera == 'Lic. en Informática'){
							if (self.semestre == '1°'){
								self.grupos = ['101-A'];
							}else if (self.semestre == '2°') {
								self.grupos = ['201-A'];
							}else if (self.semestre == '3°'){
								self.grupos = ['301-A'];
							}else if (self.semestre == '4°'){
								self.grupos = ['401-A'];
							}else if (self.semestre == '5°'){
								self.grupos = ['501-A'];
							}else if (self.semestre == '6°'){
								self.grupos = ['601-A'];
							}else if (self.semestre == '7°'){
								self.grupos = ['701-A'];
							}else if (self.semestre == '8°'){
								self.grupos = ['801-A'];
							}else if (self.semestre == '9°'){
								self.grupos = ['901-A'];
							}else if (self.semestre == '10°'){
								self.grupos = ['1001-A'];
							}
						}else if (self.carrera == 'Ing. en Agronomía'){
							if (self.semestre == '1°'){
								self.grupos = ['102-A'];
							}else if (self.semestre == '2°') {
								self.grupos = ['202-A'];
							}else if (self.semestre == '3°'){
								self.grupos = ['302-A'];
							}else if (self.semestre == '4°'){
								self.grupos = ['402-A'];
							}else if (self.semestre == '5°'){
								self.grupos = ['502-A'];
							}else if (self.semestre == '6°'){
								self.grupos = ['602-A'];
							}else if (self.semestre == '7°'){
								self.grupos = ['702-A'];
							}else if (self.semestre == '8°'){
								self.grupos = ['802-A'];
							}else if (self.semestre == '9°'){
								self.grupos = ['902-A'];
							}else if (self.semestre == '10°'){
								self.grupos = ['1002-A'];
							}
						}else if (self.carrera == 'Lic. en Administración') {
							if (self.semestre == '1°'){
								self.grupos = ['103-A','103-B'];
							}else if (self.semestre == '2°') {
								self.grupos = ['203-A','203-B'];
							}else if (self.semestre == '3°'){
								self.grupos = ['303-A','303-B'];
							}else if (self.semestre == '4°'){
								self.grupos = ['403-A','403-B'];
							}else if (self.semestre == '5°'){
								self.grupos = ['503-A','503-B'];
							}else if (self.semestre == '6°'){
								self.grupos = ['603-A','603-B'];
							}else if (self.semestre == '7°'){
								self.grupos = ['703-A','703-B'];
							}else if (self.semestre == '8°'){
								self.grupos = ['803-A','803-B'];
							}else if (self.semestre == '9°'){
								self.grupos = ['903-A','903-B'];
							}else if (self.semestre == '10°'){
								self.grupos = ['1003-A','1003-B'];
							}
						}
					}

					self.estadosCivil = ['Soltero/a','Casado/a','Viudo/a','Divorciado/a'];

					self.estados = ['Oaxaca','Puebla','Guerrero','Chiapas','Veracruz'];
					self.estado = self.estados[0];

					self.parentescos = ['Padre','Madre','Abuelos','Tio/a','Primo/a'];

					self.addUser = function(){
						//alert("Activa funcion addUser");
						$http({
							method: 'POST',
							url: 'http://localhost:8000/api/v1.0/users',
							data: 'matricula='+self.matricula+
								'&password='+self.password+
								'&password2='+self.password2+
								'&nombre='+self.nombre+
								'&apellido1='+self.apellido1+
								'&apellido2='+self.apellido2+
								'&fechaNac='+self.fechaNac+
								'&carrera='+self.carrera+
								'&semestre='+self.semestre+
								'&grupo='+self.grupo+
								'&sexo='+self.sexo+
								'&idiomaExt='+self.idiomaExt+
								'&edoCivil='+self.edoCivil+
								'&telefono='+self.telefono+
								'&recidencia='+self.recidencia+
								'&calle='+self.calle+
								'&numCalle='+self.numCalle+
								'&colonia='+self.colonia+
								'&municipio='+self.municipio+
								'&estado='+self.estado+
								'&nombreHuesped='+self.nombreHuesped+
								'&parentesco='+self.parentesco,
							headers: {'Content-Type':'application/x-www-form-urlencoded'}

						}).
						success(function(data){
							alert("Registro Realizado Exitosamente.! :)");
							window.location="#!/notificacion";
						}).
						error(function(){
							alert("Error al registrar Usuario! :'(");
						});
					}
					self.cancel = function(){
						alert("Registro Cancelado! :'(");
						window.location = "/#!/login";
					}
				}
			]
		});
