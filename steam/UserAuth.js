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
        if(result.data.error != 'undefined' && result.data.error != null) {
            deferred.reject(result.data);
        }
        else {
            var auth = new AuthContainer(result.data.response.params);
            deferred.resolve(auth);
        }
    })
    .catch(function(result){
      deferred.reject(result);
    });

    return deferred.promise;
  };

  return UserAuth;
})();
