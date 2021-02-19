// Require modules.
const config = require(`../../config/config`);
const log = require(`../utils/log.js`);

const { exec } = require(`child_process`);
const path = require(`path`);

// Command data.
module.exports = {
    desc: `Dial a number.`,
    usage: `<number>`,
    aliases: [`call`]
};

// Command execution.
module.exports.run = async (client, message, args) => {
    const m = `${message.author} »`;

    if (!message.member.roles.some(r => (config.roles.admin.includes(r.id) || config.roles.trusted.includes(r.id)))) return message.channel.send(`${m} ${config.emojis.no} You can't use that!`);
    if (client.callStatus) return message.channel.send(`${m} ${config.emojis.no} A call is currently taking place!`);

    if (args[0] === `balance`) {
        message.channel.send(`${m} ${config.emojis.telephone} Dialing balance check...`);

        exec(`${path.resolve(__dirname, `../../scripts/dial.bat`)} *225`, (err, data) => {
            if (err) return log(`red`, err.stack);
            log(`cyan`, `${message.author.tag} dialed number: BALANCE (225).`);
        });
        client.callStatus = true;

        setTimeout(() => {
            message.channel.send(`${config.emojis.ok} Balance check has ended...`);
        }, 11e3);
    } else if (args[0] === `echotest`) {
        message.channel.send(`${config.emojis.telephone} Dialing echotest...`);
        exec(`${path.resolve(__dirname, `../../scripts/dial.bat`)} 4443`, (err, data) => {
            if (err) log(`red`, err.stack);
            log(`cyan`, `${message.author.tag} dialed number: ECHOTEST (4443).`);
        });
        client.callStatus = true;
    } else {
        if (args[0].length !== 10 || isNaN(parseInt(args[0]))) return message.channel.send(`${m} ${config.emojis.warning} Invalid Number Format - Please enter a 10 digit US phone number without the "+1".`);
        if (config.blacklistedNumbers.includes(`1${args[0]}`)) return message.channel.send(`${m} ${config.emojis.no} That number is blacklisted!`);

        exec(`${path.resolve(__dirname, `../../scripts/dial.bat`)} ${args[0]}`, (err, data) => {
            if (err) log(`red`, err.stack);
            log(`magenta`, `${message.author.tag} Dialed Number: +1 ${args[0]}.`);
        });
        message.channel.send(`${config.emojis.telephone} Dialing \`+1${args[0]}\`...`);
        client.callStatus = true;
    }
};
