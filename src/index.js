const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');

require('dotenv').config();

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

////////////////////////////// COMMANDS /////////////////////////////////////
// Create a new Collection (extended Map) for commands
client.commands = new Collection();

// Read the commands directory and add all the commands to the Collection
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

// Loop over the command files and add them to the Collection
console.log('Setting up commands...');
const commands = [];
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

(async () => {
  try {
      await rest.put(
        Routes.applicationCommands(process.env.BOT_ID),
        { body: commands },
      );

      console.log('Successfully reloaded global application (/) commands.');
  } catch (e) {
    console.error(e);
  }
})();

////////////////////////////// EVENTS /////////////////////////////////////
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Login to Discord with your client's token
client.login(process.env.TOKEN);
