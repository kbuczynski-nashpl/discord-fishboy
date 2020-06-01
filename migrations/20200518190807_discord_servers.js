/**
 * Migration for discord_server table
 * It stores details about discord server that user connects from.
 *
 * Table Schema:
 *  - id               => [int] (Prime Key)
 *  - server_id        => [big int]
 *  - server_name      => [string]
 *  - server_member_no => [int]
 */

exports.up = (knex) => {
	return knex.schema
		.createTable('discord_servers', (table) => {
			table.increments('id');
			table.bigInteger('server_id').notNullable();
			table.string('server_name').notNullable();
			table.integer('server_members_no').notNullable();
		});
};

exports.down = (knex) => {
	return knex.schema
		.dropTable('discord_servers');
};

exports.config = { transaction: false };