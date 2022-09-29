const fs = require('node:fs');
const path = require('node:path');

const { REST, Routes } = require('discord.js');
const { token, botId, serverId } = require('../config.json');

// Read the commands directory and add all the commands to the array
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

async function addCommands() {
  try {
    await rest.put(Routes.applicationGuildCommands(botId, serverId), { body: commands });
    console.log('Successfully registered application commands.');
  } catch (e) {
    console.error(e);
  }
}

(async () => {
  await addCommands();
})();