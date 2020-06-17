import React,{useState} from 'react';
import {useHistory,Link} from 'react-router-dom';
import api from '../../api';

import './styles.css';

export default function NovoProduto(){

  const history = useHistory();

  const [nome,setNome] = useState('');
  const [descricao,setDescricao] = useState('');
  const [quantidade,setQuantidade] = useState(0);
  const [situacao,setSituacao] = useState(1);

  function store(e){
    e.preventDefault();

    const user = localStorage.getItem('userID');
    const data = {
      nome,
      descricao,
      quantidade,
      situacao
    }

    api.post('produto',{
      nome,
      descricao,
      quantidade,
      situacao
    },{headers : {id_usuario : user}}).then(res=>{
      console.log(res);
      alert(`Produto criado com sucesso, ID : ${res.data.id}`);
      history.push('/produtos'); 
    }).catch(err=>{
      alert('Erro ao adicionar produto');
      console.log(err);
    });

      

  }

  return(
    <>
    <header>
      <ul>
        <li><Link to={{pathname : "/produtos"}} className="link">Voltar</Link></li>
      </ul>
    </header>
    
      <div className="container">
        <form onSubmit={store}>

          <p className="title">Novo produto</p>

          <div className="input-group">
            <label htmlFor="nome">Nome</label>
            <input 
            type="text" 
            name="nome" 
            value={nome}
            onChange={(e)=> setNome(e.target.value)}
            required
            />
          </div>

          <div className="input-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea 
            name="descricao"
            value={descricao}
            onChange={(e)=> setDescricao(e.target.value)}
            required
            >

            </textarea>
          </div>

          <div className="input-group">
            <label htmlFor="quantidade">Quantidade</label>
            <input 
            type="number" 
            name="quantidade" 
            value={quantidade}
            onChange={(e)=> setQuantidade(e.target.value)}
            required
            />
          </div>

          <button className="button">Cadastrar</button>

        </form>
      </div>
    </>
  )
}