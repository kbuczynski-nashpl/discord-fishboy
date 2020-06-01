const Discord = require('discord.js');
const FishScoreboard = require('./../../FishGame/FishScoreboard');

/**
 * Run discord command. Return scoreboard for a server. (Only top 5 players);
 *
 * @param bot
 * @param message
 * @returns {Promise<void>}
 */
module.exports.run = async (bot, message) => {
	const messageEmbed = new Discord.MessageEmbed();
	const fishScoreboard = new FishScoreboard();

	const scoreboard = await fishScoreboard.getScoreboard(message.guild.id);

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