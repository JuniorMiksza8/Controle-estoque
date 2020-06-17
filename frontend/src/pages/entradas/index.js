import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from '../../api';

import './styles.css';

export default function Entradas(){

  const [page,setPage] = useState(1);
  const [entradas,setEntradas] = useState([]);

  async function loadData(){
    api.get(`entrada?page=${page}`).then((res)=>{
      console.log(res.data);
      setEntradas([...entradas,...res.data]);
    })
  }

  useEffect(()=>{
    loadData();
  },[page]);

  return (
    <>
      <header>
      <ul>
        <li><Link to={{pathname : "/produtos"}} className="link">Voltar</Link></li>
      </ul>
    </header>

    <section>
      
    {entradas.map((obj)=>(
              <div className="movimentacao" key={obj.id}>
              <p className="title">ID - {obj.id}</p>

              <p className="property">Produto:</p>
              <p className="value">{obj.nome}</p>

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

      <div className="line-break"></div>
      <button type="submit" className="button vermais" onClick={()=>setPage(page + 1)}>Ver mais</button>
    </section>    
    </>
  )
}