var api = require('../steam/api'),
    user;
describe('User Specs / ', function(){

  beforeEach(function(){
    user = new api.User(undefined, '76561197963455129');
  });

  it('Should have the correct endpoint', function(){
    expect(user.buildUrl()).toBe('http://api.steampowered.com/ISteamUser/');
  });

  it('Should have the steamId set', function(){
    expect(user.getSteamId()).toBe('76561197963455129');
  });

  it('Should get the player bans', function(done){
    user.GetPlayerBans().done(function(result){
      expect(result.steamId).toBe('76561197963455129');
      expect(result.communityBanned).toBe(false);
      expect(result.VACBanned).toBe(false);
      expect(result.numberOfVACBans).toBe(0);
      expect(result.daysSinceLastBan).toBe(0);
      expect(result.economyBan).toBe('none');
      done();
    });
  });

  it('Should get the player summaries', function(done){
    user.GetPlayerSummaries().done(function(result){
      expect(result.profileUrl).toBe('http://steamcommunity.com/id/pr00fgames/');
      done();
    });
  });

  it('Should get friend list', function(done){
    user.GetFriendList().done(function(result){
      expect(result.length >= 20).toBe(true);
      done();
    });
  });

  it('Should get user group list', function(done){
    user.GetUserGroupList().done(function(result){
      expect(result.length >= 5).toBe(true);
      done();
    });
  });

  it('Should resolve vanity url', function(done){
    user.ResolveVanityUrl('pr00fgames').done(function(result){
      expect(result).toBe('76561197963455129');
      done();
    });
  });

  it('Shouldn\'t resolve vanity url', function(done){
    user.ResolveVanityUrl('pr00fgamespoaspodopispaodipoasdpoipoidsapoisdpoaipoisda').done(function(result){
      expect(result).toBe(undefined);
      done();
    });
  });
});