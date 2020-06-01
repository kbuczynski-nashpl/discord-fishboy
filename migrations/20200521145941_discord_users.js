/**
 * Migration for discord_users table
 * It stores details about discord users which used the bot.
 *
 * Table Schema:
 *  - id              => [int] (Prime Key)
 *  - username        => [string]
 *  - discord_user_id => [big int]
 *  - server_id 	  => [big int]
 *  - avatar 		  => [string]
 */

exports.up = (knex) => {
	return knex.schema
		.createTable('discord_users', (table) => {
			table.increments('id');
			table.string('username').notNullable();
			table.bigInteger('discord_user_id').notNullable();
			table.bigInteger('server_id').notNullable();
			table.string('avatar').notNullable();
		});
};

exports.down = (knex) => {
	return knex.schema
		.dropTable('discord_users');
};
