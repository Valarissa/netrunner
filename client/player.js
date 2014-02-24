function Player(options){
  options = options || {};
  this.deck = options.deck;
  if(this.deck == undefined) throw Error('Player has no Deck');

  this.identity = options.deck.identity;
  if(this.identity == undefined) throw Error('Player has no Identity');

  this.scored_agendas = [];
  this.credits = 0;
  this.hand = [];
}

module.exports = Player;
