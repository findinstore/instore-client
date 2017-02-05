function scrollTo(element, to, duration, scrollDirection, callback, context) {
  var start = element[scrollDirection],
      change = to - start,
      increment = 10;

  var animateScroll = function(elapsedTime) {
      elapsedTime += increment;
      var position = easeInOut(elapsedTime, start, change, duration);
      element[scrollDirection] = position;
      if (elapsedTime < duration ) {
          setTimeout(function() {
              animateScroll(elapsedTime);
          }, increment);
      } else {
        if ( callback ) {    
          if ( context ) {
            callback.call(context);
          } else {            
            callback();
          }     
        }
      }
  };

  animateScroll(0);
}

function easeInOut(currentTime, start, change, duration) {
  currentTime /= duration / 2;
  if (currentTime < 1) {
      return change / 2 * currentTime * currentTime + start;
  }
  currentTime -= 1;
  return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
}

export default scrollTo;
