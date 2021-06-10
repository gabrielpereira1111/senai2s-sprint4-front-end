import React from 'react'

class Titulo extends React.Component{
    render(){
        return (
            <h2 className="conteudoPrincipal-cadastro-titulo">{this.props.tituloSeccao}</h2>
        )
    }
}

export default Titulo