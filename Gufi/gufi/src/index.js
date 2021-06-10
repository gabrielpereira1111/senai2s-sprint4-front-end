import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/home/App';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import Login from './pages/login/login'
import NotFound from './pages/notFound/notFound.js'
import TipoEventos from './pages/tipoEventos/tipoEventos.jsx'
import Eventos from './pages/Eventos/eventos.jsx'
import {parseJwt, usuarioAutenticado} from './services/auth'
import TiposUsuarios from './pages/Eventos/tiposUsurios/tiposUsuarios'


const PermissaoAdm = ({ component : Component }) => (
    <Route
      render = {props =>
        usuarioAutenticado() && parseJwt().role === "1" ?
        <Component {...props}/> :
        <Redirect to='login'/>
      }
    />
)


const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/notfound" component={NotFound}/>
        <PermissaoAdm path="/tipoeventos" component={TipoEventos}/>
        <Route path="/eventos" component={Eventos}/>
        <Route path="/tiposusuarios" component={TiposUsuarios}/>
        <Redirect to="/notfound"/>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing ,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
