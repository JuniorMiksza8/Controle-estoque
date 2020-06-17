exports.up = function(knex) {
  return knex.schema.createTable('produtos',(table)=>{

    table.string('id').primary().notNullable();
    table.string('nome').notNullable();
    table.string('descricao').notNullable();
    table.float('quantidade');
    table.boolean('situacao');
    table.date('criacao');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('produtos');
};
