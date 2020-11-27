// Require modules.
const config = require(`../config/config`);
const Discord = require(`discord.js`);
const { client } = require(`../index.js`);

// Event execution.
module.exports = client.on(`message`, message => {
    const m = `${message.author} »`;

    // Message Filtering.
    if(message.author.bot || message.channel.type == `dm`) return;
    if(message.content.slice(0, config.prefix.length).toString().toLowerCase() != config.prefix) return;

    // Define command and arguments.
    const args = message.content.slice(config.prefix.length).trim().split(/ + /g);
    const command = args.shift().toLowerCase();

    // Assign the command based on what is referenced (command name or an alias of the command).
    let cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && aliases.includes(command));

    // Pass the command through a series of tests to determine whether it exists and has been used properly.
    if(!cmd || command == ``) return;
    else if((cmd.usage) && args.length < (cmd.usage.split(`<`).length) - 1) return message.channel.send(`${m} Proper usage is \`${config.prefix + cmd.name} ${cmd.usage}\`.`);
    else {
        try {
            // Log the command ran and execute the command.
            log(`${message.author.tag} ran command ${command} in ${message.guild ? `${message.guild.name} [${message.guild.id}].`: ``}`, `magenta`);
            cmd.run(client, message, args)
        }
        catch(err) {
            // Catch and log the error.
            log(`There was an error executing ${cmd.name}.js by user ${message.author.tag}.`, `red`);
            log(err, `red`);

            // Send a fallback message to the user.
            message.channel.send(`${m} There was an error executing that command.`);
        }
    }
});
