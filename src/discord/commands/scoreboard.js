const Discord = require('discord.js');
const FishScoreboard = require('./../../FishGame/FishScoreboard');

module.exports.run = async (bot, message) => {
	const messageEmbed = new Discord.MessageEmbed();
	const fishScoreboard = new FishScoreboard();

	const scoreboard = await fishScoreboard.getScoreboard();

	const msg = await messageEmbed.setTitle('Scoreboard')
		.setColor(0xffff00)
		.setTitle(`${message.guild.name} Scoreboard`)
		.setDescription('Top 5 Players')
		.addField('Scoreboard', scoreboard);

	await message.channel.send(msg);
};

module.exports.help = {
	name: 'scoreboard',
	description: 'Shows current server scoreboard',
};