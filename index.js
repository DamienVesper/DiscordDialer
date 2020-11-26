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

fs.readFile(`logs/callstatus.log`, `utf8`, (err, data) => {
    if(err) log(1, err);
    log(0, `Current call state: ${data}`);
    if(data == `true`) {
        log(0, `Resetting Call Status to True`);
        fs.writeFile(`logs/callstatus.log`, `false`, err => {
            if(err) log(1, err);
            log(0, `Call Status Reset`);
        });
    }
});

// Export client and config because the command files need them.
module.exports = { client, config }

// Build client commands.
client.commands = new Discord.Collection();
fs.readdir(`${__dirname}/commands`, (err, files) => {
    console.log(`Loading ${files.length} commands...`);
    files.forEach((f, i) => {
        client.commands.set(f.split(`.`)[0], require(`./commands/${f}`));
        console.log(`${i}: ${f} was loaded!`);
    });
});

// Build client events.
client.events = new Discord.Collection();
fs.readdir(`${__dirname}/events`, (err, files) => {
    console.log(`Loading ${files.length} events...`);
    files.forEach((f, i) => {
        client.commands.set(f.split(`.`)[0], require(`./events/${f}`));
        console.log(`${i}: ${f} was loaded!`);
    });
});

client.login(config.token);