// Require modules.
const config = require(`../config/config`);
const Discord = require(`discord.js`);
const {
    client
} = require(`../index.js`);
const log = require(`../utils/log.js`);

// Event execution.
module.exports = client.on(`ready`, () => {
    log(`green`, `${client.user.tag} has started with ${client.users.size} users in ${client.guilds.size} servers.`);
    client.user.setPresence({
        game: {
            name: `${client.users.size} scambaiters`,
            type: `WATCHING`
        },
        status: `dnd`
    });
});