const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');

require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// Create a new Collection (extended Map) for commands
client.commands = new Collection();

// Read the commands directory and add all the commands to the Collection
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

// Loop over the command files and add them to the Collection
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => console.log('Ready!'));

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

 try {
  await command.execute(interaction);
 } catch (e) {
  console.error(e);
  await interaction.reply({ content: `There was an error when executing ${interaction.commandName}`, ephemeral: true });
 }
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);