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
	const caughtFish = await fish.catch(await DiscordUser.returnUserId());

	if (caughtFish === false) {
		const msg = await messageEmbed.setTitle('Sorry it got away')
			.setColor(0xffffff)
			.setDescription('The fish got away');

		await message.channel.send(msg);

		return;
	}

	const msg = await messageEmbed.setTitle('Congratulation')
		.setColor(0xffffff)
		.setDescription(`You caught a fish ${caughtFish.fish.name}`)
		.addField('The lenght of it', caughtFish.fish.length)
		.addField('Earned points', caughtFish.points)
		.addField('Your total is:', caughtFish.total);

	await message.channel.send(msg);
};

module.exports.help = {
	name: 'catchFish',
	description: 'Try catch a fish',
};