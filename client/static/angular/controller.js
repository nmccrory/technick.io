technick.controller('soloBlogController', function(BlogFactory, $scope, $routeParams){
	var that = this;
	this.current_post = {};

	this.loadPost = function(rest){
		BlogFactory.getBlogByRoute(rest, function(data){
				that.current_post = data[0];
				that.twitterURI = "http://twitter.com/share?text="+that.current_post.title+"&url=https://technick.io/%23/blogs/"+that.current_post.rest_route;
			})
	};
	this.loadPost($routeParams.blogId);

	this.loadTimeline = function(){
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
	}
	this.loadTimeline();

})
technick.controller('blogsController', function(BlogFactory, ProjectFactory, $scope , $routeParams, $route, $timeout){

	var that = this;

	this.clock = "loading clock..."; // initialise the time variable
    this.tickInterval = 1000 //ms

    var tick = function() {
        that.clock = Date.now() // get the current time
        $timeout(tick, that.tickInterval); // reset the timer
    }

    // Start the timer
    $timeout(tick, $scope.tickInterval);

	$timeout(function(){
		twttr.widgets.load();
	}, 200);

	this.leftNavExpand = function(){
		document.getElementById('navbarBackgroundLeft').classList.add('navbarBackgroundLeft');
		document.getElementById('leftSideNavbar').classList.remove('leftSideNavbar');
		document.getElementById('leftSideNavbar').classList.add('leftSideNavbar_active');
	}
	this.leftNavClose = function(){
		document.getElementById('navbarBackgroundLeft').classList.remove('navbarBackgroundLeft');
		document.getElementById('leftSideNavbar').classList.remove('leftSideNavbar_active');
		document.getElementById('leftSideNavbar').classList.add('leftSideNavbar');
	}
	this.rightNavExpand = function(){
		document.getElementById('navbarBackgroundRight').classList.add('navbarBackgroundRight');
		document.getElementById('rightSideNavbar').classList.remove('rightSideNavbar');
		document.getElementById('rightSideNavbar').classList.add('rightSideNavbar_active');
	}
	this.rightNavClose = function(){
		document.getElementById('navbarBackgroundRight').classList.remove('navbarBackgroundRight');
		document.getElementById('rightSideNavbar').classList.remove('rightSideNavbar_active');
		document.getElementById('rightSideNavbar').classList.add('rightSideNavbar');
	}
	this.trendNavStatus = true;
	this.trendNavRight = function(){
		document.getElementById("trendingPieceWrapper").style.marginLeft="-100%";
		that.trendNavStatus = false;
	}
	this.trendNavLeft = function(){
		document.getElementById("trendingPieceWrapper").style.marginLeft = "0px";
		that.trendNavStatus = true;
	}
	this.getPosts = function(){
		BlogFactory.getBlogs(function(data){
			that.posts = data;
			that.current_post = data[0];
			if(that.posts.length > 6){
				this.recent_status = true;
			}
			that.twitterURI = "http://twitter.com/share?text="+that.current_post.title+"&url=https://technick.io/%23/blogs/"+that.current_post.rest_route;
		})
	}

	this.getPosts();
	this.addPost = function(){
		console.log('Adding post');
		BlogFactory.addPost(that.blogPost, function(data){
			that.getPosts();
		})
	}
	this.getProjects = function(){
		ProjectFactory.getProjects(function(data){
			console.log('Retrieved projects');
			that.projects = data;
			console.log(that.projects);
		})
	}
	that.getProjects();

	this.addProject = function(){
		ProjectFactory.addProject(that.portfolio, function(data){
			that.getProjects();
		})
	}
	this.deletePost = function(){
		BlogFactory.deletePost(that.deletePost.id, function(data){
			that.getProjects();
		})
	}
	//news posting
	this.addNews = function(){
		console.log(that.news_repost);
		BlogFactory.addNews(that.news_repost, function(data){
			console.log('Added news article - '+that.news.title);
		})
	}
	this.getNews = function(){
		BlogFactory.getNews(function(data){
			that.news_piece = data[0];
			that.news = data; 
		})
	}
	this.getNews();

	this.loadTimeline = function(){
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
	}
	this.loadTimeline();
})