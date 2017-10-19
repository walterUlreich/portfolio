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

  $(function(){
  $( ".burger-nav" ).bind( "tap", tapHandler );

  function tapHandler( event ){
    $( '.nav' ).toggleClass( "open" );
  }
});

})
