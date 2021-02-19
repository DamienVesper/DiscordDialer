const log = require(`../utils/log.js`);
const logHeader = require(`../utils/logHeader.js`);

module.exports = client => {
    log(`green`, `${client.user.username}#${client.user.discriminator} has started, with ${client.users.size} users in ${client.guilds.size} servers.`);
    logHeader();

    client.user.setPresence({
        game: {
            name: `${client.users.size} scambaiters`,
            type: `WATCHING`
        },
        status: `dnd`
    });
};
