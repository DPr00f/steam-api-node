module.exports = (function (undefined){
  "use strict";
  var rest = require('restler'),
      q = require('q'),
      mixin = require('./helpers').mixin,
      http_build_query = require('./helpers').http_build_query,
      apiKey,
      url,
      method,
      version,
      apiFormat,
      steamId,
      isService_;

  function Client(steamApiKey) {
    if (!steamApiKey) {
      if (!process.env.STEAM_API_KEY){
        throw new Error("Please provide a steam api key.");
      }
      steamApiKey = process.env.STEAM_API_KEY;
    }

    apiKey = steamApiKey;
    this.setUrl("http://api.steampowered.com/");
    this.setInterface(null);
    this.setVersion(2);
    this.setApiFormat('json');
    this.isService(false);
    this.setMethod(undefined);
    this.setSteamId(undefined);
  }

  /** Getters / Setters **/
  Client.prototype.getApiKey = function getApiKey() {
    return apiKey;
  };

  Client.prototype.getUrl = function getUrl(){
    return url;
  };

  Client.prototype.setUrl = function setUrl(value){
    url = value;
  };

  Client.prototype.getInterface = function getInterface(){
    return this.interface;
  };

  Client.prototype.setInterface = function setInterface(value){
    this.interface = value;
  };

  Client.prototype.getMethod = function getMethod(){
    return method;
  };

  Client.prototype.setMethod = function setMethod(value){
    method = value;
  };

  Client.prototype.getVersion = function getVersion(){
    return version;
  };

  Client.prototype.setVersion = function setVersion(value){
    version = value;
  };

  Client.prototype.getApiFormat = function getApiFormat(){
    return apiFormat;
  };

  Client.prototype.setApiFormat = function setApiFormat(value){
    apiFormat = value;
  };

  Client.prototype.getSteamId = function getSteamId(){
    return steamId;
  };

  Client.prototype.setSteamId = function setSteamId(value){
    steamId = value;
  };

  Client.prototype.isService = function isService(value){
    if (!value){
      return isService_;
    }
    isService_ = value;
  };

  /** Public **/
  Client.prototype.buildUrl = function buildUrl(version) {
    var url = this.getUrl();
    if (this.getInterface()) {
      url += this.getInterface() + '/';
    }

    if (this.getMethod()) {
      url += this.getMethod() + '/';
    }

    if (version) {
      url += 'v' + this.getVersion() + '/';
    }

    return url;
  };

  Client.prototype.setupService = function setupService(args) {
    var parameters,
        steamUrl,
        deferred = q.defer();
    if (!args) {
      throw new Error("arguments must be defined");
    }

    steamUrl = this.buildUrl(true);

    parameters = http_build_query({
      'key': this.getApiKey(),
      'format': this.getApiFormat(),
      'input_json': JSON.stringify(args)
    });

    rest.get(steamUrl + "?" + parameters)
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

  Client.prototype.setupClient = function setupClient(args) {
    var parameters,
        steamUrl,
        deferred = q.defer(),
        versionFlag = this.getVersion() ? true : false;

    steamUrl = this.buildUrl( versionFlag );

    parameters = {
      'key': this.getApiKey(),
      'format': this.getApiFormat()
    };

    if (args) {
      parameters = mixin(parameters, args);
    }

    parameters = http_build_query(parameters);

    rest.get(steamUrl + "?" + parameters)
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

  return Client;
})();
