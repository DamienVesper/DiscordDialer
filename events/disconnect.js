// Require modules.
const config = require(`../config/config`);
const Discord = require(`discord.js`);
const { client } = require(`../index.js`);
const log = require(`../utils/log.js`);

// Event execution.
module.exports = client.on(`disconnect`, () => {
    log(`${client.user.tag} disconnected.`, `red`);
});
