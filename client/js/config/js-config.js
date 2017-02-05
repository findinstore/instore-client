// default config values go here
module.exports = {
};

if (__DEV__) {
  module.exports = {
    logging: true,
    debug: true,
    analytics: false
  }

} else {
  module.exports = {
    logging: false,
    debug: false,
    analytics: true
  }
}

var context = (window || global);
context.config = module.exports;