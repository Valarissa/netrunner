var Card = require('./card.js');

function RunnerBase(json){
  Card.call(this, json);
}

RunnerBase.prototype = Object.create(Card.prototype);

module.exports = RunnerBase;
