module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction) {
			if (!interaction.isCommand()) return;

	  	const command = interaction.client.commands.get(interaction.commandName);
	    if (!command) return;
	    try {
	        await command.execute(interaction);
	    } catch (error) {
	        if (error) console.error(error);
	        await interaction.reply({ content: 'Sucedio un error mientras ejecutaba ese comando!', ephemeral: true });
	    }	},
};
