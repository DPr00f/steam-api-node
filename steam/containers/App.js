module.exports = (function(undefined){
  "use strict";

  function App(app) {
    this.id                 = app.steam_appid;
    this.type               = app.type;
    this.name               = app.name;
    this.controllerSupport  = app.controller_support ? app.controller_support : 'None';
    this.description        = app.detailed_description;
    this.shortDescription   = app.short_description;
    this.about              = app.about_the_game;
    this.header             = app.header_image;
    this.website            = !app.website ? app.website : 'None';
    this.pcRequirements     = app.pc_requirements;
    this.legal              = app.legal_notice ? app.legal_notice : 'None';
    this.developers         = app.developers ? app.developers : undefined;
    this.publishers         = app.publishers;
    this.price              = app.price_overview ? app.price_overview : this.getFakePriceObject();
    this.platforms          = app.platforms;
    this.metacritic         = app.metacritic ? app.metacritic : this.getFakeMetacriticObject();
    this.categories         = app.categories ? app.categories : undefined;
    this.genres             = app.genres ? app.genres : undefined;
    this.release            = app.release_date;
  }

  App.prototype.getFakeMetacriticObject = function getFakeMetacriticObject(){
    return {
      url: undefined,
      score: 'No Score'
    };
  }

  App.prototype.getFakePriceObject = function getFakePriceObject(){
    return {
      final: 'No Price Found'
    };
  }
  
  return App;
})();