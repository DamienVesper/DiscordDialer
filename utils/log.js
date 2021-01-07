/* Used to make complex logging easier and shorter */

// Ex usage
// log(message.content, `magenta`, message, {server: true, channel: true, user: true, regex: true});

const fs = require(`fs`);
const config = require(`../config/config.js`);
const path = require(`path`);

module.exports = (color, ...content) => {
    // Create Variables.
    if(!fs.existsSync(`./${config.logs.dir}`)) fs.mkdirSync(config.logs.dir);

    const logFile = fs.createWriteStream(`${path.resolve(__dirname, `../`, config.logs.dir)}/${config.logs.file}`, { flags: `a` });
    let logColor, logCloseColor;
    let logContent = content.join(``);
    
    // Report an error if there is an issue with logging.
    logFile.on(`error`, err => console.log(`\x1b[33m`, `Warning: Error writing log to ${config.logs.dir + config.logs.file}\n${err}`));

    // Get time.
    const time = new Date();
    const second = String(time.getSeconds());
    const minute = String(time.getMinutes());
    const hour = String(time.getHours());
    const day = String(time.getDate()).padStart(2, `0`);
    const month = String(time.getMonth() + 1).padStart(2, `0`);
    const year = time.getFullYear();
    const formattedTime = `${month}-${day}-${year} ${hour}:${minute}:${second}`


    // Get color specified and set logColor variable to correct color
    switch(color) {
        case `black`:
            logColor = `\x1b[30m`;
            logCloseColor = `\x1b[39m`;
            break;
        case `red`:
            logColor = `\x1b[31m`;
            logCloseColor = `\x1b[39m`;
            break;
        case `green`:
            logColor = `\x1b[32m`;
            logCloseColor = `\x1b[39m`;
            break;
        case `yellow`:
            logColor = `\x1b[33m`;
            logCloseColor = `\x1b[39m`;
            break;
        case `blue`:
            logColor = `\x1b[34m`;
            logCloseColor = `\x1b[39m`;
            break;
        case `magenta`:
            logColor = `\x1b[35m`;
            logCloseColor = `\x1b[39m`;
            break;
        case `cyan`:
            logColor = `\x1b[36m`;
            logCloseColor = `\x1b[39m`;
            break;
        case `white`:
            logColor = `\x1b[37m`;
            logCloseColor = `\x1b[39m`;
            break;
    }

    // If no log volor is specified or if the color specified is invalid, throw an error
    if(!logColor) {
        throw `Did not specify a valid color`;
    }
    
    // Log logContent with the color specified to console
    logFile.write(`[${formattedTime}] >> ${logContent}`.replace(/\r?\n|\r/g, ``) + `\n`);
    return console.log(logColor, logContent, logCloseColor);
}