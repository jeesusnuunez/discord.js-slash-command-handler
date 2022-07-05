const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde con un Pong!'),

	async execute(interaction) {

		return interaction.reply({content: `Pong!! (Latencia:  ${Date.now() - interaction.createdTimestamp}ms)`});
	},
};
