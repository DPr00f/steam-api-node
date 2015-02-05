var api = require('../steam/api'),
    player;
describe('Player Specs / ', function(){

  beforeEach(function(){
    player = new api.Player(undefined, '76561197963455129');
  });

  it('Should have the correct endpoint', function(){
    expect(player.buildUrl()).toBe('http://api.steampowered.com/IPlayerService/');
  });

  it('Should have the steamId set', function(){
    expect(player.getSteamId()).toBe('76561197963455129');
  });

  it('Should get steam level', function(done){
    player.GetSteamLevel().done(function(result){
      expect(result >= 20).toBe(true);
      done();
    });
  });

  it('Should get player level details', function(done){
    player.GetPlayerLevelDetails().done(function(result){
      expect(result.playerXp).toBeTruthy();
      expect(result.playerLevel).toBeTruthy();
      expect(result.xpToLevelUp).toBeTruthy();
      expect(result.xpForCurrentLevel).toBeTruthy();
      expect(result.currentLevelMin).toBeTruthy();
      expect(result.currentLevelMax).toBeTruthy();
      expect(result.percentThroughLevel).toBeTruthy();
      done();
    });
  });

  it('Should get player badges', function(done){
    player.GetBadges().done(function(result){
      expect(result.length >= 19).toBeTruthy();
      done();
    });
  });

  it('Should get community badge progress', function(done){
    player.GetCommunityBadgeProgress().done(function(result){
      expect(result.quests.length >= 0).toBeTruthy();
      done();
    });
  });

  it('Should get owned games', function(done){
    player.GetOwnedGames().done(function(result){
      expect(result.length >= 333).toBeTruthy();
      done();
    });
  });

  it('Should get recently played games', function(done){
    player.GetRecentlyPlayedGames().done(function(result){
      expect(result.length >= 0).toBeTruthy();
      done();
    });
  });

  it('Should get if is playing shared game', function(done){
    player.IsPlayingSharedGame(620).done(function(result){
      expect(result.length >= 0).toBeTruthy();
      done();
    });
  });
});