// Require modules.
const config = require(`../../config/config`);
const { exec } = require(`child_process`);
const log = require(`../utils/log.js`);

// Command data.
module.exports = {
    desc: `Hang up the call.`,
    aliases: [`fuckoff`]
};

// Command execution.
module.exports.execute = async (client, message, args) => {
    const m = `${message.author} »`;

    if (!message.member.roles.some(r => (config.roles.admin.includes(r.id) || config.roles.trusted.includes(r.id)))) return message.channel.send(`${m} ${config.emojis.no} You can't use that!`);
    log(`green`, `Current Call State: ${client.callStatus}`);

    if (client.callStatus) {
        message.channel.send(`${m} ${config.emojis.ok} Hung up the phone...`);
        exec(`dial.bat /hangupall`, (err, data) => {
            if (err) log(`red`, err);
            log(`magenta`, `${message.author.tag} hung up.`);
            client.callStatus = false;
        });
    } else message.channel.send(`${m} ${config.emojis.no} There is no call taking place at this time!`);
};
