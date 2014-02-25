var netrunner = require('../../')
  , IdentityFactory = netrunner.IdentityFactory
  , Card = netrunner.Card
  , expect = require('expect.js');

var example_corp_identity_json = {"last-modified":"2014-01-24T06:40:16-05:00","code":"02031","title":"Jinteki: Replicating Perfection","type":"Identity","type_code":"identity","subtype":"Megacorp","subtype_code":"megacorp","text":"The Runner cannot run on remote servers. Ignore this ability until the end of the turn whenever the Runner runs on a central server.","faction":"Jinteki","faction_code":"jinteki","influencelimit":15,"minimumdecksize":45,"number":31,"quantity":3,"setname":"Trace Amount","set_code":"ta","side":"Corp","side_code":"corp","uniqueness":false,"url":"http:\/\/netrunnerdb.com\/en\/card\/02031","imagesrc":"\/web\/bundles\/netrunnerdbcards\/images\/cards\/en\/02031.png","largeimagesrc":"\/web\/bundles\/netrunnerdbcards\/images\/cards\/en-large\/02031.png","nbopinions":0,"opinions":[]}

var example_runner_identity_json = {"last-modified":"2014-01-24T06:40:16-05:00","code":"05030","title":"Silhouette: Stealth Operative","type":"Identity","type_code":"identity","subtype":"Natural","subtype_code":"natural","text":"The first time you make a successful run on HQ each turn, you may expose 1 card.","baselink":0,"faction":"Criminal","faction_code":"criminal","flavor":"\"Don't waste my time.\"","illustrator":"Simon Eckert","influencelimit":15,"minimumdecksize":40,"number":30,"quantity":3,"setname":"Honor and Profit","set_code":"hap","side":"Runner","side_code":"runner","uniqueness":false,"url":"http:\/\/netrunnerdb.com\/en\/card\/05030","imagesrc":"\/web\/bundles\/netrunnerdbcards\/images\/cards\/en\/05030.png","largeimagesrc":"","nbopinions":0,"opinions":[]}

describe('IdentityFactory', function(){
  describe('#create', function(){
    var test_id;
    beforeEach(function(){
      test_corp_id = IdentityFactory.create({json: example_corp_identity_json});
      test_runner_id = IdentityFactory.create({json: example_runner_identity_json});
    });

    it('constructs an identity from a card id', function(){
      var stub_holder = Card.getFromAPIUsingID;

      Card.getFromAPIUsingID = function(id, callback){
        callback(example_corp_identity_json);
      }

      expect(IdentityFactory.create({id:"02031"})).to.eql(test_corp_id);

      Card.getFromAPIUsingID = stub_holder;
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
