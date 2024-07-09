/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_account', table => {
    table.increments('Id').primary();
    table.string('FirstName');
    table.string('LastName');
    table.string('UserName');
    table.string('Password');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_account');
};
