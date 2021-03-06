import React,{useState,useEffect} from 'react';
import api from '../../api';
import {Link,useHistory} from 'react-router-dom';
import {FiArrowRight,FiPower,FiUserPlus} from 'react-icons/fi';
import './styles.css';
export default function Produtos(){

  const [produtos,setProdutos] = useState([]);
  const [search,setSearch] = useState('');

  const history = useHistory();

  async function loadData(){
    const response = await api.get(`/produto`);
    setProdutos(response.data);
  }

  const filtrados = produtos.filter(produto => produto.id.toLowerCase().includes(search.toLowerCase())).sort((a,b)=>{
    return new Date(b.criacao).toTimeString() - new Date(a.criacao).toTimeString()
  });

  useEffect(()=>{
    loadData();
  },[]);
 
  return(
    <>

      

    <header>
      <ul>
        <li><Link to={{pathname : "/new"}} className="link">Novo produto</Link></li>
        <li><Link to={{pathname : "/movimentacao"}} className="link">Saidas</Link></li>
        <li><Link to={{pathname : "/entradas"}} className="link center">Entradas</Link></li>
      </ul>
      <ul className="align-center">
        <li><p className="link page-title">Produtos</p></li>
      </ul>
      <ul>
        <div className="column">
          <div className="user-buttons">
            <button className="user-button adduser" onClick={()=> { history.push('/newuser')}}>
              <FiUserPlus/>
            </button>
            <button className="user-button logout" onClick={()=>{ localStorage.removeItem('userID'); history.push('/')}}>
              <FiPower />
            </button>
          </div>
          <p className="title">Total de registros : <strong>{filtrados.length}</strong> </p>
        </div>
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