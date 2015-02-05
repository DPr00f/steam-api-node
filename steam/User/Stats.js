module.exports = (function(){
  "use strict";
  var Client = require('../Client'),
      q = require('q'),
      AchievementContainer = require('../containers/Achievement');

  function Stats() {
    Client.apply(this, arguments);
    this.setInterface('ISteamUserStats');
    if (arguments.length > 1) {
      this.setSteamId(arguments[1]);
    }
  }

  Stats.prototype = Client.prototype;

  Stats.prototype.GetGlobalStatsForGame = function GetGlobalStatsForGame(appId, statsName) {
    var deferred = q.defer(),
        args,
        client,
        count,
        _t = this;

    if (!statsName) {
      statsName = [];
    }

    this.setMethod('GetGlobalStatsForGame');
    this.setVersion(1);

    count = statsName.length;

    args = {
      'count': count,
      'appid': appId,
      'l': 'english'
    };

    for(var i = 0; i < count ; i++){
      args['name[' + i + ']'] = statsName[i];
    }

    client = this.setupClient(args);

    client.then(function(result){
      deferred.resolve( result.data.response.globalstats );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  Stats.prototype.GetNumberOfCurrentPlayers = function GetNumberOfCurrentPlayers(appId) {
    var deferred = q.defer(),
        args,
        client,
        _t = this;

    this.setMethod('GetNumberOfCurrentPlayers');
    this.setVersion(1);

    args = {
      'appid': appId
    };

    client = this.setupClient(args);

    client.then(function(result){
      deferred.resolve( result.data.response.player_count );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  Stats.prototype.GetSchemaForGame = function GetSchemaForGame(appId) {
    var deferred = q.defer(),
        args,
        client,
        _t = this;

    this.setMethod('GetSchemaForGame');
    this.setVersion(2);

    args = {
      'appid': appId
    };

    client = this.setupClient(args);

    client.then(function(result){
      deferred.resolve( result.data.game );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  Stats.prototype.GetPlayerAchievements = function GetPlayerAchievements(appId, steamId) {
    var deferred = q.defer(),
        args,
        client,
        _t = this;

    this.setMethod('GetPlayerAchievements');
    this.setVersion(1);

    if (!steamId) {
      steamId = this.getSteamId();
    }

    args = {
      'steamid': steamId,
      'appid': appId,
      'l': 'english'
    };

    client = this.setupClient(args);

    client.then(function(result){
      deferred.resolve( _t.cleanAchievements(result.data.playerstats.achievements) );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  Stats.prototype.GetGlobalAchievementPercentagesForApp = function GetGlobalAchievementPercentagesForApp(gameId) {
    var deferred = q.defer(),
        args,
        client,
        _t = this;

    this.setMethod('GetGlobalAchievementPercentagesForApp');
    this.setVersion(2);

    args = {
      'gameid': gameId,
      'l': 'english'
    };

    client = this.setupClient(args);

    client.then(function(result){
      deferred.resolve( result.data.achievementpercentages.achievements );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  Stats.prototype.GetUserStatsForGame = function GetUserStatsForGame(appId, steamId) {
    var deferred = q.defer(),
        args,
        client,
        _t = this;

    this.setMethod('GetUserStatsForGame');
    this.setVersion(2);

    if (!steamId) {
      steamId = this.getSteamId();
    }

    args = {
      'steamid': steamId,
      'appid': appId,
      'l': 'english'
    };

    client = this.setupClient(args);

    client.then(function(result){
      deferred.resolve( result.data.playerstats );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };


  Stats.prototype.cleanAchievements = function cleanAchievements(achievements) {
    var cleanedAchievements = [];

    for( var achievementNumber in achievements ){
      cleanedAchievements.push(new AchievementContainer(achievements[achievementNumber]));
    }

    return cleanedAchievements;
  };

  return Stats;
})();