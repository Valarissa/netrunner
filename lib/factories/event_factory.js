var Event = require('../cards/event');

var EventFactory = {
  create: function(options){
    var event;

    function buildFromJSON(json){
      event = new Event(json);
    }

    if(options.json != undefined){ buildFromJSON(options.json); }

    return event;
  }
};

module.exports = EventFactory;
