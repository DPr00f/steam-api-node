var api = require('../steam/api'),
    stats;
describe('UserStats Specs / ', function(){

  beforeEach(function(){
    stats = new api.UserStats(undefined, '76561197963455129');
  });

  it('Should have the correct endpoint', function(){
    expect(stats.buildUrl()).toBe('http://api.steampowered.com/ISteamUserStats/');
  });

  it('Should have the steamId set', function(){
    expect(stats.getSteamId()).toBe('76561197963455129');
  });

  it('Should get global stats for game', function(done){
    stats.GetGlobalStatsForGame(17740, ['global.map.emp_isle'])
        .done(function(result){
          expect(result['global.map.emp_isle'].total >= 100).toBeTruthy();
          done();
        });
  });

  it('Should get number of current players', function(done){
    stats.GetNumberOfCurrentPlayers(620)
        .done(function(result){
          expect(result >= 0).toBeTruthy();
          done();
        });
  });

  it('Should get schema for game', function(done){
    stats.GetSchemaForGame(620)
        .done(function(result){
          expect(result.gameName).toBe('Portal 2');
          done();
        });
  });

  it('Should get player achievements', function(done){
    stats.GetPlayerAchievements(620)
        .done(function(result){
          expect(result.length >= 50).toBeTruthy();
          done();
        });
  });

  it('Should Get Global Achievement Percentages For App', function(done){
    stats.GetGlobalAchievementPercentagesForApp(620)
        .done(function(result){
          expect(result.length >= 50).toBeTruthy();
          done();
        });
  });

  it('Should get user stats for game', function(done){
    stats.GetUserStatsForGame(620)
        .done(function(result){
          expect(result.gameName).toBe('Portal 2');
          done();
        });
  });

});