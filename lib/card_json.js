var mongoose = require('mongoose')
  , db_uri = 'mongodb://localhost/http_runner_'+process.env.NODE_ENV;

mongoose.connect(db_uri, function(err, res){
  if(err){ console.log("Connection with "+db_uri+" failed: " + err); }
  else{ console.log("Connection to "+db_uri+" established."); }
});

mongoose.connection.db.on('close', function(){
  if(process.env.NODE_ENV == "test"){ mongoose.connection.db.dropDatabase(); }
})

var cardSchema = mongoose.Schema({ card_id: String, card: {} })
  , CardJSON = mongoose.model('Card', cardSchema);

module.exports = CardJSON;