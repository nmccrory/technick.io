var blogs = require('../server/controllers/blogs.js');
var projects = require('../server/controllers/projects.js');
module.exports = function(app){
	app.get('/', function(req, res){
		blogs.show(req, res);
	})
	app.get('/admin/main', function(req, res){
		blogs.show(req, res);
	})
	app.post('/newpost', function(req, res){
		blogs.add(req, res);
	})
	app.get('/blogs', function(req, res){
		blogs.show(req, res);
	})
	app.get('/blogs/:rest', function(req, res){
		blogs.getBlogByRoute(req.params.rest, res);
	})
	app.get('/projects', function(req, res){
		projects.show(req, res);
	})
	app.post('/newproject', function(req, res){
		projects.add(req, res);
	})
	app.post('/addNews', function(req, res){
		blogs.addNews(req, res);
		console.log('made it to routes');
	})
	app.get('/getNews', function(req, res){
		blogs.getNews(req, res);
	})
	app.get('/deletepost/:id', function(req, res){
		blogs.remove(req.params.id, res);
	})
}