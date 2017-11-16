$(document).ready(function() {

  var scrollTop = 0;

   $(window).scroll(function(){
     scrollTop = $(window).scrollTop()

     if (scrollTop > 0) {
       $('.nav').addClass('scrolled-nav')
        $('.header').addClass('scrolled-header')
     } else {
       $('.nav').removeClass('scrolled-nav')
       $('.header').removeClass('scrolled-header')
     }

   })




})
