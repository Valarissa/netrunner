exports = module.exports = Netrunner;

exports.Player = require('./player');
exports.DeckList = require('./deck_list');
exports.Runner = require('./identities/runner');
exports.Corp = require('./identities/corp');
exports.IdentityFactory = require('./factories/identity_factory');
exports.CardFactory = require('./factories/card_factory');

function Netrunner(options) {

}
