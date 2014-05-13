var netrunner = require('../../')
  , card_fixtures = require('../fixtures/')
  , IdentityFactory = netrunner.IdentityFactory
  , CardFactory = netrunner.CardFactory
  , expect = require('expect.js');

var fixtures = new card_fixtures.Base()
  , example_corp_identity_json = fixtures.corp_id
  , example_runner_identity_json = fixtures.runner_id
  , test_corp_id
  , test_runner_id;

describe('IdentityFactory', function(){
  describe('#create', function(){
    beforeEach(function(){
      test_corp_id = CardFactory.create({json: example_corp_identity_json});
      test_runner_id = CardFactory.create({json: example_runner_identity_json});
    });

    it('constructs an identity from a card id', function(){
      var stub_holder = CardFactory.getFromAPIUsingID;

      CardFactory.getFromAPIUsingID = function(id, callback){
        callback(example_corp_identity_json);
      }

      expect(CardFactory.create({id:"02031"})).to.eql(test_corp_id);

      CardFactory.getFromAPIUsingID = stub_holder;
    });

    it('hass a minimum card count', function(){
      expect(test_corp_id.card_min).to.be(45);
      expect(test_runner_id.card_min).to.be(40);
    });

    it('has a maximum influence', function(){
      expect(test_corp_id.influence_max).to.be(15);
      expect(test_runner_id.influence_max).to.be(15);
    });

    it('has a faction', function(){
      expect(test_corp_id.faction).to.be('jinteki');
      expect(test_runner_id.faction).to.be('criminal');
    });

    it('is given a side based on faction type', function(){
      expect(test_corp_id.side).to.be('corp');
      expect(test_runner_id.side).to.be('runner');
    });

    it('creates different types based on json input', function(){
      var Corp = netrunner.Corp
        , Runner = netrunner.Runner;

      expect(test_corp_id).to.be.a(Corp);
      expect(test_runner_id).to.be.a(Runner);
    });
  });
});
