const Discord = require(`discord.js`);
const config = require(`../../config/config.js`);

module.exports = {
    desc: `View the help menu.`,
    usage: `[command]`
};

module.exports.run = async (client, message, args) => {
    const m = `${message.author} »`;

    const commands = client.commands;
    const data = [];

    if (!args[0]) {
        let helpTxt = ``;
        commands.forEach(cmd => cmd.name !== `dev` ? helpTxt += `\`${config.prefix + cmd.name + (cmd.usage ? ` ${cmd.usage}` : ``)}\` - ${cmd.desc}\n` : null);

        const sEmbed = new Discord.RichEmbed()
            .setColor(0xcfcf53)
            .setAuthor(`Help Menu`)
            .setDescription(helpTxt)
            .setTimestamp(new Date())
            .setFooter(config.footer);
        return message.channel.send(sEmbed);
    }

    const commandName = args[0].toLowerCase();
    const command = commands.find(command => command.name === commandName) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) return message.channel.send(`${m} That is not a valid command!`);

    if (command.usage) data.push(`**Usage:** \`${config.prefix}${command.name} ${command.usage}\``);
    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(`, `)}`);

    const sEmbed = new Discord.RichEmbed()
        .setColor(0xcfcf53)
        .setAuthor(`Help Menu | ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`)
        .setDescription(`${command.desc}\n\n${data.join(`\n`)}`)
        .setTimestamp(new Date())
        .setFooter(config.footer);
    return message.channel.send(sEmbed);
};
