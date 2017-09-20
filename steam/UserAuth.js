module.exports = (function(){
  "use strict";
  var Client = require('./Client'),
      q = require('q'),
      AuthContainer = require('./containers/Auth');

  function UserAuth() {
    Client.apply(this, arguments);
    this.setInterface('ISteamUserAuth');
  }

  UserAuth.prototype = Object.create(Client.prototype);
  UserAuth.prototype.constructor = UserAuth;

  UserAuth.prototype.AuthenticateUserTicket = function AuthenticateUserTicket(appId, sessionTicket) {
    var deferred = q.defer(),
        args,
        client,
        authStatus;

    this.setMethod('AuthenticateUserTicket');
    this.setVersion(1);

    if(!appId || !Number.isSafeInteger(appId))
    {
        deferred.reject(new Error("Invalid appId"));
    }
    if(!sessionTicket)
    {
        deferred.reject(new Error("Invalid sessionTicket"));
    }

    args = {
      'appid': appId,
      'ticket': sessionTicket
    };

    client = this.setupClient(args);

    client.then(function(result){
    //   players = cleanObject(result.data.response.players, PlayerContainer);
    //   deferred.resolve( players.length === 1 ? players[0] : players );
        //console.log(result.data.response.params);
        var auth = new AuthContainer(result.data.response.params);
        console.log(auth);
        deferred.resolve(auth);
    })
    .fail(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  return UserAuth;
})();
