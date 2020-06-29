const connection = require('../database/connection');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const path = require('path');
module.exports = {

  async create(req,res){
    console.log(req.file);
    var {email,senha} = req.body;
    const image = req.file.filename;
    

    const id = crypto.randomBytes(4).toString('HEX');
    
    if(image){
      senha = bcrypt.hashSync(senha,10);
      await connection('usuarios').insert({
        id,
        email,
        senha,
        image
      }).catch((err)=> res.status(500).json({err}));
      res.json({id});
    }else{
      senha = bcrypt.hashSync(senha,10);   
      await connection('usuarios').insert({
        id,
        email,
        senha
      }).catch((err)=> res.status(500).json({err}));
      res.json({id});
    }

    return res;
  },
  async createImage(req,res){

    const image = req.file;
    const id = req.query.id;
   
    await connection('usuarios').update({image : image.filename}).where('id',id).catch((err)=> res.status(500).json({err}));

    return res.json({url :  image.filename});
  }
}
