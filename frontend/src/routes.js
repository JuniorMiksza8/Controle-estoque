import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/login';
import Produtos from './pages/produtos';
import Movimentacao from './pages/movimentacao';
import NovoProduto from './pages/novoProduto';
import NovoMovimentacao from './pages/novoMovimentacao';
import AddProduto from './pages/addProduto';
import Entradas from './pages/entradas';
import NovoUsuario from './pages/novoUsuario';

import {isAuth} from './auth.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (

    <Route {...rest} render={props => (
      isAuth() ?
        <Component {...props} />
        : <Redirect to="/" />
    )} />
  );
};  

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/produtos" component={Produtos} />
        <PrivateRoute path="/movimentacao" component={Movimentacao} />
        <PrivateRoute path="/new" component={NovoProduto} />
        <PrivateRoute path="/newmovimentacao/:id" exact component={NovoMovimentacao} />
        <PrivateRoute path="/addproduto/:id" component={AddProduto} />
        <PrivateRoute path="/entradas" component={Entradas} />
        <PrivateRoute path="/newuser" component={NovoUsuario} />
      </Switch>
    </BrowserRouter>
  )
}