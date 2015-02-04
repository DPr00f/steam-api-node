module.exports = (function (){
  "use strict";
  var rest = require('restler'),
      q = require('q'),
      apiKey,
      url,
      interface_,
      method,
      version,
      apiFormat,
      steamId,
      isService;

  function mixin(target, source) {
    source = source || {};
    Object.keys(source).forEach(function(key) {
      target[key] = source[key];
    });

    return target;
  }

  function http_build_query(formdata, numeric_prefix, arg_separator) {
    //  discuss at: http://phpjs.org/functions/http_build_query/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Legaev Andrey
    // improved by: Michael White (http://getsprink.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Brett Zamir (http://brett-zamir.me)
    //  revised by: stag019
    //    input by: Dreamer
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)
    //        note: If the value is null, key and value are skipped in the http_build_query of PHP while in phpjs they are not.
    //  depends on: urlencode
    //   example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
    //   returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
    //   example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
    //   returns 2: 'myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&php=hypertext+processor&cow=milk'

    var value, key, tmp = [],
      that = this;

    var _http_build_query_helper = function(key, val, arg_separator) {
      var k, tmp = [];
      if (val === true) {
        val = '1';
      } else if (val === false) {
        val = '0';
      }
      if (val != null) {
        if (typeof val === 'object') {
          for (k in val) {
            if (val[k] != null) {
              tmp.push(_http_build_query_helper(key + '[' + k + ']', val[k], arg_separator));
            }
          }
          return tmp.join(arg_separator);
        } else if (typeof val !== 'function') {
          return encodeURIComponent(key) + '=' + encodeURIComponent(val);
        } else {
          throw new Error('There was an error processing for http_build_query().');
        }
      } else {
        return '';
      }
    };

    if (!arg_separator) {
      arg_separator = '&';
    }
    for (key in formdata) {
      value = formdata[key];
      if (numeric_prefix && !isNaN(key)) {
        key = String(numeric_prefix) + key;
      }
      var query = _http_build_query_helper(key, value, arg_separator);
      if (query !== '') {
        tmp.push(query);
      }
    }

    return tmp.join(arg_separator);
  }

  function Client(steamApiKey) {
    if (!steamApiKey) {
      if (!process.env.STEAM_API_KEY){
        throw new Error("Please provide a steam api key.");
      }
      steamApiKey = process.env.STEAM_API_KEY;
    }

    apiKey = steamApiKey;
    this.setUrl("http://api.steampowered.com/");
    this.setVersion(2);
    this.setApiFormat('json');
    this.isService(false);
  }

  /** Getters / Setters **/
  Client.prototype.getApiKey = function getApiKey() {
    return apiKey;
  };

  Client.prototype.getUrl = function getUrl(){
    return url;
  }

  Client.prototype.setUrl = function setUrl(value){
    url = value;
  }

  Client.prototype.getInterface = function getInterface(){
    return interface_;
  }

  Client.prototype.setInterface = function setInterface(value){
    interface_ = value;
  }

  Client.prototype.getMethod = function getMethod(){
    return method;
  }

  Client.prototype.setMethod = function setMethod(value){
    method = value;
  }

  Client.prototype.getVersion = function getVersion(){
    return version;
  }

  Client.prototype.setVersion = function setVersion(value){
    version = value;
  }

  Client.prototype.getApiFormat = function getApiFormat(){
    return apiFormat;
  }

  Client.prototype.setApiFormat = function setApiFormat(value){
    apiFormat = value;
  }

  Client.prototype.getSteamId = function getSteamId(){
    return steamId;
  }

  Client.prototype.setSteamId = function setSteamId(value){
    steamId = value;
  }

  Client.prototype.isService = function isService(value){
    if (!value){
      return isService;
    }
    isService = value;
  }

  /** Public **/
  Client.prototype.buildUrl = function buildUrl(version) {
    var url = this.getUrl();
    if (this.getInterface()) {
      url += this.getInterface() + '/';
    }

    if (this.getMethod()) {
      url += this.getMethod() + '/';
    }

    if (this.getVersion()) {
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
  }

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
  }

  return Client;
})();