import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Medico.css'
import { Link } from 'react-router-dom';
import logo from '../../imagens-SPMED/logo-v1.png'

export default function MedicosConsultas(){
    const[listaConsultas, setListaConsultas] = useState([])
    const[idConsulta, setIdConsulta] = useState(0)
    const[descricao, setDescricao] = useState("")

    function buscarConsultas(){
        axios("http://localhost:5000/api/consulta/agendamentomedicos", {
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

    function inserirDescricao(event){
        event.preventDefault()
        axios.patch("http://localhost:5000/api/consulta/descricao/"+idConsulta, {
            descricao : descricao
        }, {
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem("usuario-login")
            }
        })

        .then(resposta => {
            if(resposta.status === 204){
                console.log("Descrição adicionada!")
                buscarConsultas()
            }
        })

        .catch(erro => {
            console.log(erro)
        })

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
                <h3 className="tituloInptMed">Inserir descrição:</h3>
                <section>
                    <div>
                        <form onSubmit={inserirDescricao}>
                            <textarea 
                                className="TextArea"
                                cols="40" rows="10"
                                value={descricao}
                                onChange={(event) => {setDescricao(event.target.value)}}
                                placeholder="Insira aqui a descrição"
                            />

                            {
                                idConsulta === 0 &&
                                <button type="submit" className="btnMedInserir" disabled>Inserir</button>
                            }
                            {
                                idConsulta !== 0 &&
                                <button type="submit" className="btnMedInserir" 
                                disabled={descricao === "" ? 'none' : ''}>Inserir</button>
                            }

                            <button className="btnMedInserir" onClick={() => 
                                {
                                    setDescricao("")
                                    setIdConsulta(0)
                                }}>Cancelar</button>
                        </form>
                    </div>
                </section>
                    <h3 className="tituloTabelaMed">Consultas:</h3>
                <section className="sctMed">
                    <table style={{borderCollapse: 'separate', borderSpacing: '30px'}}>
                            <thead>
                                <tr>
                                    <td className="tdHead" id="tdDataHead">Paciente</td>
                                    <td className="tdHead" id="tdDataHead">Data da Consulta</td>
                                    <td className="tdHead" id="tdSituacaoHead">Situação</td>
                                    <td className="tdHead" id="tdDescricaoHead">Descrição</td>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    listaConsultas.map(consulta => {

                                        return(
                                            <tr key={consulta.idconsultas}>
                                                <td className="tdMedicoBody">{consulta.idpacientesNavigation.nome}</td>
                                                <td className="tdMedicoBody">{consulta.dataConsulta}</td>
                                                <td className="tdMedicoBody">{consulta.situacao}</td>
                                                <td className="tdMedicoBody">{consulta.descricao}</td>
                                                <td className="tdMedicoBody"><button className="btnMed" onClick={
                                                    async() => 
                                                    {
                                                        setIdConsulta(consulta.idconsultas)
                                                        console.log(
                                                            "O id da consulta selecionada é: "+consulta.idconsultas,
                                                            "Agora o idConsulta é: "+idConsulta
                                                        )
                                                    }}>
                                                    Selecionar</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                </section>
            </main>
        </div>
    )

}