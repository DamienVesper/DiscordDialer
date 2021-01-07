const Discord = require(`discord.js`);
const {
    config
} = require(`../index.js`);

module.exports = {
    name: `help`,
    description: `View info about commands.`,
    usage: `[command name]`,
    cooldown: null,
    aliases: [`commands`, `?`, `h`]
}

module.exports.execute = async (client, message, args) => {
    let m = `${message.author} »`
    let data = [];

    if (!args[0]) {
        let helpTxt = ``;
        client.commands.forEach(cmd => cmd.dev != true && cmd.name != `` && cmd.name != undefined ? helpTxt += `\`${config.prefix + cmd.name + (cmd.usage !== null ? ` ${cmd.usage}`: ``)}\` - ${cmd.description}\n` : null);

        let sEmbed = new Discord.RichEmbed()
            .setColor(0xcfcf53)
            .setAuthor(`Help Menu`)
            .setDescription(helpTxt)
            .setTimestamp(new Date())
            .setFooter(config.footer);
        return message.channel.send(sEmbed);
    }

    const name = args[0].toLowerCase();
    const command = client.commands.get(name) || client.commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command || command.name == `dev`) return message.channel.send(`${v} That is not a valid command!`);

    if (command.usage) data.push(`**Usage:** ${config.prefix}${command.name} ${command.usage}`);
    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(`, `)}`);
    if (command.cooldown !== null) data.push(`**Cooldown:** ${command.cooldown} seconds.`);

    let sEmbed = new Discord.RichEmbed()
        .setColor(0xcfcf53)
        .setAuthor(`Help Menu | ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`)
        .setDescription(`${command.description}\n\n${data.join(`\n`)}`)
        .setTimestamp(new Date())
        .setFooter(config.footer);
    return message.channel.send(sEmbed);
}