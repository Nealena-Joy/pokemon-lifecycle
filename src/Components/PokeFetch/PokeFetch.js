import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      time: 10000
    }
    this.startTimer=this.startTimer.bind(this);
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))

  
  }

  startTimer(){
    this.timer = setInterval(() => 
    this.setState({
      time: (this.state.time) - 1
    }), 0)
    console.log("Counter:", this.state.time)

    if (this.state.time < (5000)){
        console.log("This Time:", this.state.time)
        return(
          <div>
            <p>TEST</p>
            <img className='pokeImg' alt={this.state.pokeName} src={this.state.pokeSprite} />
            <h1 className={'pokeName'}>{this.state.pokeName}</h1>
          </div>
        )
      
    } else {
      return(
        <img className='pokeImg-hidden' alt={this.state.pokeName} src={this.state.pokeSprite} />
      )
    }
  }


  render() {

    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => {this.fetchPokemon(); this.startTimer()}}>Start!</button>
        <h1 className={'timer'} >Timer: {this.state.time} seconds</h1>
        <div className={'pokeWrap'}>
          
          {this.startTimer()}

          
        </div>
      </div>
    )
  }
}

export default PokeFetch;