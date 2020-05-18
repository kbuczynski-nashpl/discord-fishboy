'use strict';

require('dotenv').config();

const TOKEN = process.env.DISCORD_TOKEN;
const Discord = require('discord.js');
const fs = require('fs');

const Logger = require('./src/Logger');

const DiscordServerHandler = require('./src/discord/DiscordServerHandler');

const bot = new Discord.Client();
const logger = new Logger();
const guilds = new DiscordServerHandler();

bot.commands = new Discord.Collection();

fs.readdir('./src/discord/commands', (err, files) => {
	if (err) logger.log('error', err.toString());

	const jsfile = files.filter(f => f.split('.').pop() === 'js');

	if (jsfile <= 0) logger.log('error', 'commands not found');

	jsfile.forEach((file) => {
		const command = require(`./src/discord/commands/${file}`);

		bot.commands.set(command.help.name, command);
	});
});

bot.login(TOKEN);

bot.on('ready', async () => {
	await bot.user.setActivity('Watching the lakes...', { type: 'WATCHING' });
});

bot.on('message', message => {
	const prefix = process.env.prefix;

	if (message.author.bot) return;
	if (message.channel.type === 'dm') return;
	if (!message.content.startsWith(prefix)) return;

	const messageAry = message.content.split(' ');
	const cmd = messageAry[0];
	const args = messageAry.slice(1);

	const command = bot.commands.get(cmd.slice(prefix.length));

	guilds.build(message.guild);
	guilds.register();

	if (command) command.run(bot, message, args);
	if (message.content.indexOf(prefix) !== 0) return;
});