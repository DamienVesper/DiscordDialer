const pjson = require(`../../../package.json`);
module.exports = () => {
    console.log(`\x1b[34m`, `
    ______ _                       _  ______ _       _           
    |  _  (_)                     | | |  _  (_)     | |          
    | | | |_ ___  ___ ___  _ __ __| | | | | |_  __ _| | ___ _ __ 
    | | | | / __|/ __/ _ \\| '__/ _\` | | | | | |/ _\` | |/ _ \\ '__|
    | |/ /| \\__ \\ (_| (_) | | | (_| | | |/ /| | (_| | |  __/ |   
    |___/ |_|___/\\___\\___/|_|  \\__,_| |___/ |_|\\__,_|_|\\___|_|       

                 Created by ${pjson.author} | v${pjson.version}
      `);
    console.log(`\\x1b[34m`, `--------------------------------------------------`);
};