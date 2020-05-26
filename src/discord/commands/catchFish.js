const Discord = require('discord.js');
const Fish = require('./../../FishGame/Fish');
const DiscordUserHandler = require('../DiscordUserHandler');
const DiscordServerHandler = require('../DiscordServerHandler');

module.exports.run = async (bot, message) => {
	const DiscordServer = new DiscordServerHandler();
	await DiscordServer.build(message.guild);
	const DiscordServerId = await DiscordServer.getServerId();

	const DiscordUser = new DiscordUserHandler();
	await DiscordUser.build(message.author, DiscordServerId);

	const messageEmbed = new Discord.MessageEmbed();

	const fish = new Fish();
	await fish.generateFish();
	const caughtFish = await fish.catch();

	console.log(caughtFish);
	return;

	const msg = await messageEmbed.setTitle('Today Special!')
		.setColor(0xffff00)
		.setDescription(`Fish we found is ${data.name}`)
		.addField('Max Length', data.maxLength)
		.addField('Min Length', data.minLength)
		.addField('Rarity', data.rarity);

	await message.channel.send(msg);
};

module.exports.help = {
	name: 'catchFish',
	description: 'Try catch a fish',
};