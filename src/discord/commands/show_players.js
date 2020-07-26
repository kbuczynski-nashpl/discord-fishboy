const Discord              = require('discord.js');
const DiscordServerHandler = require('../DiscordServerHandler');
const DiscordUserHandler   = require('../DiscordUserHandler');

module.exports.run = async (bot, message) => {
    const DiscordServer = new DiscordServerHandler();
    await DiscordServer.build(message.guild);

    const DiscordUser = new DiscordUserHandler();
    await DiscordUser.build(message.author, message.guild.id);

    const users = await DiscordUser.getServerUsers();

    const messageEmbed = new Discord.MessageEmbed();

    const msg = await messageEmbed.setTitle('Players around the lake.')
                                  .setColor(0xffffff)
                                  .addField('Users', users);

    await message.channel.send(msg);
};

module.exports.help = {
    name:        'showplayers',
    description: 'Show players who play the game',
};