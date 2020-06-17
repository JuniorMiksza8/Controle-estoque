const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

module.exports = {

  async login(req,res){
    
    var {email,senha} = req.body;   

    console.log(email,senha);

    const user = await connection('usuarios').where({
      email : email
    }).select('*').first().catch((err)=>{
      res.status(500);
    });

    if(user){
      if(bcrypt.compareSync(senha,user.senha)){
        res.json({id : user.id}).status(200);
      }else{
        res.status(404);
      }
    }else{
      res.status(404);
    }

    res.send();

  }
}