technick.factory('BlogFactory',function($http, $location){
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

technick.factory('ProjectFactory',function($http, $location){
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