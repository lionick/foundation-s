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
    $(".search-results").prepend(active_facets)

    //Slider functionality 
    var sliderIndex = 0;
    var sliderTimer = null;
  
    $('.slider li:first').addClass('active');
    $('.slider-nav .nav-item:first').addClass('active');
  
    $('.slider-nav .nav-item').click(function () {
      clearInterval(sliderTimer);
      var currentIndex = sliderIndex;
      sliderIndex = $(this).index();
      if (currentIndex !== sliderIndex) {
        showSliderImage(currentIndex, sliderIndex);
      }
      sliderTimer = setInterval(showNextSliderImage, 4000);
    });
  
    function showNextSliderImage() {
      var currentIndex = sliderIndex;
      sliderIndex++;
      if (sliderIndex >= $('.slider li').length) {
        sliderIndex = 0;
      }
      showSliderImage(currentIndex, sliderIndex);
    }
  
    function showSliderImage(currentIndex, nextIndex) {
      var $currentSlide = $('.slider li').eq(currentIndex);
      var $nextSlide = $('.slider li').eq(nextIndex);
      $nextSlide.addClass('active');
      $currentSlide.animate({ left: '-100%' }, 1200, function () {
        $currentSlide.removeClass('active').css('left', '100%');
      });
      $nextSlide.css('left', '100%').animate({ left: '0' }, 1200);
      $('.slider-nav .nav-item').eq(nextIndex).addClass('active');
      $('.slider-nav .nav-item').eq(currentIndex).removeClass('active');
    }
  
    sliderTimer = setInterval(showNextSliderImage, 4000);;

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