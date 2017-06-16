//API Routers
var express = require('express');

exports.addAPIRouter = function(app, GastosCtrl){ //Siempre hay que utilizar el export cuando queremos registrar una funcion
	var gastos = express.Router();
	gastos.route('/gastos')
		.get(GastosCtrl.findGastosBySolicitud)
		.post(GastosCtrl.addGastos)
		.put(GastosCtrl.updateGastos);
		
	gastos.route('/gastos/:solicitud')
		.get(GastosCtrl.findGastosBySolicitud)
		.put(GastosCtrl.updateGastos)
		.delete(GastosCtrl.deleteGastos); 
		

	app.use("/api/v1.0", gastos); //Usar en la ruta '/api/v1.0', las rutas/api definidas en el objeto  users
}