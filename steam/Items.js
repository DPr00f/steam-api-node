module.exports = (function(undefined){
  "use strict";
  var Client = require('./Client'),
      q = require('q');

  function Item() {
    Client.apply(this, arguments);
    this.setInterface('IEconItems_');
    if (arguments.length > 1) {
      this.setSteamId(arguments[1]);
    }
  }

  Item.prototype = Client.prototype;
  Item.prototype.constructor = Item;

  Item.prototype.GetPlayerItems = function GetPlayerItems(appId, steamId) {
    var deferred = q.defer(),
        args,
        client,
        bans;
    this.setInterface('IEconItems_' + appId);
    this.setMethod('GetPlayerItems');
    this.setVersion(1);

    if (!steamId) {
      steamId = this.getSteamId();
    }

    args = {
      'steamid': steamId
    };

    client = this.setupClient(args);

    client.then(function(result){
      deferred.resolve( result.data.result );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  return Item;

})();

