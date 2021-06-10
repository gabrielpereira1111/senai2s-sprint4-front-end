import React, {Component} from 'react'

class TiposEventos extends Component{
    constructor(props){
        super(props)
        this.state = {
            listaTiposEventos : [],
            titulo : '',
            idTipoEventoAlterado : 0
        }
    }

    componentDidMount(){
        this.buscarTiposEventos()
    }

    buscarTiposEventos = () => {
        fetch("http://localhost:5000/api/tiposevento", {
            headers : {"Authorization" : "Bearer " + localStorage.getItem("usuario-login")}
        })

        .then(resposta => resposta.json())
        .then(data => this.setState({listaTiposEventos : data}))

        .catch(erro => console.log(erro))
    }

    cadastrarTipoEvento = (event) => {
        event.preventDefault()

        fetch("http://localhost:5000/api/tiposevento", {
            method : "POST",
            body : JSON.stringify({tituloTipoEvento : this.state.titulo}),
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+localStorage.getItem("usuario-login")
            }
        })
        .then(console.log("Tipo de Evento cadastrado!"))
        .catch(erro => console.log(erro))
        .then(this.buscarTiposEventos)
    }

    atualizaCampos = async(campo) => {
        await this.setState({[campo.target.name] : campo.target.value})
        console.log(this.state.titulo)
    }

    buscarTiposEventosPorId = (tipoEventos) => {
        this.setState({
            idTipoEventoAlterado : tipoEventos.idTipoEvento,
            titulo : tipoEventos.tituloTipoEvento
        }, () => {
            console.log(
                'Agora o idTipoEvento é: '+tipoEventos.idTipoEvento,
                'O idTipoEventoAlterado é: '+this.state.idTipoEventoAlterado,
                'O TíTulo selecionado é: '+this.state.titulo
            )
        })
    }

    excluirTiposEventos = (tipoEventos) => {
        console.log('O Tipo de Evento '+tipoEventos.idTipoEvento+' foi selecionado!')

        fetch('http://localhost:5000/api/tiposevento/'+tipoEventos.idTipoEvento, {
            method : 'DELETE',
            headers : {
                'Authorization' : 'Bearer '+localStorage.getItem('usuario-login')
            }
        })

        .then(resposta => {
            if(resposta.status === 204){
                console.log('O Tipo de Evento '+tipoEventos.idTipoEvento+' foi excluído!')
            }
        })

        .catch(erro => console.log(erro))

        .then(this.buscarTiposEventos)
    }

    limparCampos = () => {
        this.setState({
            titulo : '',
            idTipoEventoAlterado : 0
        })
    }


    render(){
        return(
            <div>
                <main>
                    <section>
                        <form onSubmit={this.cadastrarTipoEvento}>
                            <input 
                                style={{marginRight : '5px'}}
                                type="text"
                                name="titulo"
                                value={this.state.titulo}
                                onChange={this.atualizaCampos}
                                placeholder="Titulo Tipo de Evento"
                            />
                            <button style={{marginRight : '5px'}} type="submit">Cadastrar</button>
                            <button style={{marginRight : '5px'}} type="button" onClick={this.limparCampos}>Cancelar</button>
                        </form>
                    </section>

                    <h2 style={{marginTop : '20px'}}>Lista de Tipo Evento</h2>
                    <section>
                        <table style={{borderCollapse : 'separate', borderSpacing : '20px'}}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Titulo</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.listaTiposEventos.map(tipoEventos => {
                                        return(
                                            <tr key={tipoEventos.idTipoEvento}>
                                                <td>{tipoEventos.idTipoEvento}</td>
                                                <td>{tipoEventos.tituloTipoEvento}</td>
                                                <td>
                                                    <button onClick={() => this.buscarTiposEventosPorId(tipoEventos)}>
                                                        Selecionar
                                                    </button>
                                                </td>
                                                <td>
                                                    <button  onClick={() => this.excluirTiposEventos(tipoEventos)}>
                                                        Excluir
                                                    </button>
                                                </td>
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
}


export default TiposEventos