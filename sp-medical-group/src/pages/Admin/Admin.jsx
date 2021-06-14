import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Admin.css'
import logo from '../../imagens-SPMED/logo-v1.png'
import { Link } from 'react-router-dom';

export default function AdminConsultas(){
    const[listaConsulta, setListaConsulta] = useState([])
    const[listaMedico, setListaMedico] = useState([])
    const[listaPaciente, setListaPaciente] = useState([])
    const[idMedico, setIdMedico] = useState(0)
    const[idPaciente, setIdPaciente] = useState(0)
    const[dataConsulta, setDataConsulta] = useState(new Date())
    const[situacao, setSitucao] = useState('')

    function buscarListaConsulta(){
        axios("http://localhost:5000/api/consulta", {
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem("usuario-login")
            }
        })
        .then(resposta => {
            if(resposta.status === 200){
                setListaConsulta(resposta.data)
            }
        })
        .catch(erro => console.log(erro))
    }

    useEffect(buscarListaConsulta, [])
    function buscarListaMedico(){
        axios('http://localhost:5000/api/medico', {
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem("usuario-login")
            }
        })
        .then(resposta => {
            if(resposta.status === 200){
                setListaMedico(resposta.data)
            }
        })
        .catch(erro => console.log(erro))
    }
    useEffect(buscarListaMedico, [])

    function buscarListaPaciente(){
        axios('http://localhost:5000/api/paciente', {
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem("usuario-login")
            }
        })
        .then(resposta => {
            if(resposta.status === 200){
                setListaPaciente(resposta.data)
            }
        })
        .catch(erro => console.log(erro))
    }
    useEffect(buscarListaPaciente, [])

    function cadastrarConsulta(){
        let consulta = {
            idmedicos : idMedico,
            idpacientes : idPaciente,
            dataConsulta : dataConsulta,
            situacao : situacao
        }
        axios.post('http://localhost:5000/api/consulta', consulta, {
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem('usuario.login')
            }
        })
        .then(resposta => {
            if(resposta.status === 201){
                console.log("Consulta cadastrada!")
                buscarListaConsulta()
            }
        })
        .catch(erro => console.log(erro))
    }



    return(
        <div>
            <header className="headerConsultasPaciente">
                <div className="divHeaderLogo">
                    <Link to="/login">
                        <img style={{width:"4vw"}} src={logo} alt="Logo SP Medical Group" />
                    </Link>
                </div>
            </header>
            <main>
                <h3 className="titulo-cadastro" >Cadastrar Consulta</h3>
                <section className="sctInput">
                    <form onSubmit={cadastrarConsulta}>
                        <select 
                            className="slctADM"
                            id="slct1"
                            value={idMedico}
                            onChange={(event) => {setIdMedico(event.target.value)}}
                        >
                            <option value="0">Selecione um médico:</option>
                            {
                                listaMedico.map(medico => {
                                    return(
                                        <option key={medico.idmedicos} value={medico.idmedicos}>
                                            {medico.nome} - {medico.idespecialidadesNavigation.nome}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <select
                            className="slctADM" 
                            id="slct2"
                            value={idPaciente} 
                            onChange={(event) => {setIdPaciente(event.target.value)}}
                        >
                            <option value="0">Selecione um paciente:</option>
                            {
                                listaPaciente.map(paciente => {
                                    return(
                                       <option key={paciente.idpacientes} value={paciente.idpacientes}>
                                           {paciente.nome}
                                       </option>
                                    )
                                })
                            }
                        </select>
                        <input className="inpt" type="date" value={dataConsulta} onChange={(event) => {setDataConsulta(event.target.value)}}/>
                        <select  className="slctADM"  id="slct3" value={situacao} onChange={(event) => {setSitucao(event.target.value)}}>
                            <option value="0">Situação</option>
                            <option value="1">Realizada</option>
                            <option value="2">Cancelada</option>
                            <option value="3">Agendada</option>
                        </select>
                        <button className="btn1" type='submit'>Cadastrar</button>
                    </form>
                </section>
                
                <h2 className="tituloTabelaADM">Consultas</h2>
                <section className="sctConsultasADM">
                    <div className="divTable">
                        <table className="tabelaPacientes" style={{borderCollapse: 'separate', borderSpacing: '30px'}}>
                            <thead>
                                <tr>
                                    <td className="tdHead" id="tdIdHead">#</td>
                                    <td className="tdHead" id="tdMedicoHead">Médico</td>
                                    <td className="tdHead" id="tdDataHead">Paciente</td>
                                    <td className="tdHead" id="tdSituacaoHead">Data da Consulta</td>
                                    <td className="tdHead" id="tdDescricaoHead">Situação</td>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    listaConsulta.map(consulta => {

                                        return(
                                            <tr key={consulta.idconsultas}>
                                                <td className="tdMedicoBody">{consulta.idconsultas}</td>
                                                <td className="tdMedicoBody">{consulta.idmedicosNavigation.nome}</td>
                                                <td className="tdMedicoBody">{consulta.idpacientesNavigation.nome}</td>
                                                <td className="tdDataBody">{consulta.dataConsulta}</td>
                                                <td className="tdSituacaoBody">{consulta.situacao}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    )
}