import React, {Component} from 'react'
import axios from 'axios'
import { parseJwt, usuarioAutenticado } from '../../services/auth'
import './login.css'
import logoV2 from '../../imagens-SPMED/logo-v2.png'

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email : '',
            senha : '',
            errorMessage : '',
            isLoading : false
        }
    }

    componentDidMount(){

    }

    buscarEmailSenha = (event) => {
        event.preventDefault()
        this.setState({isLoading : true})

        axios.post('http://localhost:5000/api/login', {
            email : this.state.email,
            senha : this.state.senha
        })

        .then(resposta => {
            if(resposta.status === 200){
                localStorage.setItem("usuario-login", resposta.data.token)
                console.log("Meu token é: "+resposta.data.token)
                this.setState({isLoading : false})
            }

            let base64 = localStorage.getItem('usuario-login').split('.')[1]

            console.log(JSON.parse(window.atob(base64)))

            
            if(parseJwt().role === "1"){
                this.props.history.push('/adm');
                console.log('Estou logado: '+usuarioAutenticado())
            } 
            else if(parseJwt().role === "2"){
                this.props.history.push('/paciente')
                console.log('Estou logado: '+usuarioAutenticado())
            } 
            else if(parseJwt().role === "3"){
                this.props.history.push('/medicos')
                console.log("Estou logado: "+usuarioAutenticado())
            }
        })


        .catch(erro => {
            console.log(erro)
            this.setState({isLoading : false, errorMessage : 'Email e/ou senha incorretos! Insire-os novamente.'})
        })
    } 

    atualizaCampos = async(campo) => {
        await this.setState({
            [campo.target.name] : campo.target.value
        })
    }


    render(){
        return(
                <div>
                    <main>
                        <div className="divLogin">
                            <section className="section-inpt">
                                <img className="logoV2" src={logoV2} alt="Logo SP Med Group" />
                                <form  onSubmit={this.buscarEmailSenha}>
                                    
                                    <input 
                                        className="inpt-email"
                                        style={{display : 'block'}}
                                        type="text"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.atualizaCampos}
                                        placeholder="Email" 
                                    />

                                    <input 
                                        className="inpt-senha"
                                        type="password" 
                                        name="senha"
                                        value={this.state.senha}
                                        onChange={this.atualizaCampos}
                                        placeholder="Senha"
                                    />
                                    <p style={{color : 'white'}}>{this.state.errorMessage}</p>

                                    {
                                        this.state.isLoading === false &&
                                        <button className="btn" type='submit' disabled={this.state.email === '' || this.state.senha === ''}>
                                            Login
                                        </button>

                                    }
                                    {
                                        this.state.isLoading === true && 
                                        <button className="btn" type="submit" disabled>Login</button>
                                    }
                                    
                                </form>
                            </section>
                        </div>
                    </main>
                </div>

        )
    }
}

export default Login