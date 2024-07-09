/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_account', table => {
    table.increments('id').primary();
    table.boolean('isNewMember');
    table.boolean('isAppAdmin');
    table.boolean('isTaskAdmin');
    table.boolean('isLeadership');
    table.string('MemberName');
    table.string('MemberEmail');
    table.boolean('isInProcessed');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_account');
};
