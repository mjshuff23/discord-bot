const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { token, botId, serverId } = require('../../config.json');

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with server info!'),
  new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user info!'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);
console.log('token', token);

rest.put(Routes.applicationGuildCommands(botId, serverId), { body: commands })
  .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
  .catch(console.error);