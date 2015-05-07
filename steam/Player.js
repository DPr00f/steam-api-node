module.exports = (function(){
  "use strict";
  var Client = require('./Client'),
      q = require('q'),
      LevelContainer = require('./containers/player/Level'),
      GameContainer = require('./containers/Game');

  function cleanGames(games) {
    var cleanedGames = [];

    for( var gameNumber in games ){
      if(games[gameNumber]){
        cleanedGames.push(new GameContainer(games[gameNumber]));
      }
    }

    return cleanedGames;
  }

  function Player() {
    Client.apply(this, arguments);
    this.setInterface('IPlayerService');
    this.isService(true);

    if (arguments.length > 1) {
      this.setSteamId(arguments[1]);
    }
  }

  Player.prototype = Object.create(Client.prototype);
  Player.prototype.constructor = Player;
 
  Player.prototype.GetSteamLevel = function GetSteamLevel(steamId) {
    var deferred = q.defer(),
        args,
        client;

    this.setMethod('GetSteamLevel');
    this.setVersion(1);

    if (!steamId) {
      steamId = this.getSteamId();
    }

    args = {
      steamId: steamId
    };

    client = this.setupService(args);

    client.then(function(result){
      deferred.resolve( parseInt(result.data.response.player_level, 10) );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  Player.prototype.GetPlayerLevelDetails = function GetPlayerLevelDetails(steamId) {
    var deferred = q.defer(),
        args,
        client;

    this.setMethod('GetBadges');
    this.setVersion(1);

    if (!steamId) {
      steamId = this.getSteamId();
    }

    args = {
      steamId: steamId
    };

    client = this.setupService(args);

    client.then(function(result){
      deferred.resolve( new LevelContainer(result.data.response) );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  Player.prototype.GetBadges = function GetBadges(steamId) {
    var deferred = q.defer(),
        args,
        client;

    this.setMethod('GetBadges');
    this.setVersion(1);

    if (!steamId) {
      steamId = this.getSteamId();
    }

    args = {
      steamId: steamId
    };

    client = this.setupService(args);

    client.then(function(result){
      deferred.resolve( result.data.response.badges );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  Player.prototype.GetCommunityBadgeProgress = function GetCommunityBadgeProgress(badgeId, steamId) {
    var deferred = q.defer(),
        args,
        client;

    this.setMethod('GetCommunityBadgeProgress');
    this.setVersion(1);

    if (!steamId) {
      steamId = this.getSteamId();
    }

    args = {
      steamId: steamId
    };

    if (badgeId) {
      args.badgeid = badgeId;
    }

    client = this.setupService(args);

    client.then(function(result){
      deferred.resolve( result.data.response );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  Player.prototype.GetOwnedGames = function GetOwnedGames(steamId, includeAppInfo, includePlayedFreeGames, appIdsFilter) {
    var deferred = q.defer(),
        args,
        client;

    this.setMethod('GetOwnedGames');
    this.setVersion(1);

    if (includeAppInfo === undefined) {
      includeAppInfo = true;
    }

    if (includePlayedFreeGames === undefined) {
      includePlayedFreeGames = false;
    }

    if (appIdsFilter === undefined) {
      appIdsFilter = [];
    }

    if (!steamId) {
      steamId = this.getSteamId();
    }

    args = {
      steamId: steamId
    };

    if (includeAppInfo) {
      args['include_appinfo'] = includeAppInfo;
    }

    if (includePlayedFreeGames) {
      args['include_played_free_games'] = includePlayedFreeGames;
    }

    if (appIdsFilter.length > 0) {
      args['appids_filter'] = appIdsFilter;
    }

    client = this.setupService(args);

    client.then(function(result){
      deferred.resolve( cleanGames(result.data.response.games) );
    })
    .fail(function(result){
      deferred.reject(result);
    });


    return deferred.promise;
  };

  Player.prototype.GetRecentlyPlayedGames = function GetRecentlyPlayedGames(count, steamId) {
    var deferred = q.defer(),
        args,
        client;

    this.setMethod('GetRecentlyPlayedGames');
    this.setVersion(1);

    if (!steamId) {
      steamId = this.getSteamId();
    }

    args = {
      steamId: steamId
    };

    if (count) {
      args.count = count;
    }

    client = this.setupService(args);

    client.then(function(result){
      if (result.data.response.total_count > 0) {
        deferred.resolve( cleanGames(result.data.response.games) );
      }else{
        deferred.resolve( [] );
      }
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  Player.prototype.IsPlayingSharedGame = function IsPlayingSharedGame(appIdPlaying, steamId) {
    var deferred = q.defer(),
        args,
        client;

    this.setMethod('IsPlayingSharedGame');
    this.setVersion(1);

    if (!steamId) {
      steamId = this.getSteamId();
    }

    args = {
      steamId: steamId,
      appid_playing: appIdPlaying
    };

    client = this.setupService(args);

    client.then(function(result){
      deferred.resolve( result.data.response.lender_steamid );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  return Player;
})();