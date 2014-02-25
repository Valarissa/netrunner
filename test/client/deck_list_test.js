var netrunner = require('../../')
  , DeckList = netrunner.DeckList
  , Card = netrunner.Card
  , IdentityFactory = netrunner.IdentityFactory
  , expect = require('expect.js');

var stubbed_method_holder;

describe('DeckList', function(){
  before(function(){
    stubbed_method_holder = IdentityFactory.create;
    IdentityFactory.create = function(){
      return {} // I'm an ID, I swear...
    };
  });

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

  after(function(){
    IdentityFactory.create = stubbed_method_holder;
  });
});
