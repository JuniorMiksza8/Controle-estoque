const connection = require('../database/connection');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

module.exports = {

  async create(req,res){

    var {email,senha} = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    senha = bcrypt.hashSync(senha,10);
    
    res.json({id});
    
    await connection('usuarios').insert({
      id,
      email,
      senha
    }).catch((err)=> res.status(500).json({err}));

    return res.send();
  }
}
