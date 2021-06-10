import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function TiposUsuarios(){
    const [listaTiposUsuario, setListaTiposUsuario] = useState([])
    const [titulo, setTituloTipoUsuario] = useState('')

    function buscarTipoUsuario(){
        axios('http://localhost:5000/api/tiposusuario', {
            headers : {
                'Authorization' : 'Bearer '+localStorage.getItem("usuario-login")
            }
        })

        .then(resposta => {
            if(resposta.status === 200){
                setListaTiposUsuario(resposta.data)
            }
        })

        .catch(erro => console.log(erro))
    }

    useEffect(buscarTipoUsuario, [])

    function cadastrarTipoUsuario(event){
        event.preventDefault()

        axios.post('http://localhost:5000/api/tiposusuario', {
            tituloTipoUsuario : titulo
        }, {
            headers : {
                'Authorization' : 'Bearer '+localStorage.getItem("usuario-login")
            }
        })
        .then(resposta => {
            if(resposta.status === 201){
                console.log("Tipo de Usuário cadastrado!")
                buscarTipoUsuario();
            }
        })
        .catch(erro => console.log(erro))
    }

    console.log(titulo)
    return(
        <div>
            <main>
                <section>
                    <form onSubmit={cadastrarTipoUsuario}>
                        <div>
                        <input type="text"
                            value={titulo}
                            onChange={(event) => {setTituloTipoUsuario(event.target.value)}}
                            placeholder="Título Tipo de Usuário"
                        />
                        <button type="submit" disabled={titulo === '' ? 'none' : ''}>Cadastrar</button>
                        </div>
                    </form>
                </section>
                <section>
                   <h2>Lista Tipo Usuário</h2>
                   <div>
                   <table style={{borderCollapse : 'separate', borderSpacing : 30}}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tipo de Usuário</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                listaTiposUsuario.map((tiposUsuario) => {
                                    return(
                                        <tr>
                                            <td>{tiposUsuario.idTipoUsuario}</td>
                                            <td>{tiposUsuario.tituloTipoUsuario}</td>
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