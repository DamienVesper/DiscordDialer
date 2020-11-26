// Require modules.
const config = require(`../config/config`);
const Discord = require(`discord.js`);
const fs = require(`fs`);

// Command data.
module.exports = {
    name: `dtmf`,
    description: `Dial a number.`,
    usage: `<number>`,
    aliases: []
}

// Command execution.
module.exports.execute = async(client, message, args) => {
    const m = `${message.author} »`;

    if(!message.member.roles.some(r => (config.roles.admin.includes(r.id) || config.roles.trusted.includes(r.id)))) return message.channel.send(`${config.emojis.no} You do not have permission to use the dialer.`);
    fs.readFile(config.logs.callStatus, `utf8`, (err, data) => {
        if(data == `false`) return message.channel.send(`${m} ${config.emojis.no} No call in progress, please dial a number to use DTMF.`);

        message.channel.send(`${m} ${config.emojis.ok} Sent DTMF Code: ${args[0]}`);

        let numbers = args[0].split(` `);

        numbers.forEach(number => {
            setTimeout(() => { // Terrible way for this to work but it works.
                switch(number) {
                    case `1`: robot.dragMouse(280, 160); break;
                    case `2`: robot.dragMouse(400, 160); break;
                    case `3`: robot.dragMouse(510, 160); break;
                    case `4`: robot.dragMouse(280, 200); break;
                    case `5`: robot.dragMouse(400, 200); break;
                    case `6`: robot.dragMouse(510, 200); break;
                    case `7`: robot.dragMouse(280, 240); break;
                    case `8`: robot.dragMouse(400, 240); break;
                    case `9`: robot.dragMouse(510, 240); break;
                    case `0`: robot.dragMouse(280, 280); break;
                    case `#`: robot.dragMouse(400, 280); break;
                    case `*`: robot.dragMouse(280, 280); break;
                    default: return message.channel.send(`${config.emojis.warning} Invalid Parameters - DTMF code must be numerical or special characters like star \`*\` or hashtag \`*\`.`);
                }
                robot.mouseClick();
            }, 50);
        });
    });
}