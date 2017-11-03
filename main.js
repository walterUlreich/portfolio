$( document ).ready(function() {
  var offset = 70

$('#about-link').click(function(event) {
  event.preventDefault()
  $($(this).attr('href'))[0].scrollIntoView()
  scrollBy(0, -offset)
});

  var offset2 = 90

  $('#portfolio-link').click(function(event) {
  event.preventDefault()
  $($(this).attr('href'))[0].scrollIntoView()
  scrollBy(0, -offset2)
  });

  var offset3 = 30

  $('#contact-link').click(function(event) {
  event.preventDefault()
  $($(this).attr('href'))[0].scrollIntoView()
  scrollBy(0, -offset3)
  });

  $(".burger-nav").on("click", function() {
    $(".nav").toggleClass("open")
  })

  var scrollTop = 0;

   $(window).scroll(function(){
     scrollTop = $(window).scrollTop()
      console.log(scrollTop)

     if (scrollTop >= 60) {
       $('.header').addClass('scrolled')
     } else if (scrollTop < 60) {
       $('.header').removeClass('scrolled')
     }

   })


})
