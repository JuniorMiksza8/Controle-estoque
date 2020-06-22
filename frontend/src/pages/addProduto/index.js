import React,{useState,useEffect} from 'react';
import {Link,useParams,useHistory} from 'react-router-dom';
import api from '../../api';

import './styles.css';

export default function AddProduto(){

  const history = useHistory();

  const [descricao,setDescricao] = useState();
  const [quantidade,setQuantidade] = useState();
  const [produto,setProduto] = useState('');;

  const {id} = useParams();
  const usuario = localStorage.getItem('userID');



  async function loadProduto(){
    const response = await api.get(`produto/${id}`);
    setProduto(response.data);
  }

  async function handle(e){
    e.preventDefault();

    api.post(`entrada/${id}`,{
      descricao,
      quantidade
    },{headers : {id_usuario : usuario}}).then((res)=>{
      history.push('/produtos');
      alert(`${quantidade} unidades adicionadas ao produto ${id} com sucesso`);
    });

  }

  useEffect(()=>{
    loadProduto();
  },[id])

  return (
    <>
      <header>
        <ul>
          <li><Link to={{pathname : "/produtos"}} className="link">Voltar</Link></li>
        </ul>
      </header>

      <div className="container">
        <form onSubmit={handle}>

          <p className="title">Adicionar produto</p>

          <div className="input-group">
            <label htmlFor="produto">ID produto</label>
            <input type="text" value={id} disabled required/>
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

          <p className="quantidade">Quantidade atual : {produto.quantidade}</p>

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