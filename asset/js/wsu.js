(function($) {
  $(document).ready(function() {

    // Add loading animation when a form is submitted, when any item with a "spin" class is clicked,
    // or on any button or anchor tag lacking the .nospin class.
    $("input[type='submit'], button:not(.nospin), a:not(.nospin), .spin").click(function() {

      $(".wsu-spinner").show();


      // Test for invalid fields (HTML5) and turn off spinner explicitly if found
      if(document.querySelectorAll(":invalid").length) {
        $(".wsu-spinner").hide();
      }

    });
  });
})(jQuery)