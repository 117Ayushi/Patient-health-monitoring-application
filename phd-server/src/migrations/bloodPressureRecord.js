
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bp_record', function(table) {
    table.increments('id');
    table.string('name').notNullable();
    table.integer('user_id').notNullable();
    table.integer('lower_bp').notNullable();
    table.integer('higher_bp').notNullable();
    table.string('patient_condition').notNullable();
    table.timestamp('date').defaultTo(knex.fn.now());
    table.string('img_url').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bp_record');
};
