require('../../support');

var netrunner = require('../../../')
  , CardFactory = netrunner.CardFactory
  , expect = require('expect.js')

var example_corp_identity_json = {"code":"02031","title":"Jinteki: Replicating Perfection","type":"Identity","type_code":"identity","subtype":"Megacorp","subtype_code":"megacorp","text":"The Runner cannot run on remote servers. Ignore this ability until the end of the turn whenever the Runner runs on a central server.","faction":"Jinteki","faction_code":"jinteki","faction_letter":"j","influencelimit":15,"minimumdecksize":45,"number":31,"quantity":3,"setname":"Trace Amount","set_code":"ta","side":"Corp","side_code":"corp","uniqueness":false,"limited":false,"cyclenumber":2,"url":"http:\/\/netrunnerdb.com\/en\/card\/02031"}

describe('CardFactory', function(){
  describe('::getFromAPIUsingID', function(){
    it('makes a call to an API to receive a JSON', function(done){
      function testCallback(json){
        delete json.imagesrc;
        delete json.largeimagesrc;
        delete json["last-modified"];
        delete json.ancurLink;
        expect(json).to.eql(example_corp_identity_json);
        done();
      }

      this.timeout(5000);
      CardFactory.getFromAPIUsingID("02031", testCallback);
    });
  });
});
