var http = require('http')
  , Factories = require('./factories');

CardFactory = {
  getFromAPIUsingID: function(id, callback){
    http.get("http://netrunnerdb.com/api/card/"+id+"?mode=embed", function(res){
      var data = '';
      res.on('data', function(chunk){ data += chunk; });
      res.on('end', function(){ callback(JSON.parse(data)[0]); });
    })
  },

  create: function(options){
    var card;

    function buildFromId(card_id){
      return CardFactory.getFromAPIUsingID(card_id, function(json){ buildFromJSON(json) });
    }

    function buildFromJSON(json){
      card = Factories[json.type + "Factory"].create({json: json});
    }

    if(options.json != undefined){ buildFromJSON(options.json); }
    else if(options.id != undefined){ buildFromId(options.id); }

    return card;
  }
}

module.exports = CardFactory;
