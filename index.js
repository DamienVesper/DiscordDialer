const Discord = require(`discord.js`);
const fs = require(`fs`);
const config = require(`./config/config.js`);
const log = require(`./utils/log.js`);
const dotenv = require(`dotenv`).config();

let client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    sync: true
});


client.callStatus = false;
log(`Current call state: ${client.callStatus}`, `green`);
if(client.callStatus) log(`Resetting Call Status to True`, `false`);

// Export client and config because the command files need them.
module.exports = { client, config }

// Build client commands.
client.commands = new Discord.Collection();
fs.readdir(`${__dirname}/commands`, (err, files) => {
    log(`Loading ${files.length} commands...`, `yellow`);
    files.forEach((f, i) => {
        client.commands.set(f.split(`.`)[0], require(`./commands/${f}`));
        log(`${i}: ${f} was loaded!`, `yellow`);
    });
});

// Build client events.
client.events = new Discord.Collection();
fs.readdir(`${__dirname}/events`, (err, files) => {
    log(`Loading ${files.length} events...`, `yellow`);
    files.forEach((f, i) => {
        client.commands.set(f.split(`.`)[0], require(`./events/${f}`));
        log(`${i}: ${f} was loaded!`, `yellow`);
    });
});

client.login(config.token).catch(err => log(err, `red`));
process.on(`SIGINT`, () => {
    log(`Client shutting down`, `red`);
    log(``, `white`);
    client.destroy();
    process.exit();
});