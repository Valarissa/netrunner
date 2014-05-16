var Operation = require('./operation');

var OperationFactory = {
  create: function(options){
    var operation;

    function buildFromJSON(json){
      operation = new Operation(json);
    }

    if(options.json != undefined){ buildFromJSON(options.json); }

    return operation;
  }
};

module.exports = OperationFactory;
