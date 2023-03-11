(function($) {
  $(window).on('load', function() {
    // bug fix when we search from home page and then we want to go back clicking back button's browser, show the value(s) selected before.
    if($("select[name='facet[dcterms_subject_ss][]']").val()!= null){
      $("select[name='facet[dcterms_subject_ss][]']").parent().find(".chosen-single span").eq(0).text($("select[name='facet[dcterms_subject_ss][]']").val())
    }
    if($("select[name='facet[dcterms_educationLevel_ss][]']").val()!= null){
      $("select[name='facet[dcterms_educationLevel_ss][]']").parent().find(".chosen-single span").eq(1).text($("select[name='facet[dcterms_educationLevel_ss][]']").val())
    }
   });

  $(document).ready(function() {
    
    // Add loading animation when a form is submitted, when any item with a "spin" class is clicked,
    // or on any button or anchor tag lacking the .nospin class.
    $("input[type='submit'], button:not(.nospin,.menu-toggle), .spin").on('click', function() {

      $(".wsu-spinner").show();


      // Test for invalid fields (HTML5) and turn off spinner explicitly if found
      if(document.querySelectorAll(":invalid").length) {
        $(".wsu-spinner").hide();
      }

    });
    // Add placeholder to Search Input
    $("#advanced-search-form").find("input[type='search']").attr("placeholder", "Type something to search...")
    // Make Facets collapsible
    $(".search-facets-list .search-facet-items").each(function(){
      $(this).parent().find("h4").toggleClass("closed")
      $(this).toggleClass("collapsed")

    })
    $(".search-facets-list h4").on("click", function(){
      $(this).parent().find(".search-facet-items").toggleClass("collapsed")
      $(this).toggleClass("closed")
    })
    $("#contact-us").attr("action", "#contact");
  });
})(jQuery)