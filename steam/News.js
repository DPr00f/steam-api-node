module.exports = (function(){
  "use strict";
  var Client = require('./Client'),
      q = require('q');

  function News() {
    Client.apply(this, arguments);
    this.setInterface('ISteamNews');
  }

  News.prototype = Client.prototype;

  News.prototype.GetNewsForApp = function GetNewsForApp(appId, count, maxLength) {
    var deferred = q.defer(),
        args,
        client;
    if (!count) {
      count = 5;
    }
    this.setMethod( "GetNewsForApp" );
    this.setVersion(2);

    args = {
      appid: appId,
      count: count
    };
    if (maxLength) {
      args.maxlength = maxLength;
    }

    client = this.setupClient(args);

    client.then(function(result){
      deferred.resolve(result.data.appnews);
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  return News;
})();