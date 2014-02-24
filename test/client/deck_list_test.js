var netrunner = require('../../')
  , DeckList = netrunner.DeckList
  , expect = require('expect.js');

describe('DeckList', function(){
  describe('#new', function(){
    it('creates a DeckList from a JSON object', function(){
      dl = new DeckList({"00001":3, "00002":2, "02031":1});
      expect(dl).to.be.a(DeckList);
      expect(dl.cards.length).to.be(5);
    });

    it('throws an error if no identity is given', function(){
      expect(DeckList).withArgs({"00002":3, "00004":2}).to.throwException(/deck list has no identity/i);
    });
  });
});
