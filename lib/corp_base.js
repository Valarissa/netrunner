var Card = require('./card');

function CorpBase(json){
  Card.call(this, json);
}

CorpBase.prototype = Object.create(Card.prototype);

module.exports = CorpBase;
