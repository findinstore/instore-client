function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export function debouncePromise(func, wait, immediate) {
  var timeout;
  return function() { 
    var context = this, args = arguments;   
    return new Promise(function(res, rej) {
      var later = function() {
        timeout = null;
        if (!immediate) {
          res( func.apply(context, args) );
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        res( func.apply(context, args) );
      }
    });
  }
};

export default debounce;