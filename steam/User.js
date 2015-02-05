module.exports = (function(){
  "use strict";
  var Client = require('./Client'),
      q = require('q'),
      BansContainer = require('./containers/player/Bans'),
      PlayerContainer = require('./containers/Player');

  function User() {
    Client.apply(this, arguments);
    this.setInterface('ISteamUser');
    if (arguments.length > 1) {
      this.setSteamId(arguments[1]);
    }
  }

  User.prototype = Client.prototype;

  User.prototype.GetPlayerBans = function GetPlayerBans(steamId) {
    var deferred = q.defer(),
        args,
        client,
        bans,
        _t = this;

    this.setMethod('GetPlayerBans');
    this.setVersion(1);

    if (!steamId) {
      steamId = this.getSteamId();
    }

    args = {
      'steamids': steamId
    };

    client = this.setupClient(args);

    client.then(function(result){
      bans = _t.cleanObject(result.data.players, BansContainer);
      deferred.resolve( bans.length === 1 ? bans[0] : bans );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  User.prototype.GetPlayerSummaries = function GetPlayerSummaries(steamId) {
    var deferred = q.defer(),
        args,
        client,
        players,
        _t = this;

    this.setMethod('GetPlayerSummaries');
    this.setVersion(2);

    if (!steamId) {
      steamId = this.getSteamId();
    }

    args = {
      'steamids': steamId
    };

    client = this.setupClient(args);

    client.then(function(result){
      players = _t.cleanObject(result.data.response.players, PlayerContainer);
      deferred.resolve( players.length === 1 ? players[0] : players );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  User.prototype.GetFriendList = function GetFriendList(relationship, steamId) {
    var deferred = q.defer(),
        args,
        client,
        steamIds,
        friendsList,
        _t = this;

    this.setMethod('GetFriendList');
    this.setVersion(1);

    if (!relationship) {
      relationship = 'all';
    }
    if (!steamId) {
      steamId = this.getSteamId();
    }

    args = {
      'steamid': steamId,
      'relationship': relationship
    };

    client = this.setupClient(args);

    client.then(function(result){
      steamIds = [];
      friendsList = result.data.friendslist.friends;
      for (var i in friendsList){
        steamIds.push(friendsList[i].steamid);
      }
      _t.GetPlayerSummaries(steamIds.join()).done(function(friends){
        deferred.resolve(friends);
      });
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  User.prototype.GetUserGroupList = function GetUserGroupList(steamId) {
    var deferred = q.defer(),
        args,
        client,
        _t = this;

    this.setMethod('GetUserGroupList');
    this.setVersion(1);
    
    if (!steamId) {
      steamId = this.getSteamId();
    }

    args = {
      'steamid': steamId
    };

    client = this.setupClient(args);

    client.then(function(result){
      deferred.resolve( result.data.response.groups );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  User.prototype.ResolveVanityUrl = function ResolveVanityUrl(vanityUrl) {
    var deferred = q.defer(),
        args,
        client,
        _t = this;

    this.setMethod('ResolveVanityUrl');
    this.setVersion(1);

    args = {
      'vanityurl': vanityUrl
    };

    client = this.setupClient(args);

    client.then(function(result){
      deferred.resolve( result.data.response.steamid );
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  User.prototype.cleanObject = function cleanObject(players, Container) {
    var cleanedPlayers = [];

    for( var player in players ){
      cleanedPlayers.push(new Container(players[player]));
    }

    return cleanedPlayers;
  };

  return User;
})();