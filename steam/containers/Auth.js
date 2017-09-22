module.exports = (function(undefined){
  "use strict";

  function Auth(auth) {
    this.result          = auth.result;
    this.steamid         = auth.steamid;
    this.ownersteamid    = auth.ownersteamid;
    this.vacbanned       = auth.vacbanned;
    this.publisherbanned = auth.publisherbanned;
  }

  return Auth;
})();
