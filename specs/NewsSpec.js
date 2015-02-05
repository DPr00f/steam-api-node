var api = require('../steam/api'),
    news;
describe('News Specs / ', function(){
  jasmine.getEnv().defaultTimeoutInterval = 30000;
  
  beforeEach(function(){
    news = new api.News();
  });

  it('Should have the correct endpoint', function(){
    expect(news.buildUrl()).toBe('http://api.steampowered.com/ISteamNews/');
  });

  it('Should get news for app', function(done){
    var totalNews = 2,
        appId = 620; // Portal 2
    news.GetNewsForApp(appId, totalNews).done(function(result){
      expect(result.appid).toBe(appId);
      expect(result.newsitems.length).toBe(totalNews);
      done();
    });
  });
});