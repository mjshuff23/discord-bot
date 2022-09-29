const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user info!')
    .addSubcommand(subcommand => subcommand
      .setName('tag')
      .setDescription('Replies with user tag!'))
    .addSubcommand(subcommand => subcommand
      .setName('id')
      .setDescription('Replies with user ID!'))
    .addSubcommand(subcommand => subcommand
      .setName('all')
      .setDescription('Replies with all user info!')),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'tag') {
      await interaction.reply(`Your tag: ${interaction.user.tag}`);
    } else if (interaction.options.getSubcommand() === 'id') {
      await interaction.reply(`Your ID: ${interaction.user.id}`);
    } else {
      await interaction.reply(`Your tag: ${interaction.user.tag}\nYour ID: ${interaction.user.id}`);
    }
  },
};
