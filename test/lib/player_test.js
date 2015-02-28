var netrunner = require('../../')
  , Player = netrunner.Player
  , fixtures = require('../fixtures/')
  , Base = new fixtures.Base()
  , expect = require('expect.js');


describe('Player', function(){
  describe('#new', function(){
    var test_function = function(opts, finalize){
      new Player(opts, finalize);
    }

    it('throws an error if DeckList encounters an error', function(done){
      test_function(undefined, function(err){
        expect(err.message).to.match(/deck list has no identity/i);
        done();
      });
    })

    it('returns a Player if DeckList builds successfully', function(done){
      var player = new Player({deck: Base.corp_legit_deck_list()}, function(){
        expect(player).to.be.a(Player);
        done();
      });
    })
  })
})
