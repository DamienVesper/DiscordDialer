// Require modules.
const config = require(`../config/config`);
const Discord = require(`discord.js`);
const { client } = require(`../index.js`);
const log = require(`../utils/log.js`);

// Event execution.
module.exports = client.on(`ready`, () => {
    log(`${client.user.tag} has started with ${client.users.size} users in ${client.guilds.size} servers.`, `green`);
    client.user.setPrescence({
        game: {
            name: `${client.users.size} players mine in ${client.user.username}`,
            type: `WATCHING`
        },
        status: `dnd`
    });
    client.setActivity(`Viewing things`);
});
