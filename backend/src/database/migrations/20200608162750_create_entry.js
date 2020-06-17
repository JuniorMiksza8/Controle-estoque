
exports.up = function(knex) {
  return knex.schema.createTable('entradas',(table)=>{
    table.increments('id').primary();
    table.string('id_produto');
    table.foreign('id_produto').references('id').inTable('produtos');
    table.string('id_usuario');
    table.foreign('id_usuario').references('id').inTable('usuarios');
    table.string('descricao');
    table.float('quantidade');
    table.date('data');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('entradas');
};
