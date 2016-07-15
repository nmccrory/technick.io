technick.directive('setClassWhenAtTop', function ($window,$timeout) {
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
          document.getElementById("mobileNavLogo").classList.remove("inactive");
          document.getElementById("mobileNavLogo").classList.add("active");
          console.log("Inside of scroll conditional");
        } else {
          element.removeClass(topClass);
          document.getElementById("mobileNavLogo").classList.remove("active");
          document.getElementById("mobileNavLogo").classList.add("inactive");
          document.getElementById("blogContainer").style.marginTop = 0;
        }
      });
    }
  };
})
