// Require modules.
const log = require(`../../utils/log.js`);

// Event execution.
module.exports = async client => {
    log(`red`, `${client.user.tag} disconnected.`);
};
