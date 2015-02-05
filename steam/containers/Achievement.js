module.exports = (function(undefined){
  "use strict";
  
  function Achievement(achievement) {
    this.apiName     = achievement.apiname;
    this.achieved    = achievement.achieved;
    this.name        = achievement.name;
    this.description = achievement.description;
  }

  return Achievement;
})();