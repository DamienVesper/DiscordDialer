const Discord = require(`discord.js`);
const fs = require(`fs`);
const config = require(`./config/config.js`);
const log = require(`./utils/log.js`);
const path = require(`path`);
const dotenv = require(`dotenv`).config();

const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    sync: true
});

client.callStatus = false;
log(`green`, `Current call state: ${client.callStatus}`);
if (client.callStatus) log(`green`, `Resetting Call Status to True`);

// Export client and config because the command files need them.
module.exports = {
    client,
    config
};

// Build client commands.
client.commands = new Discord.Collection();
fs.readdir(path.resolve(__dirname, `commands`), files => {
    log(`cyan`, `Loading ${files.length} commands...`);
    files.forEach((f, i) => {
        client.commands.set(f.split(`.`)[0], require(`./commands/${f}`));
        log(`yellow`, `${i}: ${f} was loaded!`);
    });
});

// Build client events.
client.events = new Discord.Collection();
fs.readdir(`${__dirname}/events`, (err, files) => {
    log(`cyan`, `Loading ${files.length} events...`);
    files.forEach((f, i) => {
        client.commands.set(f.split(`.`)[0], require(`./events/${f}`));
        log(`yellow`, `${i}: ${f} was loaded!`);
    });
});

client.login(config.token).catch(() => log(`red`, `Could not login to client.`));

process.on(`uncaughtException`, e => log(`red`, e.stack));
process.on(`SIGINT`, () => {
    log(`red`, `Client is exiting...`);
    client.destroy();
    process.exit();
});
