var netrunner = require('../../')
  , Identity = netrunner.Identity
  , Card = netrunner.Card
  , expect = require('expect.js');

var example_corp_identity_json = {"last-modified":"2014-01-24T06:40:16-05:00","code":"02031","title":"Jinteki: Replicating Perfection","type":"Identity","type_code":"identity","subtype":"Megacorp","subtype_code":"megacorp","text":"The Runner cannot run on remote servers. Ignore this ability until the end of the turn whenever the Runner runs on a central server.","faction":"Jinteki","faction_code":"jinteki","influencelimit":15,"minimumdecksize":45,"number":31,"quantity":3,"setname":"Trace Amount","set_code":"ta","side":"Corp","side_code":"corp","uniqueness":false,"url":"http:\/\/netrunnerdb.com\/en\/card\/02031","imagesrc":"\/web\/bundles\/netrunnerdbcards\/images\/cards\/en\/02031.png","largeimagesrc":"\/web\/bundles\/netrunnerdbcards\/images\/cards\/en-large\/02031.png","nbopinions":0,"opinions":[]}

describe('Identity', function(){
  describe('#new', function(){
    var test_id;
    beforeEach(function(){
      test_id = new Identity({json: example_corp_identity_json});
    });

    it('constructs an identity from a card id', function(){
      Card.getFromAPIUsingID = function(id, callback){
        callback(example_corp_identity_json);
      }

      expect(new Identity({id:"02031"})).to.eql(test_id);
    });

    it('hass a minimum card count', function(){
      expect(test_id.card_min).to.be(45);
    });

    it('has a maximum influence', function(){
      expect(test_id.influence_max).to.be(15);
    });
  });
});
