const fs = require(`fs`);
const config = require(`../config/config.js`);

module.exports = (string => {
    if(config.logging) {
        let logPath = `./logs/${new Date().toISOString()}.log`;
        string.replace(/\*/g, ``);

        if(!fs.existsSync(logPath)) fs.writeFileSync(logPath, `Created log for ${new Date()}.`);

        fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${string}`);
    }
    console.log(`${new Date()} ${string}`);
});
