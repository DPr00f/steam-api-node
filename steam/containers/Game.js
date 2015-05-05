module.exports = (function(undefined){
  "use strict";
  
  function Game(app) {
    this.appId                    = app.appid;
    this.name                     = app.name ? app.name : undefined;
    this.playtimeTwoWeeks         = app.playtime_2weeks ? app.playtime_2weeks : 0;
    this.playtimeTwoWeeksReadable = app.playtime_2weeks ? this.convertFromMinutes(app.playtime_2weeks) : '0 minutes';
    this.playtimeForever          = app.playtime_forever ? app.playtime_forever : 0;
    this.playtimeForeverReadable  = this.convertFromMinutes(this.playtimeForever);
    this.icon                     = app.img_icon_url ? this.getImageForGame(app.appid, app.img_icon_url) : undefined;
    this.logo                     = app.img_logo_url ? this.getImageForGame(app.appid, app.img_logo_url) : undefined;
    this.header                   = 'http://cdn.steampowered.com/v/gfx/apps/' + this.appId + '/header.jpg';
    this.hasCommunityVisibleStats = app.has_community_visible_stats ? app.has_community_visible_stats : 0;
  }

  Game.prototype.getImageForGame = function getImageForGame(appId, hash) {
    if (hash) {
      return 'http://media.steampowered.com/steamcommunity/public/images/apps/' + appId + '/' + hash + '.jpg';
    }

    return undefined;
  };

  Game.prototype.convertFromMinutes = function convertFromMinutes(minutes) {
    var seconds = minutes * 60,
        secondsInAMinute = 60,
        secondsInAnHour = 60 * secondsInAMinute,
        secondsInADay = 24 * secondsInAnHour,
        days = Math.floor(seconds / secondsInADay),
        hourSeconds = seconds % secondsInADay,
        hours = Math.floor(hourSeconds / secondsInAnHour),
        minuteSeconds = hourSeconds % secondsInAnHour,
        minutes = Math.floor(minuteSeconds / secondsInAMinute),
        remainingSeconds = minuteSeconds % secondsInAMinute,
        seconds = Math.ceil(remainingSeconds),
        output = '';

    if (days > 0) {
      output += days + ' days ';
    }

    if (hours > 0) {
      output += hours + ' hours ';
    }

    output += minutes + ' minutes';

    return output;
  };

  return Game;
})();
