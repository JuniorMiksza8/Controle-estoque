import React,{useState,useEffect} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../api';

import {Link} from 'react-router-dom';

import './styles.css';

export default function Movimentacao(){

  const [movimentacao,setMovimentacao] = useState([]);
  const [page,setPage] = useState(1);

  function handleRetorno(id){
    api.post(`movimento/retorno/${id}`).then(res=>{
      console.log(res);
      alert('Produto retornado com sucesso');
      loadData();
    }).catch(err => console.log(err));
  }

  function loadData(){

    api.get(`movimento?page=${page}`).then(res =>{
      console.log(res);
      setMovimentacao([...movimentacao,...res.data]);
    }).catch(err => console.log(err));
   
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
            {movimentacao.map((obj)=>(
              <div className="movimentacao" key={obj.id}>
              <p className="title">ID - {obj.id}</p>

              <p className="property">Produto:</p>
              <p className="value">{obj.nome}</p>

              <p className="property">Responsavel:</p>
              <p className="value">{obj.email}</p>

              <p className="property">Quantidade:</p>
              <p className="value">{obj.quantidade}</p>     

              <div className="datas">
                <p className="property">Data de saida:</p>
                <p className="value">{obj.data_saida}</p>

                <p className="property">Data de retorno:</p>
                <p className="value">{obj.data_retorno ? obj.data_retorno :   'Alocado'}</p>
              </div>

              <p className="property">Descrição:</p>
              <p className="descricao">{obj.descricao}</p>

              {
                obj.data_retorno ? '' : <button className="button" onClick={()=>{handleRetorno(obj.id)}}>
                <p>Retornar</p>
                <FiArrowLeft/>
                </button>
              }

            </div>
            ))}
            <div className="line-break"></div>
            <button type="submit" className="button vermais" onClick={()=>setPage(page + 1)}>Ver mais</button>
          </section>

    </>
  )
}