(function ($) {
  $(window).on('load', function () {
    // bug fix when we search from home page and then we want to go back clicking back button's browser, show the value(s) selected before.
    if ($("select[name='facet[dcterms_subject_ss][]']").val() != null) {
      $("select[name='facet[dcterms_subject_ss][]']").parent().find(".chosen-single span").eq(0).text($("select[name='facet[dcterms_subject_ss][]']").val())
    }
    if ($("select[name='facet[dcterms_educationLevel_ss][]']").val() != null) {
      $("select[name='facet[dcterms_educationLevel_ss][]']").parent().find(".chosen-single span").eq(1).text($("select[name='facet[dcterms_educationLevel_ss][]']").val())
    }
  });

  $(document).ready(function () {

    // Add loading animation when a form is submitted, when any item with a "spin" class is clicked,
    // or on any button or anchor tag lacking the .nospin class.
    $("input[type='submit'], button:not(.nospin,.menu-toggle), .spin").on('click', function () {

      $(".wsu-spinner").show();


      // Test for invalid fields (HTML5) and turn off spinner explicitly if found
      if (document.querySelectorAll(":invalid").length) {
        $(".wsu-spinner").hide();
      }

    });
    // Add placeholder to Search Input
    $("#advanced-search-form").find("input[type='search']").attr("placeholder", "Type something to search...")
    // Make Facets collapsible
    $(".search-facets-list .search-facet-items").each(function () {
      $(this).parent().find("h4").toggleClass("closed")
      $(this).toggleClass("collapsed")

    })
    $(".search-facets-list h4").on("click", function () {
      $(this).parent().find(".search-facet-items").toggleClass("collapsed")
      $(this).toggleClass("closed")
    })
    //move facets to sidebar
    facets = $(".search-facets")
    $(".sidebar-menu").prepend(facets)
    //move active facets list (if any) above pagination
    active_facets = $(".search-facets-active")
    $("#advanced-search-form").append(active_facets)
    // move filter(if any) above pagination
    filter = $(".search-filters")
    $("#advanced-search-form").append(filter)

    //Slider functionality 
    $('.image-slider').each(function() {
      var $this = $(this);
      var $group = $this.find('.slide_group');
      var $slides = $this.find('.slide');
      var bulletArray = [];
      var currentIndex = 0;
      var timeout;
      
      function move(newIndex) {
        var animateLeft, slideLeft;
        
        advance();
        
        if ($group.is(':animated') || currentIndex === newIndex) {
          return;
        }
        
        bulletArray[currentIndex].removeClass('active');
        bulletArray[newIndex].addClass('active');
        
        if (newIndex > currentIndex) {
          slideLeft = '100%';
          animateLeft = '-100%';
        } else {
          slideLeft = '-100%';
          animateLeft = '100%';
        }
        
        $slides.eq(newIndex).css({
          display: 'block',
          left: slideLeft
        });
        $group.animate({
          left: animateLeft
        }, function() {
          $slides.eq(currentIndex).css({
            display: 'none'
          });
          $slides.eq(newIndex).css({
            left: 0
          });
          $group.css({
            left: 0
          });
          currentIndex = newIndex;
        });
      }
      
      function advance() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          if (currentIndex < ($slides.length - 1)) {
            move(currentIndex + 1);
          } else {
            move(0);
          }
        }, 4000);
      }
      
      $('.next_btn').on('click', function() {
        if (currentIndex < ($slides.length - 1)) {
          move(currentIndex + 1);
        } else {
          move(0);
        }
      });
      
      $('.previous_btn').on('click', function() {
        if (currentIndex !== 0) {
          move(currentIndex - 1);
        } else {
          move(3);
        }
      });
      
      $.each($slides, function(index) {
        var $button = $('<a class="slide_btn">&bull;</a>');
        
        if (index === currentIndex) {
          $button.addClass('active');
        }
        $button.on('click', function() {
          move(index);
        }).appendTo('.slide_buttons');
        bulletArray.push($button);
      });
      
      advance();
    });

    // While searching take into consideration the active facets (if any)
    function getAllParameters() {
      var urlParams = new URLSearchParams(window.location.search);
      var params = {};

      urlParams.forEach(function (value, key) {
        params[key] = value;
      });

      return params;
    }

    function setFormValues() {
      var params = getAllParameters();
      for (var name in params) {
        if (params.hasOwnProperty(name)) {
          var value = params[name];
          var input = $('#form-search input[name="' + name + '"]');

          if (input.length === 0) {
            input = $('<input>').attr({
              type: 'hidden',
              name: name
            }).appendTo('#form-search');
          }
          input.val(value);
        }
      }
    }
    setFormValues();

    $("#contact-us").attr("action", "#contact");
  });
})(jQuery)