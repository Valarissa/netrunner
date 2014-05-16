var CorpBase = require('./corp_base');

function Operation(json){
  CorpBase.call(this, json);
  this.subtype = json.subtype;
}

Operation.prototype = Object.create(Operation.prototype);

module.exports = Operation;
