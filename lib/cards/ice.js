var CorpBase = require('./corp_base');

function Ice(json){
  CorpBase.call(this, json);
  this.strength = json.strength;
  this.subtype = json.subtype;
}

Ice.prototype = Object.create(CorpBase.prototype);

module.exports = Ice;
