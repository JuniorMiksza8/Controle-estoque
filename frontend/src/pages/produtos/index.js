import React,{useState,useEffect} from 'react';
import api from '../../api';
import {Link} from 'react-router-dom';
import {FiArrowRight} from 'react-icons/fi';
import './styles.css';
export default function Produtos(){

  const [produtos,setProdutos] = useState([]);
  const [page,setPage] = useState(1);
  
  async function loadData(){

    const response = await api.get(`/produto?page=${page}`);
    console.log(response);
    setProdutos([...produtos,...response.data]);
  }



  useEffect(()=>{
    loadData();
  },[page]);
 
  return(
    <>

    <header>
      <ul>
        <li><Link to={{pathname : "/new"}} className="link">Novo produto</Link></li>
        <li><Link to={{pathname : "/movimentacao"}} className="link">Saidas</Link></li>
        <li><Link to={{pathname : "/entradas"}} className="link">Entradas</Link></li>
      </ul>
    </header>

    <section>
      
    
      
        {
          produtos.map(produto => (
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

      <div className="line-break"></div>
      <button type="submit" className="button vermais" onClick={()=>setPage(page + 1)}>Ver mais</button>
    </section>    

    

    </>
  )
}