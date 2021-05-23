import logo from './logo.svg';
import './App.css';
import React from 'react';

function DataFormatada(props){
  return <h2>Horário Atual {props.date.toLocaleTimeString()}</h2>
}
class Clock extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      date: new Date()
    }
  }

  componentDidMount(){
    this.timerID = setInterval(() => {
      this.tick()
    }, 1000)

    console.log("Eu sou o relógio" + this.timerID)
  }
   
  componentWillUnmount(){
    clearInterval(this.timerID)
  }


  tick(){
    this.setState({
      date: new Date()
    })
  }

  pausar(){
    clearInterval(this.timerID)
    console.log("Relógio "+this.timerID+" pausado")
  }


  retomar(){
    this.timerID = setInterval(() => {
      this.tick()
    }, 1000)

    console.log("Relógio retomado: " + this.timerID)

  }

  render(){
    return(
      <div>
        <h1>Relógio</h1>
        <DataFormatada date={this.state.date}/>
        <button className="botaoP" onClick={() => this.pausar()}>Pausar</button>
        <button className="botaoR" onClick={() => this.retomar()}>Retomar</button>
      </div>
    )
  }
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock/>
        <Clock/>
      </header>
    </div>
  );
}

export default App;
