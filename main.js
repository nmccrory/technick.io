require('./config/mongoose.js');


var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(path.join(__dirname, './client/static')));
//app.set('views', path.join(__dirname, '../client/views'));

// var port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var port = process.env.PORT || 8000;

app.listen(port, function(){
	console.log('Server listening...');
})

require('./config/routes.js')(app);