var netrunner = require('../../')
  , Deck = netrunner.Deck
  , DeckList = netrunner.DeckList
  , expect = require('expect.js');

describe('Deck', function(){
  describe('#new', function(){
    var valid_deck_list;
    beforeEach(function(){
      valid_deck_list = new DeckList({"02031":1,"00001":3,"00002":3});
    });

    it('throws an error if deck_list has no identity', function(){
      valid_deck_list.identity = null;
      expect(Deck).withArgs(valid_deck_list).to.throwException(/deck has no identity/i);
    });

    it('throws an error if deck has fewer cards than identity minimum', function(){
      valid_deck_list.identity = {card_min:7};
      expect(Deck).withArgs(valid_deck_list).to.throwException(/deck has too few cards for given identity/i);
    });
  });
});
