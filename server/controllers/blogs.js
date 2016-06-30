var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');	
var Article = mongoose.model('Article'); 
module.exports = (function(){
	return{
		show: function(req, res){
			Blog.find({},null, {sort: {created_at: -1}}, function(err, posts){
				if(err){
					console.log('something went wrong');
				}else{
					console.log('retrieved posts');
					res.json(posts);
				}
			})
		},
		getBlogById: function(id, res){
			console.log(id);
			Blog.find({_id: id}, function(err, post){
				if(err){
					console.log('Unable to grab blog by ID');
				}else{
					console.log('Successfully grabbed post by ID');
					res.json(post);
				}
			})
		},
		getBlogByRoute: function(route, res){
			console.log(route);
			Blog.find({rest_route: route}, function(err, post){
				if(err){
					console.log('Unable to grab blog by ROUTE');
				}else{
					console.log('Successfully grabbed blog by route.');
					res.json(post);
				}
			})
		},
		add: function(req, res){
			console.log('inside add function');
			var blog = new Blog({title: req.body.title, author: req.body.author, content: req.body.content, rest_route: req.body.rest_route, img_url: req.body.img_url, created_at: new Date(), updated_at: new Date()});
			blog.save(function(err){
				if(err){
					console.log('unable to add post');
				}else{
					console.log('added blog post');
					res.redirect('/');
				}
			});
		},
		remove: function(id, res){
			console.log("Removed post - "+id);
			Blog.remove({_id: id}, function(err){
				if(err){
					console.log('Unable to remove post: '+id);
				}else{
					console.log('Successfully deleted post: '+id);
				}
			})
		},
		addNews: function(req, res){
			var article = new Article({title: req.body.title, article_url: req.body.article_url, text_line: req.body.text_line, src_name: req.body.src_name, img_url: req.body.img_url, created_at: new Date(), updated_at: new Date()});
			article.save(function(err){
				if(err){
					console.log("Unable to add article");
				}else{
					console.log('Saved article successfully to database.');
				}
			})
		},
		getNews: function(req, res){
			var q = Article.find({}).sort({'created_at': -1}).limit(6);
			q.exec(function(err, posts){
				if(err){
					console.log('something went wrong');
				}else{
					console.log('retrieved posts');
					res.json(posts);
				}
			})
		}
	}
})();