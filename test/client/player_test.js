var netrunner = require('../../')
  , Player = netrunner.Player
  , expect = require('expect.js');


describe('Player', function(){
  describe('#new', function(){
    it('throws an error if no deck is present', function(){
      expect(Player).to.throwException(/player has no deck/i);
    })

    it('throws an error if no identity is present', function(){
      expect(Player).withArgs({deck: {}}).to.throwException(/player has no identity/i);
    })

    it('returns a Player if identity is given', function(){
      player = new Player({deck: {identity: 'Derp'}});
      expect(player).to.be.a(Player);
    })
  })
})
