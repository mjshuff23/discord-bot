const { REST, Routes } = require('discord.js');
const { token, botId, serverId } = require('../config.json');

const rest = new REST({ version: '10' }).setToken(token);

const deleteScope = process.argv[2];
const commandToDelete = process.argv[3];

async function deleteCommands() {
  if (deleteScope === 'global') {
    try {
      if (commandToDelete === 'all') {
        await rest.put(Routes.applicationCommands(botId), { body: [] });
        console.log('Successfully deleted all global commands.');
      } else {
        await rest.delete(Routes.applicationCommands(botId, commandToDelete));
        console.log(`Successfully deleted global command ${commandToDelete}.`);
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log(`Attempting to delete ${commandToDelete} from ${serverId}`);
    try {
      if (commandToDelete === 'all') {
        await rest.put(Routes.applicationGuildCommands(botId, serverId), { body: [] });
        console.log('Successfully deleted all guild commands.');
      } else {
        await rest.delete(Routes.applicationGuildCommand(botId, serverId, commandToDelete));
        console.log(`Successfully deleted guild command ${commandToDelete}.`);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

(async () => {
  await deleteCommands();
})();