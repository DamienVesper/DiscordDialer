/* Used to make complex logging easier and shorter */

// Ex usage
// log(message.content, `magenta`, message, {server: true, channel: true, user: true, regex: true});

const fs = require(`fs`);
const config = require(`../../config/config.js`);
const path = require(`path`);

module.exports = (color, ...content) => {
    // Create Variables.
    if (!fs.existsSync(`./${config.logs.dir}`)) fs.mkdirSync(config.logs.dir);

    const logFile = fs.createWriteStream(`${path.resolve(__dirname, `../../${config.logs.dir}`)}/${config.logs.file}`, {
        flags: `a`
    });
    // Report an error if there is an issue with logging.
    logFile.on(`error`, err => console.log(`\x1b[33m`, `Warning: Error writing log to ${config.logs.dir + config.logs.file}\n${err}`));

    // Set timing variables.
    const time = new Date();
    const second = time.getSeconds().toString().padStart(2, `0`);
    const minute = time.getMinutes().toString().padStart(2, `0`);
    const hour = time.getHours().toString().padStart(2, `0`);
    const day = time.getDate().toString().padStart(2, `0`);
    const month = (time.getMonth() + 1).toString().padStart(2, `0`);
    const year = time.getFullYear().toString();
    const formattedTime = `[${month}-${day}-${year} ${hour}:${minute}:${second}]`;

    // Get specified color.
    let logColor;
    switch (color) {
        case `black`:
            logColor = `\x1b[30m`;
            break;
        case `red`:
            logColor = `\x1b[31m`;
            break;
        case `green`:
            logColor = `\x1b[32m`;
            break;
        case `yellow`:
            logColor = `\x1b[33m`;
            break;
        case `blue`:
            logColor = `\x1b[34m`;
            break;
        case `magenta`:
            logColor = `\x1b[35m`;
            break;
        case `cyan`:
            logColor = `\x1b[36m`;
            break;
        case `white`:
            logColor = `\x1b[37m`;
            break;
    }

    let logContent = ``;
    for (const arg of content) {
        if (typeof arg === `object`) logContent += JSON.stringify(arg);
        else logContent += arg.toString();
    }

    // Log logContent with the color specified to console.
    logFile.write(`${`${formattedTime} ${logContent}`.replace(/\r?\n|\r/g, ``)}\n`);
    console.log(logColor || `\x1b[37m`, formattedTime, logContent);
};
