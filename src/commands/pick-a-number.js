const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pick-a-number')
    .setDescription('Pick a number between 1 and 5')
    .addNumberOption(option => option.setName('number').setDescription('The number guessed').setRequired(true).addChoices(
      { name: '1', value: 1 },
      { name: '2', value: 2 },
      { name: '3', value: 3 },
      { name: '4', value: 4 },
      { name: '5', value: 5 },
    )),
  async execute(interaction) {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    const guessedNumber = interaction.options.getNumber('number');
    if (guessedNumber === randomNumber) {
      await interaction.reply(`You guessed the correct number! The number was ${randomNumber}`);
    } else if (guessedNumber > randomNumber) {
      await interaction.reply(`You guessed too high! The number was ${randomNumber}`);
    } else {
      await interaction.reply(`You guessed too low! The number was ${randomNumber}`);
    }
  },
};
