const { REST, Routes } = require('discord.js');
const { token, botId, serverId } = require('../../config.json');

const rest = new REST({ version: '10' }).setToken(token);

const deleteScope = process.argv[2];
const commandToDelete = process.argv[3];

if (deleteScope === 'global') {
  rest.delete(Routes.applicationCommand(botId, commandToDelete))
    .then(() => console.log(`Successfully deleted global command ${commandToDelete}.`))
    .catch(console.error);
} else {
  console.log(`Attempting to delete ${commandToDelete} from ${serverId}`);
  rest.delete(Routes.applicationGuildCommand(botId, serverId, commandToDelete))
    .then(() => console.log(`Successfully deleted guild command ${commandToDelete}.`))
    .catch(console.error);
}