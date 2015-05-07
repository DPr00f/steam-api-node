module.exports = (function(){
  "use strict";

  var Community = require('./Community'),
      merge = require('merge'),
      q = require('q');

  function mergeWithDescriptions(rgItems, rgDescriptions) {
    var items = [],
        i,
        id,
        item,
        description,
        ids = Object.keys(rgItems);
    for(i in ids) {
      if(ids[i]){
        id = ids[i];
        item = rgItems[id];
        description = rgDescriptions[item.classid + '_' + item.instanceid];
        item = merge(item, description);
        items.push(item);
      }
    }
    return items;
  }

  function Inventory() {
    Community.apply(this, arguments);
    this.setContext(2);
  }

  Inventory.prototype = Object.create(Community.prototype);
  Inventory.prototype.constructor = Inventory;


  Inventory.prototype.GetAppItems = function(appId, steamId) {
    var deferred = q.defer(),
        items,
        client;
    if( !steamId ) {
      steamId = this.getSteamId();
    }

    this.setRequestUrl('inventory/json/' + appId + '/' + this.getContext() );
    client = this.setupCommunity();

    client.then(function(result){
      if( !result.data.success ) {
        deferred.reject(result.data);
        return;
      }
      items = mergeWithDescriptions(result.data.rgInventory, result.data.rgDescriptions);
      deferred.resolve(items);
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  return Inventory;

})();