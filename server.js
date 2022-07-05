const fs = require('fs');
const { Discord, Client, Collection, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./config.json');

const client = new Client({intents: [Intents.FLAGS.GUILDS]})
client.login(token);


client.commands = new Collection();
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}


const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Refrescando comandos (/)');
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Refrescados correctamente (/)');
	} catch (error) {
		console.error(error);
	}
})();
