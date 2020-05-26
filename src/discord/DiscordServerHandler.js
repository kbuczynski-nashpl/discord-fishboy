const db = require('./../../db');

const TABLE_NAME = 'discord_servers';

class DiscordServerHandler {
	async build(guild) {
		let server = await db.select('*')
			.from(TABLE_NAME)
			.where('server_id', guild.id)
			.limit(1);

		if (Array.isArray(server) && server.lenght < 1) {
			server = await db.insert(
				{
					server_id: guild.id,
					server_name: guild.name,
					server_members_no: guild.memberCount,
				},
			).table(TABLE_NAME);
		}

		server = server[0];

		this.serverId = server.server_id;
		this.serverName = server.server_name;
		this.serverMemberNo = server.server_members_no;
	}

	async getServer() {
		const serverObject = {};
		serverObject.serverId = this.serverId;
		serverObject.serverName = this.serverName;
		serverObject.serverMemberNo = this.serverMemberNo;

		return serverObject;
	}

	async getServerId() {
		return this.serverId;
	}
}

module.exports = DiscordServerHandler;