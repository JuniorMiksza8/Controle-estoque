const connection = require('../database/connection');

module.exports = {

  async create(req,res){
    const {id} = req.params;
    const id_usuario = req.headers.id_usuario;

    const {descricao,quantidade} = req.body;


    const data = new Date().toLocaleDateString();


    await connection('entradas').insert({
      id_produto : id,
      id_usuario : id_usuario,
      descricao : descricao,
      quantidade : quantidade,
      data : data
    }).catch(err => console.log(err));

    await connection('produtos').update({
      quantidade : connection.raw(`?? + ${quantidade}`,['quantidade'])
    }).where('id',id);

    return res.send();
  },
  async checkin(id,usuario,descricao,quantidade){

    const data = new Date().toLocaleDateString();


    const entrada = await connection('entradas').insert({
      id_produto : id,
      id_usuario : usuario,
      descricao : descricao,
      quantidade : quantidade,
      data : data
    }).catch(err => console.log(err));

    return entrada;
  },

  async index(req,res){
    const {page = 1} = req.query

    const [count] = await connection('entradas')
    .count()
    .catch((err)=>{
      res.status(500)
      console.log(err)
    });

    res.header('X-Total-Count',count['count(*)']);

    const entradas = await connection('entradas')
    .join('usuarios','usuarios.id','=','entradas.id_usuario')
    .join('produtos','produtos.id','=','entradas.id_produto')
    .limit(10)
    .offset((page - 1) * 5)
    .select([
      'entradas.id',
      'usuarios.email',
      'produtos.nome',
      'entradas.descricao',
      'entradas.quantidade',
      'entradas.data'
    ])
    .catch((err)=>{
      console.log(err);
      res.json
      res.json({err}).status(500);
    })

    console.log(entradas);
    return res.json(entradas).status(200);   
  }

}