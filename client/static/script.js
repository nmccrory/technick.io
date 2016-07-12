var mccroryModule = angular.module('BlogApp', ['ngRoute', 'ngSanitize', 'djds4rce.angular-socialshare', 'yaru22.angular-timeago', 'truncate', 'angular-google-analytics']);

mccroryModule.config(function ($routeProvider){
	$routeProvider
	.when('/', {
		cache: false,
		templateUrl: 'partials/home.html'
	})
	.when('/portfolio',{
		templateUrl: 'partials/portfolio.html'
	})
	.when('/about',{
		templateUrl: 'partials/about.html'
	})
	.when('/admin/main', {
		templateUrl: 'partials/admin.html'
	})
	.when('/archive', {
		templateUrl: 'partials/archive.html'
	})
	.when('/blogs/:blogId', {
		cache: false,
		controller: 'soloBlogController as SBC',
		templateUrl: 'partials/blog.html'
	})
	.when('/resume', {
		templateUrl: 'partials/resume.html'
	})
	.otherwise({
		redirectTo: '/'
	})
})
mccroryModule.config(function (AnalyticsProvider) {
	AnalyticsProvider.setAccount('UA-80656926-1');
})
mccroryModule.run(function($FB){
  $FB.init('970654203025977');
});
mccroryModule.factory('BlogFactory',function($http, $location){
	var blogs = [];
	var factory = {};
    factory.getBlogs = function(callback){
    	$http.get('/blogs').success(function(output){
    		callback(output);
    	})
    }
    factory.getBlogByRoute = function(rest_route, callback){
    	$http.get('/blogs/'+rest_route).success(function(output){
    		callback(output);
    	})
    }
    factory.addPost = function(info, callback){
    	$http.post('newpost', info).success(function(){
    		$location.path('/');
    		callback();
    	})
    }
    factory.addNews = function(info, callback){
    	$http.post('addNews', info).success(function(){
    		$location.path('/');
    		callback();
    	})
    }
    factory.getNews = function(callback){
    	$http.get('getNews').success(function(reposts){
    		callback(reposts);
    	})
    }
    factory.deletePost = function(info, callback){
    	$http.get('deletepost/'+info).success(function(){
    		$location.path('/');
    		callback();
    	})
    }
    
	return factory;
})
mccroryModule.factory('ProjectFactory',function($http, $location){
	var projects = [];
	var factory = {};
    factory.getProjects = function(callback){
    	$http.get('/projects').success(function(output){
    		callback(output);
    	})
    }
    factory.addProject = function(info, callback){
    	$http.post('/newproject', info).success(function(){
    		$location.path('/');
    		callback();
    	})
    }
    
	return factory;
})
mccroryModule.controller('soloBlogController', function(BlogFactory, $scope, $routeParams){
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
mccroryModule.controller('blogsController', function(BlogFactory, ProjectFactory, $scope , $routeParams, $route, $timeout){

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
mccroryModule.directive('setClassWhenAtTop', function ($window,$timeout) {
  var $win = angular.element($window); // wrap window object as jQuery object
  
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var topClass = attrs.setClassWhenAtTop;// get CSS class from directive's attribute value 
      offsetTop = element.prop('offsetTop');// get element's offset top relative to document
      elementHeight = document.getElementById('navcontainer').clientHeight;
      $win.on('scroll', function (e) {
        if ($window.pageYOffset >= offsetTop) {
          element.addClass(topClass);
          document.getElementById("blogContainer").style.marginTop = (elementHeight+12)+"px";
          // var c = document.getElementsByClassName("navbar-item");
          // for(var i=0;i<c.length;i++){
          // 	c[i].style.color = "white";
          //}
          document.getElementById("mobileNavLogo").classList.remove("inactive");
          document.getElementById("mobileNavLogo").classList.add("active");
          console.log("Inside of scroll conditional");
        } else {
          element.removeClass(topClass);
          document.getElementById("mobileNavLogo").classList.remove("active");
          document.getElementById("mobileNavLogo").classList.add("inactive");
          document.getElementById("blogContainer").style.marginTop = 0;
          // var c = document.getElementsByClassName("navbar-item");
          // for(var i=0;i<c.length;i++){
          // 	c[i].style.color = "black";
          //}
        }
      });
    }
  };
})
//.replace(/-a/g, function(match){text.indexOf(match)})
mccroryModule.filter('blogFormat', function(){
	return function(text){
		if(text !== undefined){
			var cleanText = text.replace(/-n/g, '<br>').replace(/-c/g, "<div class='code'><p>").replace(/c-/g, '</p></div>').replace(/-h5/g, '<h5>').replace(/h5-/g, '</h5>').replace(/-h3/g, '<h3>').replace(/h3-/g, '</h3>').replace(/-a/g, '<a href="').replace(/-ref/g, '">').replace(/a-/g, '</a>');
			
			return cleanText;
		}
	}
})
var socialShare = angular.module()