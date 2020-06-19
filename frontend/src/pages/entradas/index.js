import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from '../../api';

import './styles.css';

export default function Entradas(){

  const [entradas,setEntradas] = useState([]);
  const [search,setSearch] = useState('');

   async function loadData(){
    const response = await api.get(`entrada`);
    console.log(response.data);
    setEntradas(response.data);
  }

  const filtrados = entradas.filter(entrada => entrada.id_produto.toLowerCase().includes(search.toLowerCase()));

  useEffect(()=>{
    loadData();
  },[]);

  return (
    <>
      <header>
      <ul>
        <li><Link to={{pathname : "/produtos"}} className="link">Voltar</Link></li>
      </ul>
      <ul>
              <p className="title">Total de registros : <strong>{entradas.length}</strong> </p>
            </ul>
    </header>

    <input 
    type="text" 
    className="search"  
    placeholder="Procure a entrada pelo ID do produto" 
    value={search}
    onChange={(e)=>{setSearch(e.target.value)}}
    />

    <section>
      
    {filtrados.map((obj)=>(
              <div className="movimentacao" key={obj.id}>
              <p className="title">ID - {obj.id}</p>

              <p className="property">Produto:</p>
              <p className="value">{obj.nome} - {'#'+obj.id_produto}</p>

              <p className="property">Responsavel:</p>
              <p className="value">{obj.email}</p>

              <p className="property">Descrição:</p>
              <p className="descricao">{obj.descricao}</p>

              <p className="property">Quantidade:</p>
              <p className="value">{obj.quantidade}</p>     
              
              <p className="property">Feito em :</p>
              <p className="value">{obj.data}</p>

            </div>
            ))} 

    </section>    
    </>
  )
}