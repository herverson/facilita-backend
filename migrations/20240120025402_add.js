exports.up = function (knex) {
  return knex.schema.table('clients', function (table) {
    table.float('x_coordinate').notNullable().defaultTo(0);
    table.float('y_coordinate').notNullable().defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.table('clients', function (table) {
    table.dropColumn('x_coordinate');
    table.dropColumn('y_coordinate');
  });
};
