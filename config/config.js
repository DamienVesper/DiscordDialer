// This is the configuration file. The 'developers' array should include all user IDs of those who are the owner of the standalone / production client.
// Prefix should be replaced with your custom prefix.

const dotenv = require(`dotenv`).config();

let config = {
    // Preset configuration.
    colors: [0x00ff00, 0xff0000, 0xffffff],
    emojis: require(`./emojis.js`),
    token: process.env.DISCORD_BOT_TOKEN,
    version: `1.0.0`,
    footer: `Created by DamienVesper#0001`,

    // Custom configuration.
    developers: [`386940319666667521`, `621645567478464514`],
    prefix: `+`,
    roles: {
        trusted: `781360139231821854`,
        admin: `757137579849154630`
    },
    logFile: `logs/bot.log`
}

module.exports = config
