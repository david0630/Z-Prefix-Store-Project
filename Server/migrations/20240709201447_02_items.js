/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('in_processing_task', table => {
    table.increments('id').primary();
    table.string('TaskName');
    table.string('TaskDetails');
    table.integer('TaskAdmin');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('in_processing_task');
};
