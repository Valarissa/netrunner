var Card = require('./card.js');

var Agenda = function(json){
  Card.call(this, json);
  this.agenda_points = json.agendapoints;
  this.advancement_cost = json.advancementcost;
};

Agenda.prototype = Object.create(Card.prototype);

Agenda.type = "agenda";

module.exports = Agenda;
