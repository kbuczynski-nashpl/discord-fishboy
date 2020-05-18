const Discord = require('discord.js');
const client = new Discord.Client();
const messageEmbed = new Discord.MessageEmbed();

module.exports.run = async (bot, message) => {
	const botImage = bot.user.displayAvatarURL();
	let size = client.guilds.size;

	if (size === undefined) size = 1;

	const msg = messageEmbed.setTitle('Fish Boy Bot!')
		.setColor(0xff0000)
		.setDescription('Bot Information')
		.setThumbnail(botImage)
		.addField('Bot Name', bot.user.username)
		.addField('Created At', bot.user.createdAt)
		.addField('Fishing Lakes', size);

	await message.channel.send(msg);
};

module.exports.help = {
	name: 'botinfo',
	description: 'Shows bot info',
};