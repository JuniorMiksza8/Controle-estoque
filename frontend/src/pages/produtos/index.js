import React,{useState,useEffect} from 'react';
import api from '../../api';
import {Link} from 'react-router-dom';
import {FiArrowRight} from 'react-icons/fi';
import './styles.css';
export default function Produtos(){

  const [produtos,setProdutos] = useState([]);
  const [search,setSearch] = useState('');

  async function loadData(){
    const response = await api.get(`/produto`);
    setProdutos(response.data);
  }

  const filtrados = produtos.filter(produto => produto.id.toLowerCase().includes(search.toLowerCase()));
 

  useEffect(()=>{
    loadData();
  },[]);
 
  return(
    <>

      

    <header>
      <ul>
        <li><Link to={{pathname : "/new"}} className="link">Novo produto</Link></li>
        <li><Link to={{pathname : "/movimentacao"}} className="link">Saidas</Link></li>
        <li><Link to={{pathname : "/entradas"}} className="link">Entradas</Link></li>
      </ul>
      <ul>
        <p className="title">Total de registros : <strong>{produtos.length}</strong> </p>
      </ul>
    </header>

    <input 
    type="text" 
    className="search"  
    placeholder="Procure o produto pelo ID" 
    value={search}
    onChange={(e)=>{setSearch(e.target.value)}}
    />

    <section>
      
    
      
        {
          filtrados.map(produto => (
          <div className="produto-container" key={produto.id}>
            <p className="name">
              {produto.nome} - {produto.id}
            </p>
            <div className="text-container">
              <p className="description">
              {produto.descricao} 
              </p>
            </div>

            <div className="quantidade">
                Restantes
                <br/>
                {produto.quantidade}
            </div>
            
            <div className="buttons">
              <Link className="button" to={{pathname : `/newmovimentacao/${produto.id}`}}>
                <p>Alocar</p>
              </Link>
              <Link className="button" to={{pathname : `/addproduto/${produto.id}`}}>
                <p>Adicionar</p>
              </Link>
            </div>

          </div>
          ))
        }
    </section>    

    

    </>
  )
}