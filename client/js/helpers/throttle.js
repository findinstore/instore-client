module.exports = function throttle(fn, delay) {
  var timer, last;
  return function() {
    var now = + new Date(),
        ctx = this,
        args = arguments;
    if (last && now < last + delay) {
        clearTimeout(timer);
        timer = setTimeout( function() {
          last = now;
          fn.apply(ctx, args);
        }, delay - now + last);
    } else {
      last = now;
      fn.apply(ctx, args);
    }
  };
};