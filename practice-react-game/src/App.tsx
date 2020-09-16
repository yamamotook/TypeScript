import React from 'react';
import './App.css';
import { Count } from './components/CountComp';
import Game from './components/Game';


interface iState{
  num : number
}

class App extends React.Component<{},iState>{

  state : iState= {
    num : 0
  }

  onChange = (newVal : number) => {
    this.setState({
      num : newVal
    })
  }


  render(){
    return (
        <Game></Game>
    );
  }
}

export default App;
