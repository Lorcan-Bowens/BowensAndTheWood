/**
 * Checks to see if the slide is visible enough.
 * elem = element to check.
 * amountVisible = amount that should be visible. Either in percent or px. If
 *                it's not defined then all of the slide must be visible.
 *
 * Returns true or false
 */
function isVisible(elem, amountVisible) {
  // Get the top and bottom of the window;
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  // Get the top, bottom, and height of the slide;
  var elemTop = $(elem).offset().top;
  var elemHeight = $(elem).height();
  var elemBottom = elemTop + elemHeight;
  
  // If there is no amountVisible defined then check to see if the whole slide
  // is visible.
  if (typeof(amountVisible) == 'undefined' || amountVisible == '') {
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
    && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
  }
  else {
    var missing = 0;
    
    // Find out how much of the slide is missing from the top.
    if (elemTop < docViewTop) {
      missing += docViewTop - elemTop;
    }

    // Find out how much of the slide is missing from the bottom.
    if (elemBottom > docViewBottom) {
      missing += elemBottom - docViewBottom;
    }
    
    // If user specified a percentage then find out if the current shown percent
    // is larger than the allowed percent.
    // Otherwise check to see if the amount of px shown is larger than the
    // allotted amount.
    if (isNaN(amountVisible)) {
      return (((missing/elemHeight)*100) < (100 - parseInt(amountVisible)));
    }
    else {
      return (missing < (elemHeight-amountVisible));
    }
  }
}

/**
 * Pauses the slideshow if not enough of it is showing.
 * .slider = The ID of the slide
 * amountVisible = The amount in pixels or percentage that has to be visible.
 */
function pauseIfHidden(.slider, amountVisible) {
  // Make sure the id exists on the page.
  if ($(.slider).length) {
    console.info('hello');
    // Check everytime the user scrolls the page.
    var slideshowIsPaused = false;
    $(window).scroll(function() {
      // If the slideshow is visible and it is paused then resume.
      // otherwise if the slideshow is not visible and it is not paused then
      // pause it.
      if (isVisible(.slider, amountVisible) && slideshowIsPaused) {
        $(.slider).cycle('resume');
        slideshowIsPaused = false;
      }
      else if (!isVisible(.slider, amountVisible) && !slideshowIsPaused) {
        $(.slider).cycle('pause');
        slideshowIsPaused = true;
      }
    });
  }
}

// This calls our pause function.
$(document).ready(function() {
  /**
   * pauseIfHidden(slideshow [, amountVisible]);
   * slideshow = the ID of the div wrapping the slideshow.
   * amountVisible = either the percentage or the amount in px that needs to be
   *                 showing before it is paused.
   * If you don't specify the amountVisible then it will require the whole slide
   * to be visible.
   *
   * Usage examples:
   * // Requre the whole slideshow to be shown.
   * pauseIfHidden('.slider_singleframe_teaser_section_frontpage-block_1');
   *
   * // Require 50% of the slideshow to be shown.
   * pauseIfHidden('.slider_singleframe_teaser_section_frontpage-block_1', '50%');
   *
   * // Require 250px in height of the slideshow to be shown.
   * pauseIfHidden('.slider_singleframe_teaser_section_frontpage-block_1', 250);
   */
  pauseIfHidden('.slider_singleframe_teaser_section_frontpage-block_1');
});