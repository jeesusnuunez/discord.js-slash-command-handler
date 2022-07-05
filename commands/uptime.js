const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('Responde con el tiempo activo del bot!'),

	async execute(interaction) {

		let totalSeconds = (interaction.client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);

    const embeduptime = new MessageEmbed()
			.setTitle("⏰ Comando Uptime!" )
			.addField("Días", `${days}` ,true)
			.addField("Horas", `${hours}` ,true)
			.addField("\u200B","\u200B", true)
			.addField("Minutos", `${minutes}` ,true)
			.addField("Segundos", `${seconds}` ,true)
			.addField("\u200B","\u200B", true)


	return interaction.reply({embeds: [embeduptime]});
	},
};
