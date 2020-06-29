import React,{useState} from 'react';
import {useParams,Link,useHistory} from 'react-router-dom';
import api from '../../api';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';

export default function NovoMovimentacao(){

  const history = useHistory();
  
  const id_usuario = localStorage.getItem('userID');
  const {id} = useParams();
  const [quantidade,setQuantidade] = useState(0);
  const [descricao,setDescricao] = useState('');
  const [data_saida,setData] = useState('');

  async function handle(e){
    e.preventDefault();

    api.post(`movimento/${id}`,{
      quantidade,
      descricao,
      data_saida
    },{headers : {id_usuario : id_usuario}})
    .then(response =>{
      history.goBack();
      alert('Movimentado com sucesso');
    }).catch(err =>{
      alert('Aconteceu um erro ao movimentar,contate um administrador.');
      console.log(err);
    });
  }

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
      </header>
      <section>
        <form onSubmit={handle}>

          <p className="title">Movimentação</p>

          <div className="input-group">
            <label htmlFor="produto">ID produto</label>
            <input 
            type="text" 
            disabled 
            value={id}
            />
          </div>

          <div className="input-group">
            <label htmlFor="quantidade">Quantidade</label>
            <input 
            type="number" 
            name="quantidade" 
            onChange={(e)=>setQuantidade(e.target.value)}
            required
            />
          </div>

          <div className="input-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea 
            name="descricao" 
            cols="30" 
            rows="3"
            onChange={(e)=>setDescricao(e.target.value)}
            required
            >

            </textarea>
          </div>

          

          <button type="submit" className="button">Concluir</button>

        </form>
      </section>
    </>
  )
}