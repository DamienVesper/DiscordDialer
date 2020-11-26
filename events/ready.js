// Require modules.
const config = require(`../../config/config`);
const Discord = require(`discord.js`);
const { client } = require(`../index.js`);

// Event execution.
module.exports = client.on(`ready`, () => {
    console.log(`Shard ${client.shard.id}: ${client.user.tag} has started with ${client.users.size} in ${client.guilds.size} servers.`);
    client.user.setPrescence({
        game: {
            name: `${client.users.size} players mine in ${client.user.username}`,
            type: `WATCHING`
        },
        status: `dnd`
    });
    client.setActivity(`MineX`);
});
