(function( $ ) {
    
    "use strict";
    
    //Owl Carousel
    $(".owl-carousel").each(function() {
        var $this = $(this);
        $this.owlCarousel({
          //items : 5,
          pagination: false,
          mouseDrag: true,
          touchDrag: true,
        });
        // Custom Navigation Events
        $this.parent().find(".next").click(function(){
          $this.trigger('owl.next');
        });
        $this.parent().find(".prev").click(function(){
          $this.trigger('owl.prev');
        });
    });
    
    //Slick slider
    $('.bks-post-slider').slick({
      dots: true,
      responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
  });
  
  //Light slider
  $('#bks-testimonial-slider').lightSlider({
        gallery:true,
        autoWidth: false,
        item:1,
        thumbItem:9,
        slideMargin: 0,
        speed:500,
        auto:false,
        loop:true,
        enableTouch:true,
        enableDrag:true,

        onSliderLoad: function() {
            $('#bks-testimonial-slider').removeClass('cS-hidden');
        }  
    });
    
    //Back to top
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
 
})( jQuery );
