var api = require('../steam/api'),
    app;
describe('App Specs / ', function(){

  beforeEach(function(){
    app = new api.App();
  });

  it('Should have the correct endpoint', function(){
    expect(app.buildUrl()).toBe('http://api.steampowered.com/ISteamApps/');
  });


  it('Should get app details', function(done){
    var appId = 620; // Portal 2
    app.appDetails(appId).done(function(result){
      expect(result.name).toBe("Portal 2");
      done();
    });
  });

  it('Should get the app list', function(done){
    app.GetAppList().done(function(result){
      expect(result.length > 1000).toBe(true);
      done();
    });
  });

  it('Should get servers at address', function(done){
    app.GetServersAtAddress('127.0.0.1').done(function(result){
      expect(result.length >= 0).toBe(true);
      done();
    });
  });

  xit('Should check if app is up to date', function(done){
    var appId = 620,
        version = 1; // Portal 2
    app.UpToDateCheck(appId, version).done(function(result){
      // TODO: Implement
      // Don't know how to use this one.
      done();
    });
  });
});