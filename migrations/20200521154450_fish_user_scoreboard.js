/**
 * Migration for fish_user_scoreboard table
 * It stores details with scoreboard of a users.
 *
 * Table Schema:
 *  - id	  => [int] (Prime Key)
 *  - user_id => [string]
 *  - points  => [int]
 */

exports.up = (knex) => {
	return knex.schema
		.createTable('fish_user_scoreboard', (table) => {
			table.increments('id');
			table.string('user_id').notNullable();
			table.bigInteger('points').notNullable();
		});
};

exports.down = (knex) => {
	return knex.schema
		.dropTable('fish_user_scoreboard');
};
