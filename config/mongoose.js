var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://mccrorymodule_admin:test@dbh55.mongolab.com:27557/heroku_93zhg4bx');

var models_path = __dirname + '/../server/models';

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') > 0){
		require(models_path + '/' + file);
	}
})