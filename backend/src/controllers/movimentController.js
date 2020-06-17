const connection = require('../database/connection');
const userController = require('./userController');
module.exports = {

  async create(req,res){

    const {produto} = req.params;

    const usuario = req.headers.id_usuario;

    var {quantidade,data_saida,descricao} = req.body;

    if(!data_saida){
      data_saida = new Date().toLocaleDateString();
    }

    await connection('movimentacao')
      .insert({
        id_produto : produto,
        id_usuario : usuario,
        quantidade : quantidade,
        data_saida : data_saida,
        descricao : descricao
      })
      .then(res.status(201))
      .catch((err) => {
        res.json({err}).status(500);
        console.log(err);
      })

      await connection('produtos').update({
        quantidade : connection.raw(`?? - ${quantidade}`,['quantidade'])
      }).where('id',produto);
    
    return res.send();
  },

  async index(req,res){

    const {page = 1} = req.query;

    const [count] = await connection('movimentacao').count();
    res.header('X-Total-Count',count['count(*)'])

    const movimentacoes =  await connection('movimentacao')
    .join('usuarios','usuarios.id','=','movimentacao.id_usuario')
    .join('produtos','produtos.id','=','movimentacao.id_produto')
    .limit(10)
    .offset((page - 1) * 5)
    .select([
      'movimentacao.id',
      'usuarios.email',
      'produtos.nome',
      'movimentacao.descricao',
      'movimentacao.quantidade',
      'movimentacao.data_saida',
      'movimentacao.data_retorno'
    ]).catch((err) => res.json({err}).status(500))

    console.log(page);
    console.log(movimentacoes);

    return res.status(200).json(movimentacoes);
  },

  

  async return(req,res){
    const data = new Date().toLocaleDateString();

    const {id} = req.params;

    await connection('movimentacao').update({
      data_retorno : data
    }).where('id',id);

    res.status(200).send();
  }

}