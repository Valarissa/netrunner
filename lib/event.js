var RunnerBase = require('./runner_base.js');

var Event = function(json){
  RunnerBase.call(this, json);
}

Event.prototype = Object.create(RunnerBase.prototype);

module.exports = Event;
