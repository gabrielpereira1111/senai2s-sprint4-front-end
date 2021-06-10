import React, { Component } from 'react';
import axios from 'axios';
import { parseJwt, usuarioAutenticado } from '../../services/auth';

import logo from '../../assets/img/logo.png';

import '../../assets/css/login.css';


class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email : '',
            senha : '',
            errorMessage: '',
            isLoading: false 
        }
    }


    efetuaLogin = (event) => {
        event.preventDefault()

        this.setState({errorMessage : '', isLoading : true})

        axios.post('http://localhost:5000/api/login', {
            email : this.state.email,
            senha : this.state.senha
        })

        .then(resposta => {
            if(resposta.status === 200){
                localStorage.setItem('usuario-login', resposta.data.token)
                
                console.log('Meu token é: ' + resposta.data.token)
                this.setState({isLoading : false})

                // let base64 = localStorage.getItem('usuario-login').split('.')[1]
                // console.log(base64)
                // console.log(window.atob(base64))

                // console.log(JSON.parse(window.atob(base64)).email)

                console.log(parseJwt().role)

                if(parseJwt().role === "1"){
                    console.log("Estou logado: "+ usuarioAutenticado())
                    this.props.history.push("/tipoeventos")
                }

                else{
                    this.props.history.push("/")
                }
            }
        })
        .catch(() => {
            this.setState({errorMessage : "E-mail ou senha inválidos! Tente novamente.", isLoading : false})
        })

    }

    atualizaCampos = (campo) => {
        this.setState({[campo.target.name] : campo.target.value})
    }

    render(){
        return(
            <div>
                <main>
                    <section className="container-login flex">
                        <div className="img__login"><div className="img__overlay"></div></div>
                        <div className="item__login">
                            <div className="row">
                                <div className="item">
                                    <img src={logo} className="icone__login" alt="logo da Gufi" />
                                </div>
                                <div className="item" id="item__title">
                                    <p>Bem vindo(a)! <br/> Faça login para acessar a sua conta.</p>
                                </div>

                                    <form onSubmit={this.efetuaLogin}>
                                        <div className="item">
                                            <input 
                                                id="login__email"
                                                className="input__login"
                                                type="text"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.atualizaCampos}
                                                placeholder="username"
                                            />
                                        </div>

                                        <div className="item">
                                            <input 
                                                id="login__password"
                                                className="input__login"
                                                type="password"
                                                name="senha"
                                                value={this.state.senha}
                                                onChange={this.atualizaCampos}
                                                placeholder="password"
                                            />
                                        </div>

                                        <p style={{ color : 'red', textAlign : 'center' }} >{this.state.errorMessage}</p>


                                        {
                                            this.state.isLoading === true &&
                                            <div className="item">
                                                <button className="btn btn__login" id="btn__login" type="submit" disabled>Loading...</button>
                                            </div>
                                        }

                                        {
                                            this.state.isLoading === false &&
                                            <div className="item">
                                                <button
                                                    className="btn btn__login" id="btn__login"
                                                    type="submit"
                                                    disabled={ this.state.email === '' || this.state.senha === '' ? 'none' : '' }
                                                >
                                                    Login
                                                </button>
                                            </div>
                                        }
                                    </form>
                                </div>
                            </div>
                    </section>
                </main>
            </div>
        )
    }
}

export default Login