module.exports = (function(undefined){
  "use strict";
  var Client = require('./Client'),
      rest = require('restler'),
      q = require('q'),
      requestUrl,
      context;

  function Community() {
    Client.apply(this, arguments);
    this.setUrl('http://steamcommunity.com/');
    this.setInterface('profiles');

    if(arguments.length > 1){
      this.setSteamId(arguments[1]);
    }
  }

  Community.prototype = Client.prototype;
  Community.prototype.constructor = Community;

  Community.prototype.setRequestUrl = function setRequestUrl(url) {
    requestUrl = url;
  };

  Community.prototype.getRequestUrl = function getRequestUrl() {
    return requestUrl;
  };

  Community.prototype.setContext = function setContext(ctx) {
    context = ctx;
  };

  Community.prototype.getContext = function getContext() {
    return context;
  };

  Community.prototype.buildCommunityUrl = function buildCommunityUrl() {
    var url = this.getUrl();
    if (this.getInterface()) {
      url += this.getInterface() + '/';
    }

    if (this.getSteamId()) {
      url += this.getSteamId() + '/';
    }

    if (this.getRequestUrl()) {
      url +=  this.getRequestUrl() + '/';
    }

    return url;
  };

  Community.prototype.setupCommunity = function setupCommunity() {
    var steamUrl,
        deferred = q.defer();

    steamUrl = this.buildCommunityUrl();

    rest.get(steamUrl)
        .on('success', function restlerComplete(data, response){
          deferred.resolve({
            status: 'ok',
            data: data,
            response: response
          });
        })
        .on('fail', function restlerFail(data, response){
          deferred.reject({
            status: 'fail',
            data: data,
            response: response
          });
        })
        .on('timeout', function restlerTimeout(ms){
          deferred.reject({
            status: 'timeout',
            data: ms,
            response: {}
          });
        })
        .on('error', function restlerError(err, response){
          deferred.reject({
            status: 'error',
            data: err,
            response: response
          });
        });

    return deferred.promise;
  };

  return Community;
})();
