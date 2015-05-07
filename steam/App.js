module.exports = (function(){
  "use strict";
  var Client = require('./Client'),
      q = require('q'),
      AppContainer = require('./containers/App');


  function cleanApps(apps) {
    var cleanedApps = [];
    for( var appId in apps ){
      if(apps[appId]){
        cleanedApps.push(new AppContainer(apps[appId].data));
      }
    }

    return cleanedApps;
  }

  function App() {
    Client.apply(this, arguments);
    this.setInterface('ISteamApps');
  }

  App.prototype = Object.create(Client.prototype);
  App.prototype.constructor = App;

  App.prototype.appDetails = function appDetails(appId) {
    var deferred = q.defer(),
        args,
        client,
        apps;
    this.setUrl('http://store.steampowered.com/');
    this.setInterface('api');
    this.setMethod('appdetails');
    this.setVersion(undefined);

    args = {
      'appids': appId
    };

    client = this.setupClient(args);

    client.then(function(result){
      apps = cleanApps( result.data );
      deferred.resolve(apps.length === 1 ? apps[0] : apps);
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  App.prototype.GetAppList = function GetAppList() {
    var deferred = q.defer(),
        client;
    this.setUrl('http://api.steampowered.com/');
    this.setInterface('ISteamApps');
    this.setMethod('GetAppList');
    this.setVersion(2);

    client = this.setupClient();

    client.then(function(result){
      deferred.resolve(result.data.applist.apps);
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  App.prototype.GetServersAtAddress = function GetServersAtAddress(addressOrIp) {
    var args,
        deferred = q.defer(),
        client;
    this.setUrl('http://api.steampowered.com/');
    this.setInterface('ISteamApps');
    this.setMethod('GetServersAtAddress');
    this.setVersion(1);

    args = {
      'addr': addressOrIp
    };

    client = this.setupClient(args);

    client.then(function(result){
      deferred.resolve(result.data.response.servers);
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  App.prototype.UpToDateCheck = function UpToDateCheck(appId, version) {
    var args,
        deferred = q.defer(),
        client;
    this.setUrl('http://api.steampowered.com/');
    this.setInterface('ISteamApps');
    this.setMethod('UpToDateCheck');
    this.setVersion(1);

    args = {
      'appid': appId,
      'version': version
    };

    client = this.setupClient(args);

    client.then(function(result){
      deferred.resolve(result.data.response);
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  return App;
})();