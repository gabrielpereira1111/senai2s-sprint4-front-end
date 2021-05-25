import './App.css';
import {Component} from 'react'

class BuscarUsuario extends Component{
  constructor(props){
      super(props)
      this.state= {
          listaRepositorios : [],
          nomeUsuario : ''
      }

      
  }

  componentDidMount(){
  }

  atualizarNomeUsuario = async (event) =>{
      await this.setState({nomeUsuario : event.target.value})
      console.log(this.state.nomeUsuario)
  }

  buscarUsuario = () => {
      
      fetch("https://api.github.com/users/"+this.state.nomeUsuario+"/repos")
      .then(resposta => resposta.json())
      .then(data => this.setState({listaRepositorios : data}))
      .catch(erro => console.log(erro))
  }

  

  render(){
      return(
          <div>
              <main>
                  <h1>Buscar Repositórios por Usuários</h1>
                  <section>
                      <input
                      type="text"
                      value={this.state.nomeUsuario}
                      onChange={this.atualizarNomeUsuario}
                      placeholder="Nome do Usuário"
                      />
                      <button type="submit" onClick={this.buscarUsuario} disabled={this.state.nomeUsuario === "" ? 'none' : ''}>
                          Buscar
                      </button>
                      <hr/>
                  </section>

                  
                  <section>
                      <h3>{this.state.nomeUsuario}</h3>
                     <table cellPadding={0} cellSpacing={0}>
                         <thead>
                             <tr>
                                 <th>Id</th>
                                 <th>Repositório</th>
                                 <th>Descrição</th>
                                 <th>Data de Criação</th>
                                 <th>Tamanho</th>
                             </tr>
                         </thead>

                         <tbody>
                              {
                                  
                                                                
                                  this.state.listaRepositorios.map(tr => {
                                      return(
                                          <tr key={tr.id}>
                                              <td>{tr.id}</td>
                                              <td>{tr.name}</td>
                                              <td>{tr.description}</td>
                                              <td>{tr.created_at}</td>
                                              <td>{tr.size}</td>
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


function App() {
  return (
    <BuscarUsuario/>
  );
}

export default App;
