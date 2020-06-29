import React,{useState,useEffect} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import Moment from 'moment';

import api from '../../api';

import {Link,useHistory} from 'react-router-dom';

import './styles.css';

export default function Movimentacao(){

  const [movimentacao,setMovimentacao] = useState([]);
  const [search,setSearch] = useState('');
  Moment.locale('pt-BR');

 async function handleRetorno(id){ 
   await api.post(`movimento/retorno/${id}`).then(res=>{
      loadData();
      alert('Produto retornado com sucesso');
    }).catch((err) => {
      alert('Falha ao retornar produto');
      console.log(err);
    });
}


  async function loadData(){
    const response = await api.get(`movimento`);
    setMovimentacao(response.data);
  }

  const filtrados = movimentacao.filter(mov => mov.id_produto.toLowerCase().includes(search.toLowerCase()));

  useEffect(()=>{
    loadData();
  },[]);

 

  return (
    <>  

          <header>
            <ul>
              <li>
                <Link to={{pathname : "/produtos"}} className="link back-button">
                  <FiArrowLeft className="icon"/>
                  <p>Voltar</p>
                </Link>
              </li>
            </ul>
            <ul>
              <li><p className="link page-title">Saidas</p></li>
            </ul>
            <ul>
              <p className="title">Total de registros : <strong>{filtrados.length}</strong> </p>
            </ul>
          </header>

          <input 
            type="text" 
            className="search"  
            placeholder="Procure a saida pelo ID do produto" 
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

              <p className="property">Quantidade:</p>
              <p className="value">{obj.quantidade}</p>     

              <div className="datas">
                <p className="property">Data de saida:</p>
                <p className="value">{Moment(obj.data_saida).format('DD/MM/YYYY')}</p>

                <p className="property">Data de retorno:</p>
                <p className="value">{obj.data_retorno ? Moment(obj.data_retorno).format('DD/MM/YYYY') :   '--'}</p>
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
          </section>

    </>
  )
}