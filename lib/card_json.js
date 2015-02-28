var mongoose = require('mongoose')

var cardSchema = mongoose.Schema({ card_id: String, card: {} })
  , CardJSON = mongoose.model('Card', cardSchema);

module.exports = CardJSON;
