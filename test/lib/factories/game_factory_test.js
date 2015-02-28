require('../../support');
var netrunner = require('../../../')
  , Player = netrunner.Player
  , fixtures = require('../../fixtures/')
  , Base = new fixtures.Base()
  , expect = require('expect.js');

describe('GameFactory', function(){
  describe('::create', function(){
    it('requires two players', function(done){
      p1 = new Player({deck: Base.corp_legit_deck_list()});
      new GameFactory(p1, function(err){
        expect(err).to.be.an(Error);
        done();
      });
    });
  });
});
