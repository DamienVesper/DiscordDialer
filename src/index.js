require(`dotenv`).config();

const Discord = require(`discord.js`);
const config = require(`../config/config.js`);

const fs = require(`fs`);
const path = require(`path`);

// Utilities.
const log = require(`./utils/log.js`);
const logHeader = require(`./utils/logHeader.js`);
const logASCII = require(`./utils/logASCII.js`);

const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    sync: true
});

// Uncaught handler.
process.on(`uncaughtException`, e => log(`red`, e.stack));

client.callStatus = false;
log(`green`, `Current call state: ${client.callStatus}`);
if (client.callStatus) log(`green`, `Resetting Call Status to True`);

// Export client.
module.exports = client;
logASCII();

// Load events.
logHeader();
const eventFiles = fs.readdirSync(path.resolve(__dirname, `./events`)).filter(file => file.endsWith(`js`));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    log(`yellow`, `Loaded event ${file}.`);
    client.on(file.split(`.`)[0], event.bind(null, client));
}

// Load commands.
logHeader();
client.commands = [];
const commandFiles = fs.readdirSync(path.resolve(__dirname, `./commands`)).filter(file => file.endsWith(`js`));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    log(`yellow`, `Loaded command ${file}.`);
    client.commands.push({
        name: file.split(`.`)[0],
        desc: command.desc,
        usage: command.usage,
        run: command.run
    });
}

logHeader();
client.login(config.token).catch(() => log(`red`, `Failed to authenticate client with application.`));
