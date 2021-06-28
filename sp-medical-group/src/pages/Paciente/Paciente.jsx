import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Paciente.css'
import logo from '../../imagens-SPMED/logo-v1.png'
import {Link} from 'react-router-dom'

export default function PacientesConsulta(){
    const[listaConsultas, setListaConsultas] = useState([])

    function buscarConsultas(){
        axios("http://localhost:5000/api/consulta/consultapaciente", {
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem("usuario-login")
            }
        })

        .then(resposta => {
            if(resposta.status === 200){
                setListaConsultas(resposta.data)
            }
        })

        .catch(erro => console.log(erro))
    }

    useEffect(buscarConsultas, [])

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
                    <h2 className="tituloTabela">Suas consultas</h2>
                    <section className="sctConsultas">
                        <div className="divTable">
                            <table className="tabelaPacientes">
                                <thead>
                                    <tr>
                                    <td className="tdHead" id="tdMedicoHead">Médico</td>
                                    <td className="tdHead" id="tdDataHead">Data da Consulta</td>
                                    <td className="tdHead" id="tdSituacaoHead">Situação</td>
                                    <td className="tdHead" id="tdDescricaoHead">Descrição</td>
                                    </tr>
                                </thead>

                                <tbody className="tbody">
                                    {
                                        listaConsultas.map(consulta => {
                                            return(
                                                <tr key={consulta.idconsultas}>
                                                    <td className="tdMedicoBody">{consulta.idmedicosNavigation.nome}</td>
                                                    <td className="tdDataBody">{Intl.DateTimeFormat("pt-BR").format(new Date(consulta.dataConsulta))}</td>
                                                    <td className="tdSituacaoBody">{consulta.situacao}</td>
                                                    <td className="tdDescricaoBody">{consulta.descricao}</td>
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