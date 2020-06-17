import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../api';
import './styles.css';

export default function Login(){

  const history = useHistory();
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  
  async function authenticate(e){
    e.preventDefault();

    try{

      const response = await api.post('sessao',{
        email : email,
        senha : senha
      });

      localStorage.setItem('userID',response.data.id);
      history.push('/produtos');
    }catch(err){
      switch(err){
        case 404:
          alert('Usuario não encontrado');
          break;
        default:
          alert('Erro ao efetuar login');
          console.log(err);
      }
    }
  }


  return(
    <div className="login-container">
      <section className="form">

        <form onSubmit={authenticate}>

          <p className="title">estoque</p>

          <input type="text"
          placeholder="Seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          />

          <input type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
          />

          <button type="submit" className="button">entrar</button>
        </form>

      </section>
    </div>
  );
}