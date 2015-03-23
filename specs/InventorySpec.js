var api = require('../steam/api'),
    inventory;
describe('Inventory Specs / ', function(){
  jasmine.getEnv().defaultTimeoutInterval = 30000;

  beforeEach(function(){
    inventory = new api.Inventory(undefined, '76561197963455129');
  });

  it('should grab the correct inventory', function(done) {
    inventory.GetAppItems(730).done(function(result){
      var fs = require('fs');
      expect(result.length > 5).toBe(true);
      done();
    });
  });
});
