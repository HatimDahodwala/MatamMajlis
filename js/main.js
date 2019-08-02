
$(document).ready(function () {
  "use strict";

  var window_width = $(window).width(),
    window_height = window.innerHeight,
    header_height = $(".default-header").height(),
    header_height_static = $(".site-header.static").outerHeight(),
    fitscreen = window_height - header_height;


  $(".fullscreen").css("height", window_height)
  $(".fitscreen").css("height", fitscreen);

  //-------- Active Sticky Js ----------//
  $(".default-header").sticky({ topSpacing: 0 });



  // -------   Active Mobile Menu-----//

  $(".menu-bar").on('click', function (e) {
    e.preventDefault();
    $("nav").toggleClass('hide');
    $("span", this).toggleClass("lnr-menu lnr-cross");
    $(".main-menu").addClass('mobile-menu');
  });


  $('.nav-item a:first').tab('show');

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
   $("nav").addClass("hide")
  } else{
    $("nav").removeClass("hide")
  }

  function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}

  // Select all links with hashes
  $('.main-menubar a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });


  $(document).ready(function () {
    $('#mc_embed_signup').find('form').ajaxChimp();
  });

  var unavailableDates = [
    { start: '2019-08-3', end: '2019-08-4' }
  ];

  $('#calendar').availabilityCalendar(unavailableDates);


  $(".fancybox").fancybox({
    openEffect: "none",
    closeEffect: "none"
  });

  $(".zoom").hover(function () {

    $(this).addClass('transition');
  }, function () {
    $(this).removeClass('transition');
  });

  // Open menu on default
  // $(".menu-bar").click();

  // Bind all images from folder
  var arrayForImages = [];
  var dir = "img/gallery/";
  var fileextension = ".jpg";
  var allslides = "";
  var imageslide = '<div class="col-lg-3 col-md-4 col-xs-6 thumb">'
    + '<a href="@path" class="fancybox" rel="ligthbox">'
    + '<img src="@path" class="zoom img-fluid " alt="">'
    + '</a>'
    + '</div>'
    for(var iCount = 1; iCount<=18;iCount++){
      allslides += imageslide.replace(new RegExp("@path", 'g'), dir + iCount + "-min" + fileextension);
      arrayForImages.push(dir + iCount + "-min" + fileextension)
    }
    $("#imageContainer").append(allslides);
    preloadImages(arrayForImages);
});

var marker;
function initMap() {
  var map = new google.maps.Map(document.getElementById('google-map'), {
    zoom: 19,
    center: { lat: 19.192556, lng: 72.858073 }
  });
  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: { lat: 19.192556, lng: 72.858073 }
  });
  marker.addListener('click', toggleBounce);
  var contentString = "<div class='address'><strong>Anjuman-E-Ezzy Malad (East)<br> - Dawoodi Bohra Jamaat</strong></div>";
  google.maps.event.addListener(marker, 'click', function () {
    // Add this line
    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
