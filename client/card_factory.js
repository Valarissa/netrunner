var http = require('http');

CardFactory = {
  getFromAPIUsingID: function(id, callback){
    http.get("http://netrunnerdb.com/api/card/"+id+"?mode=embed", function(res){
      var data = '';
      res.on('data', function(chunk){ data += chunk; });
      res.on('end', function(){ callback(JSON.parse(data)[0]); });
    })
  }
}

module.exports = CardFactory;
