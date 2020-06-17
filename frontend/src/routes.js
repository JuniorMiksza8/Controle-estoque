import React from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';

import Login from './pages/login';
import Produtos from './pages/produtos';
import Movimentacao from './pages/movimentacao';
import NovoProduto from './pages/novoProduto';
import NovoMovimentacao from './pages/novoMovimentacao';
import AddProduto from './pages/addProduto';
import Entradas from './pages/entradas';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/produtos" component={Produtos} />
        <Route path="/movimentacao" component={Movimentacao}/>
        <Route path="/new"  component={NovoProduto}/>
        <Route path="/newmovimentacao/:id" exact component={NovoMovimentacao}/>
        <Route path="/addproduto/:id"  component={AddProduto}/>
        <Route path="/entradas"  component={Entradas}/>
      </Switch>
    </BrowserRouter>
  )
}