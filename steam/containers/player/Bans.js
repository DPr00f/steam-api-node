module.exports = (function(undefined){
  "use strict";
  
  function Bans(player) {
    this.steamId           = player.SteamId;
    this.communityBanned   = player.CommunityBanned;
    this.VACBanned         = player.VACBanned;
    this.numberOfVACBans   = player.NumberOfVACBans;
    this.daysSinceLastBan  = player.DaysSinceLastBan;
    this.economyBan        = player.EconomyBan;
  }

  return Bans;
})();