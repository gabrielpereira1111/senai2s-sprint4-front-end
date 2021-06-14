import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App.jsx';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import Login from './pages/Login/login'
import NotFound from './pages/NotFound/NotFound.jsx'
import {parseJwt, usuarioAutenticado} from './services/auth.jsx'
import AdminConsultas from './pages/Admin/Admin';
import PacientesConsulta from './pages/Paciente/Paciente.jsx';
import MedicosConsultas from './pages/Medico/Medico';

const PermissaoAdm = ({component : Component}) => (
  <Route
    render = {props => 
      usuarioAutenticado() && parseJwt().role === "1" ?
      <Component {...props}/> :
      <Redirect to = "login"/>
    }
  />
)

const PermissaoPaciente = ({component : Component}) => (
  <Route
    render = {props =>
      usuarioAutenticado() && parseJwt().role === "2" ?
      <Component {...props}/> :
      <Redirect to = "login"/>
    }
  />
)

const PermissaoMedico = ({component : Component}) => (
  <Route
    render = {props =>
      usuarioAutenticado() && parseJwt().role === "3" ? 
      <Component {...props}/> :
      <Redirect to = "medicos"/>
     }
  />
)


const routing = (
  <Router>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route path='/login' component={Login}/>
      <PermissaoPaciente path='/paciente' component={PacientesConsulta}/>
      <PermissaoMedico path='/medicos' component={MedicosConsultas}/>
      <PermissaoAdm path='/adm' component={AdminConsultas}/>
      <Route exact path='/notfound' component={NotFound}/>
      <Redirect to = '/notfound'/>
    </Switch>
  </Router>
)

ReactDOM.render(routing,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
