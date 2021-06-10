import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Eventos(){
    const[listaEventos, setListaEventos] = useState([])
    const[listaTipoEventos, setListaTipoEventos] = useState([])
    const[listaIntituicoes, setListaInstituicoes] = useState([])
    const[titulo, setTitulo] = useState('')
    const[descricao, setDescricao] = useState('')
    const[dataEvento, setDataEvento] = useState(new Date())
    const[acessoLivre, setAcessoLivre] = useState(0)
    const[idTipoEvento, setIdTipoEvento] = useState(0)
    const[idInstituicao, setIdInstituicao] = useState(0)
    const[isLoading, setIsLoading] = useState(false)
    

    function buscarEvento(){
        axios("http://localhost:5000/api/eventos", {
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem("usuario-login")
            }
        })

        .then(resposta => {
            if(resposta.status === 200){
                setListaEventos(resposta.data)
            }
        })

        .catch(erro => console.log(erro))
    }

    useEffect(buscarEvento, [])

    function buscarTipoEventos(){
        axios("http://localhost:5000/api/tiposevento", {
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem("usuario-login") 
            }
        })

        .then(resposta => {
            if(resposta.status === 200){
                setListaTipoEventos(resposta.data)
            }
        })

        .catch(erro => console.log(erro))
    }

    useEffect(buscarTipoEventos, [])


    console.log(listaIntituicoes)

    

    function cadastrarEvento(event){
        event.preventDefault();
        setIsLoading(true)

        let evento = {
            nomeEvento : titulo,
            descricao : descricao,
            dataEvento : new Date(dataEvento),
            acessoLivre : Boolean(acessoLivre),
            idTipoEvento : idTipoEvento,
            idInstituicao : idInstituicao
        }

        axios.post("http://localhost:5000/api/eventos", evento, {
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem("usuario-login")
            }
        })

        .then(resposta => {
            if(resposta.status === 201){
                console.log('Evento cadastrado!')
                setIsLoading(false)
                buscarEvento()
            }
        })

        .catch(erro => {
            console.log(erro)
            setIsLoading(false)
        })
    }

    function buscarListaInstituicoes(){
        axios("http://localhost:5000/api/instituicoes", {
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem("usuario-login")
            }
        })

        .then(resposta => {
            if(resposta.status === 200){
                setListaInstituicoes(resposta.data)
            }
        })

        .catch(erro => console.log(erro))
    }

    useEffect(buscarListaInstituicoes, [])
    console.log(listaIntituicoes)

    return(
        <div>
            <main>
                <section>
                    <div>
                        <h2>Lista de Eventos</h2>
                        <table style={{borderCollapse : "separate", borderSpacing : 30}}>
                            <thead>
                            <tr>
                                <td>#</td>
                                <td>Evento</td>
                                <td>Descricao</td>
                                <td>Instituicao</td>
                                <td>Tipo de Evento</td>
                                <td>Data</td>
                                <td>Acesso</td>
                            </tr>
                            </thead>

                            <tbody>
                                {
                                    listaEventos.map((eventos) => {
                                        return(
                                            <tr key={eventos.idEventos}>
                                                <td>{eventos.idEventos}</td>
                                                <td>{eventos.nomeEvento}</td>
                                                <td>{eventos.descricao}</td>
                                                <td>{eventos.idInstituicaoNavigation.nomeFantasia}</td>
                                                <td>{eventos.idTipoEventoNavigation.tituloTipoEvento}</td>
                                                <td>{eventos.dataEvento}</td>
                                                <td>{eventos.acessoLivre ? "Público" : "Privado"}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 style={{marginLeft : '10px', marginBottom : '10px', marginTop : '50px'}}>Cadastro de Eventos</h2>
                    <form onSubmit={cadastrarEvento}>
                        <div style={{display : 'flex', flexDirection : 'column', width : '20vw', marginLeft : '10px'}}>
                            <input 
                                style={{marginBottom : '10px'}}
                                type="text"
                                name="titulo"
                                value={titulo}
                                onChange={(evento) => {setTitulo(evento.target.value)}}
                                placeholder="Título do evento"    
                            />

                            <input 
                                style={{marginBottom : '10px'}}
                                type="text"
                                name="descricao"
                                value={descricao}
                                onChange={(evento) => {setDescricao(evento.target.value)}}
                                placeholder="Descrição do evento"
                            />

                            <input 
                                style={{marginBottom : '10px'}}
                                type="date"
                                name="dataEvento"
                                value={dataEvento}
                                onChange={(evento) => {setDataEvento(evento.target.value)}}
                            />

                            <select 
                                style={{marginBottom : '10px'}}
                                name="acessoLivre" 
                                value={acessoLivre} 
                                onChange={(evento) => {setAcessoLivre(evento.target.value)}}>
                                    <option value="1">Público</option>
                                    <option value="0">Privado</option>
                            </select>

                            <select 
                                style={{marginBottom : '10px'}}
                                name="idTipoEvento" 
                                value={idTipoEvento}
                                onChange={(evento) => {setIdTipoEvento(evento.target.value)}}
                            >
                                <option value="0">Selecione o tema do evento</option>
                                {
                                    listaTipoEventos.map( tema => {
                                        return(
                                            <option 
                                                key={tema.idTipoEvento}
                                                value={tema.idTipoEvento}    
                                            >
                                                {tema.idTipoEvento} - {tema.tituloTipoEvento}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                            <select 
                                style={{marginBottom : '10px'}}
                                name="idInstituicao"
                                value={idInstituicao}
                                onChange={(evento) => {setIdInstituicao(evento.target.value)}}
                            >
                                <option value="0">Selecione a instituição</option>
                                {
                                    listaIntituicoes.map(instituicao => {
                                        return(
                                            <option 
                                                value={instituicao.idInstituicao}
                                                key={instituicao.idInstituicao}
                                            >
                                                {instituicao.nomeFantasia}
                                            </option>
                                        )
                                    })
                                }

                            </select>

                            {
                                isLoading === true &&
                                <button type="submit" disabled>
                                    Loading...
                                </button>
                            }
                            {
                                isLoading === false &&
                                <button type="submit">
                                    Cadastrar
                                </button>
                            }
                        </div>
                    </form>
                                
                </section>
            </main>
        </div>
    )

}