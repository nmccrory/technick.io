technick.config(function ($routeProvider){
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
technick.config(function (AnalyticsProvider) {
	AnalyticsProvider.setAccount('UA-80656926-1');
})
technick.run(function($FB){
  $FB.init('970654203025977');
});