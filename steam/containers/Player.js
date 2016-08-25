module.exports = (function(undefined){
  "use strict";
  
  function Player(player) {
    this.steamId                  = player.steamid;
    this.communityVisibilityState = player.communityvisibilitystate;
    this.profileState             = player.profilestate;
    this.personaName              = player.personaname;
    this.lastLogoff               = player.lastlogoff;
    this.profileUrl               = player.profileurl;
    this.avatar                   = player.avatar;
    this.avatarMedium             = player.avatarmedium;
    this.avatarFull               = player.avatarfull;
    this.personaState             = this.convertPersonaState(player.personastate);
    this.primaryClanId            = player.primaryclanid ? player.primaryclanid : undefined;
    this.timecreated              = player.timecreated ? player.timecreated : undefined;
    this.personaStateFlags        = player.personastateflags ? player.personastateflags : undefined;
    this.countryCode              = player.loccountrycode;
    this.stateCode                = player.locstatecode;
    // Optional fields returned if user is in game and has public profile
    this.gameid                   = player.gameid;
    this.gameextrainfo            = player.gameextrainfo;
  }

  Player.prototype.convertPersonaState = function convertPersonaState(personaState) {
    switch (personaState) {
      case 0:
        return 'Offline';
      case 1:
        return 'Online';
      case 2:
        return 'Busy';
      case 3:
        return 'Away';
      case 4:
        return 'Snooze';
      case 5:
        return 'Looking to Trade';
      case 6:
        return 'Looking to Play';
    }
    return personaState;
  };

  return Player;
})();
