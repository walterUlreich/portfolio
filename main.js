$(document).ready(function() {

  console.log("Ready!")

  var scrollTop = 0;

   $(window).scroll(function(){
     scrollTop = $(window).scrollTop()

     if (scrollTop >= 60) {
       $("#arrow").show()
     } else if (scrollTop < 60) {
       $("#arrow").hide()
     }

   })
   
})
