var Agenda = require('./agenda');

var AgendaFactory = {
  create: function(options){
    var agenda;

    function buildFromJSON(json){
      agenda = new Agenda(json);
    }

    if(options.json != undefined){ buildFromJSON(options.json); }

    return agenda;
  }
};

module.exports = AgendaFactory;
