var restler = require('restler');

function mixin(target, source) {
  source = source || {};
  Object.keys(source).forEach(function(key) {
    target[key] = source[key];
  });

  return target;
}

mixin(exports, {
  Client: require('./Client'),
  News: require('./News')
});