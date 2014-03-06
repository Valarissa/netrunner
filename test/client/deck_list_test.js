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
      return {card_min:45} // I'm an ID, I swear...
    };
  });

  describe('#new', function(){
    var legit_deck_list;
    beforeEach(function(){
      legit_deck_list = {"00001":3,"00002":3,"00003":3,"00004":3,"00005":3
                        ,"00011":3,"00012":3,"00013":3,"00014":3,"00015":3
                        ,"00021":3,"00022":3,"00023":3,"00024":3,"00025":3
                        ,"02031":1};
    });

    var test_function = function(){
      new DeckList(legit_deck_list);
    }

    it('creates a DeckList from a JSON object', function(){
      dl = new DeckList(legit_deck_list);
      expect(dl).to.be.a(DeckList);
      expect(dl.cards.length).to.be(45);
    });

    it('requires an identity', function(){
      delete legit_deck_list["02031"];
      expect(test_function).to.throwException(/deck list has no identity/i);
    });

    it('verifies that there are no more than three copies per card', function(){
      legit_deck_list["00001"] = 4;
      expect(test_function).to.throwException(/deck list cannot have more than 3 of any given card/i);
    });

    it('verifies that there are not two identities', function(){
      legit_deck_list["05030"] = 1;
      expect(test_function).to.throwException(/deck list cannot have more than one identity/i);
    });

    it('verifies that the deck is not under the minimum deck size', function(){
      delete legit_deck_list["00011"];
      expect(test_function).to.throwException(/deck list must meet minimum deck size for given identity/i);
    });
  });

  after(function(){
    IdentityFactory.create = stubbed_method_holder;
  });
});
