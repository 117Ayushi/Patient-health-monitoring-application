
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(table) {
    table.increments('id');
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('role').notNullable();
    table.string('password').notNullable();
    table.string('mobile').notNullable();
    table.string('address').notNullable();
    table.integer('age').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
