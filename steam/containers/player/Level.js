module.exports = (function(undefined){
  "use strict";
  
  function Level(levelDetails) {
    var levelRange;
    this.playerXp             = levelDetails.player_xp;
    this.playerLevel          = levelDetails.player_level;
    this.xpToLevelUp          = levelDetails.player_xp_needed_to_level_up;
    this.xpForCurrentLevel    = levelDetails.player_xp_needed_current_level;
    this.currentLevelMin      = this.xpForCurrentLevel;
    this.currentLevelMax      = this.playerXp + this.xpToLevelUp;
    levelRange                = this.currentLevelMax - this.currentLevelMin;
    this.percentThroughLevel  = this.percent(this.xpToLevelUp, levelRange);
  }

  Level.prototype.percent = function percent(numAmount, numTotal) {
    if (numAmount === 0 || numTotal === 0) {
      return 0;
    }else {
      return parseInt( (numAmount/numTotal) * 100 ,10);
    }
  }

  return Level;
})();