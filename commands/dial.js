// Require modules.
const config = require(`../../config/config`);
const Discord = require(`discord.js`);
const fs = require(`fs`);
const { exec } = require(`child_process`);

// Command data.
module.exports = {
    name: `dial`,
    description: `Dial a number.`,
    usage: `<number>`,
    aliases: [`call`]
}

// Command execution.
module.exports.execute = async(client, message, args) => {
    const m = `${message.author} »`;

    if(!message.member.roles.some(r => (config.roles.admin.includes(r.id) || config.roles.trusted.includes(r.id)))) return message.channel.send(`${config.emojis.no} You do not have permission to use the dialer.`);
    fs.readFile(`logs/callstatus.log`, `utf8`, (err, data) => {
        if(err) log(1, err);
        log(2, `Current Call State: ${data}`);
        if(data == `true`) return message.channel.send(`${m} ${config.emojis.no} This dial command is for the bot owner only!`);
        message.channel.send(`${m} ${config.emojis.telephone} Dialing balance check...`);

        exec(`dial.bat` + `*225`, (err, data) => {
            if(err) return log(1, err);
            log(2, `${message.author.tag} dialed number: BALANCE (225) at ${new Date().toISOString()}.`);
        });

        fs.writeFile(`logs/callstatus.log`, `true`)
    });
}