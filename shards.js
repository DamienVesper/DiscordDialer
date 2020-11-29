// This isn't necessary if you're hosting a standalone bot.
// But may be when expanding it to the public.

const Discord = require(`discord.js`);
const config = require(`../config/config`);

// Create the sharding manager.
const shardManager = Discord.ShardingManager(`./index.js`, { token: config.token });

// Shard events.
shardManager.on(`shardCreate`, shard => console.log(`Launched shard ${shard.id}.`));

// Spawn the shards.
shardManager.spawn();
