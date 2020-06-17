
exports.up = function(knex) {
  return knex.schema.createTable('usuarios',(table)=>{
    table.string('id').primary();
    table.string('email');
    table.string('senha');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuarios');
};
