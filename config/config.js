// This is the configuration file. The 'developers' array should include all user IDs of those who are the owner of the standalone / production client.
// Prefix should be replaced with your custom prefix.

const dotenv = require(`dotenv`).config();

const config = {
    // Preset configuration.
    colors: [0x00ff00, 0xff0000, 0xffffff],
    emojis: require(`./emojis.js`),
    token: process.env.DISCORD_BOT_TOKEN,
    version: `1.0.0`,
    footer: `Created by DamienVesper#0001`,
    blacklistedNumbers: require(`./blacklist.js`),

    // Custom configuration.
    developers: [`386940319666667521`, `621645567478464514`, `447670159750987776`],
    prefix: `+`,
    roles: {
        trusted: `781360139231821854`,
        admin: `757137579849154630`
    },
    logs: {
        dir: `logs`,
        file: `bot.log`
    }
};

module.exports = config;
