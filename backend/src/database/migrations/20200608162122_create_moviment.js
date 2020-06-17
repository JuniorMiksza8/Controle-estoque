
exports.up = function(knex) {
  return knex.schema.createTable('movimentacao',(table)=>{
    table.increments('id').primary();
    table.string('id_produto');
    table.foreign('id_produto').references('id').inTable('produtos');
    table.string('id_usuario').references('id').inTable('usuarios');
    table.float('quantidade');
    table.date('data_saida');
    table.date('data_retorno');
    table.string('descricao');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('movimentacao');
};
