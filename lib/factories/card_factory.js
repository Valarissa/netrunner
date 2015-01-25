var http = require('http')
  , CardJSON = require('../card_json')
  , Factories = require('./factories');

CardFactory = {
  getFromAPIUsingID: function(id, callback){
    http.get("http://netrunnerdb.com/api/card/"+id+"?mode=embed", function(res){
      var data = '';
      res.on('data', function(chunk){ data += chunk; });
      res.on('end', function(){ callback(JSON.parse(data)[0]); });
    })
  },

  create: function(options, callback){
    var card;

    function buildFromId(card_id){
      CardJSON.findOne({card_id: card_id}, function(err, card_json){
        if(card_json){
          buildFromJSON(card_json.card);
        }else{
          CardFactory.getFromAPIUsingID(card_id, function(json){
            buildFromJSON(json);
            var c = new CardJSON({ card_id: card_id, card: card });
            c.save( function(err){ if(err){console.log("Card could not be persisted");} } );
          });
        }
      });
    }

    function buildFromJSON(json){
      card = Factories[json.type.toLowerCase() + "Factory"].create({json: json});
      if(callback){ callback(card); }
      return card;
    }

    if(options.json != undefined){ return buildFromJSON(options.json); }
    else if(options.id != undefined){ return buildFromId(options.id); }
  }
}

module.exports = CardFactory;
