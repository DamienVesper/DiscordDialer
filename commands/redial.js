// Require modules.
const config = require(`../config/config`);
const Discord = require(`discord.js`);
const robot = require(`robotjs`);
const log = require(`../utils/log.js`);

// Command data.
module.exports = {
    name: `redial`,
    description: `Redial a number.`,
    usage: ``,
    aliases: []
};

// Command execution.
module.exports.execute = async (client, message, args) => {
    const m = `${message.author} »`;

    if (!message.member.roles.some(r => (config.roles.admin.includes(r.id) || config.roles.trusted.includes(r.id)))) return message.channel.send(`${config.emojis.no} You do not have permission to use the dialer.`);

    if (!client.callStatus) {
        message.channel.send(`${m} ${config.emojis.ok} Redialing...`);
        robot.dragMouse(280, 320);
        robot.mouseClick();
    } else message.channel.send(`${m} ${config.emojis.no} There is a call currently taking place at this time!`);
};
