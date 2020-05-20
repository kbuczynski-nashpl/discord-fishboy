const Discord = require('discord.js');
const Fish = require('./../../FishGame/Fish');

module.exports.run = async (bot, message) => {
	const messageEmbed = new Discord.MessageEmbed();

	const fish = new Fish();
	await fish.generateFish();
	const data = await fish.returnFish();

	const msg = await messageEmbed.setTitle('Today Special!')
		.setColor(0xffff00)
		.setDescription(`Fish we found is ${data.name}`)
		.addField('Max Length', data.maxLength)
		.addField('Min Length', data.minLength)
		.addField('Rarity', data.rarity);

	await message.channel.send(msg);
};

module.exports.help = {
	name: 'getRandomFishInfo',
	description: 'Shows random fish',
};