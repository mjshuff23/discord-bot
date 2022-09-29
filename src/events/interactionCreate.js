module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} is attempting to trigger ${interaction.commandName}`,
    );

    try {
      await command.execute(interaction);
    } catch (e) {
      console.error(e);
      await interaction.reply({
        content: `There was an error when executing ${interaction.commandName}`,
        ephemeral: true,
      });
    }
  }
};