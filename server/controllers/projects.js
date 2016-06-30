var mongoose = require('mongoose');
var Project = mongoose.model('Project');	 
module.exports = (function(){
	return{
		show: function(req, res){
			Project.find({}, function(err, projects){
				if(err){
					console.log('Unable to grab projects.');
				}else{
					res.json(projects);
				}
			})
		},
		add: function(req, res){
			var project = new Project({title: req.body.title, img_url: req.body.img_url, app_url: req.body.app_url,github_link: req.body.github,description: req.body.description,  created_at: new Date(), updated_at: new Date()});
			project.save(function(err){
				if(err){
					console.log('unable to add project');
				}else{
					console.log('successfully added project');
					res.redirect('/');
				}
			})
		}
	}
})();