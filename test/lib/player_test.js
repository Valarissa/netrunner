var netrunner = require('../../')
  , Player = netrunner.Player
  , expect = require('expect.js');


describe('Player', function(){
  describe('#new', function(){
    var test_function = function(opts){
      new Player(opts);
    }
    it('throws an error if no deck is present', function(){
      expect(test_function).to.throwException(/player has no deck/i);
    })

    it('throws an error if no identity is present', function(){
      expect(test_function).withArgs({deck: {}}).to.throwException(/player has no identity/i);
    })

    it('returns a Player if identity is given', function(){
      player = new Player({deck: {identity: 'Derp'}});
      expect(player).to.be.a(Player);
    })
  })
})
