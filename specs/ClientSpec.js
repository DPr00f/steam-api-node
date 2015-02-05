var api = require('../steam/api');
describe('Client Specs / ', function(){
  jasmine.getEnv().defaultTimeoutInterval = 30000;
  
  it('Should squawk if no steam api', function(){
    oldEnv = process.env;
    process.env = {};
    expect(function(){ new api.Client(); }).toThrow(new Error('Please provide a steam api key.'));
    process.env = oldEnv;
  });

  it('Should accept a steam api key', function(){
    var client = new api.Client('this-was-set');
    expect(client.getApiKey()).toBe('this-was-set');
  });

  it('Should squawk if no arguments are found in setupService', function(){
    var client = new api.Client('this-was-set');
    expect(function(){ client.setupService(); }).toThrow(new Error("arguments must be defined"));
  });
});