const db = require('./../../db');

const TABLE_NAME = 'discord_servers';
const Logger = require('./../Logger');
const logger = new Logger();

class DiscordServerHandler {
	build(guild) {
		this.serverId = guild.id;
		this.serverName = guild.name;
		this.serverMemberNo = guild.memberCount;
	}

	register() {
		const server = db.select('*').from(TABLE_NAME).where('server_id', this.serverId);
		server.then(data => {
			if (Array.isArray(data) && data.length) {
				return;
			}

			return db.insert(
				{
					server_id: this.serverId,
					server_name: this.serverName,
					server_members_no: this.serverMemberNo,
				},
			).into(TABLE_NAME)
				.then(rows => {
					return rows[0];
				});
		}).catch(err => {
			logger.log('error', err.toString());
		});
	}
}

module.exports = DiscordServerHandler;