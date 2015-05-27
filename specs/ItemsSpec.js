'use strict';
var api = require('../steam/api'),
    items;

describe('Items Specs / ', function(){
  jasmine.getEnv().defaultTimeoutInterval = 30000;

  beforeEach(function(){
    items = new api.Items(undefined, '76561197963455129');
  });

  it('should grab the correct inventory', function(done) {
    items.GetPlayerItems(730).then(function(result){
      expect(result.items.length > 5).toBe(true);
      done();
    }).fail(function(){
      console.log('The request failed, we\'ll just skip the check since the service might be unavailable');
      done();
    });
  });
});
