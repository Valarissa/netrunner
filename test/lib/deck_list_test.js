var netrunner = require('../../')
  , card_fixtures = require('../fixtures/')
  , DeckList = netrunner.DeckList
  , Card = netrunner.Card
  , expect = require('expect.js');

var stubbed_method_holder
  , fixtures = new card_fixtures.Base();

describe('DeckList', function(){
  before(function(){
    stubbed_method_holder = CardFactory.getFromAPIUsingID;
    CardFactory.getFromAPIUsingID = function(id, callback){
      callback(fixtures.api_hash()[id]);
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

    it('verifies that the deck is not over the maximum influence', function(){
      delete legit_deck_list["00001"];
      legit_deck_list["00006"] = 3;
      expect(test_function).to.throwException(/deck list must not exceed identity's maximum influence/i);
    });

    it('verifies that a corp deck has the required amount of agenda points', function(){
      legit_deck_list["00026"] = 1;
      expect(test_function).to.throwException(/deck list has too many agenda points/i);

      delete legit_deck_list["00026"];
      delete legit_deck_list["00023"];
      legit_deck_list["00016"] = 3;
      legit_deck_list["02031"] = 1;
      expect(test_function).to.throwException(/deck list has too few agenda points/i);
    });

    it('verifies that a corp deck cannot have agendas from another corp', function(){
      delete legit_deck_list["00025"];
      legit_deck_list["00027"] = 1;
      expect(test_function).to.throwException(/another faction\'s agenda may not be included in a deck/i);
    });

    it('verifies that a corp deck cannot have a runner card', function(){
      delete legit_deck_list["00001"];
      legit_deck_list["00007"] = 1;
      expect(test_function).to.throwException(/you can\'t have runner cards in a corp deck/i);
    });
  });

  after(function(){
    CardFactory.getFromAPIUsingID = stubbed_method_holder;
  });
});
