require('../support');

var netrunner = require('../../')
  , DeckList = netrunner.DeckList
  , fixtures = require('../fixtures/')
  , Base = new fixtures.Base()
  , expect = require('expect.js');

describe('DeckList', function(){
  describe('#new', function(){
    var legit_deck_list;
    beforeEach(function(){
      legit_deck_list = Base.corp_legit_deck_list();
    });


    it('creates a DeckList from a JSON object', function(done){
      dl = new DeckList(legit_deck_list, function(){
        expect(dl).to.be.a(DeckList);
        expect(dl.cards.length).to.be(45);
        done();
      });
    });

    it('requires an identity', function(done){
      var test_function = function(){ new DeckList(legit_deck_list, function(err){
        expect(err.message).to.match(/deck list has no identity/i);
        done();
      }); }
      delete legit_deck_list["02031"];
      test_function();
    });

    it('verifies that there are no more than three copies per card', function(done){
      var test_function = function(){ new DeckList(legit_deck_list, function(err){
        expect(err.message).to.match(/deck list cannot have more than 3 of any given card/i);
        done();
      }); }
      legit_deck_list["00001"] = 4;
      test_function();
    });

    it('verifies that there are not two identities', function(done){
      var test_function = function(){ new DeckList(legit_deck_list, function(err){
        expect(err.message).to.match(/deck list cannot have more than one identity/i);
        done();
      }); }
      legit_deck_list["05030"] = 1;
      test_function();
    });

    it('verifies that the deck is not under the minimum deck size', function(done){
      var test_function = function(){ new DeckList(legit_deck_list, function(err){
        expect(err.message).to.match(/deck list must meet minimum deck size for given identity/i);
        done();
      }); }
      delete legit_deck_list["00011"];
      test_function();
    });

    it('verifies that the deck is not over the maximum influence', function(done){
      var test_function = function(){ new DeckList(legit_deck_list, function(err){
        expect(err.message).to.match(/deck list must not exceed identity's maximum influence/i);
        done();
      }); }
      delete legit_deck_list["00001"];
      legit_deck_list["00006"] = 3;
      test_function();
    });

    it('verifies that a corp deck has less than the required maximum of agenda points', function(done){
      var test_function = function(){ new DeckList(legit_deck_list, function(err){
        expect(err.message).to.match(/deck list has too many agenda points/i);
        done();
      }); }
      legit_deck_list["00026"] = 1;
      test_function();
    });

    it('verifies that a corp deck has more than the required minimum of agenda points', function(done){
      var test_function = function(){ new DeckList(legit_deck_list, function(err){
        expect(err.message).to.match(/deck list has too few agenda points/i);
        done();
      }); }
      delete legit_deck_list["00026"];
      delete legit_deck_list["00023"];
      legit_deck_list["00016"] = 3;
      legit_deck_list["02031"] = 1;
      test_function();
    });

    it('verifies that a corp deck cannot have agendas from another corp', function(done){
      var test_function = function(){ new DeckList(legit_deck_list, function(err){
        expect(err.message).to.match(/another faction\'s agenda may not be included in a deck/i);
        done();
      }); }
      delete legit_deck_list["00025"];
      legit_deck_list["00027"] = 1;
      test_function();
    });

    it('verifies that a corp deck cannot have a runner card', function(done){
      var test_function = function(){ new DeckList(legit_deck_list, function(err){
        expect(err.message).to.match(/you can\'t have runner cards in a corp deck/i);
        done();
      }); }
      delete legit_deck_list["00001"];
      legit_deck_list["00007"] = 1;
      test_function();
    });
  });
});
