import React, { Component } from 'react';

import config from '../config'

class AdoptionPage extends Component {
constructor() {
  super()
  this.step = 0;
  this.type = true;
}
  
  state = {
    dog: {},
    cat: {},
    people: [],
    currentUser: null,
  }

  componentDidMount() {
    fetch(`${config.REACT_APP_API_BASE}/pets`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          dog: data[1],
          cat: data[0],
        })
      })

    fetch(`${config.REACT_APP_API_BASE}/people`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          people: data
        })
      })
  }

  adoptionCountdown() {

    let animal
    this.step++
    if (this.type === true) {
      animal = {type: 'cats'}
    } else {
      animal = {type: 'dogs'}
    }
    
    this.type = !this.type;
    console.log('I ran');

    if (this.step === 1) {
      fetch(`${config.REACT_APP_API_BASE}/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(animal)
    })
    this.step++
    }
    
    if (this.step === 2) {
      fetch(`${config.REACT_APP_API_BASE}/pets`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({
        dog: data[1],
        cat: data[0],
      })
    })
    this.step++
    }
    
    if (this.step === 3) {
      fetch(`${config.REACT_APP_API_BASE}/people`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({
        people: data
      })
    })
    }
    
    this.step = 0;
  }

  onJoinLineClick(e) {
    e.preventDefault();

    let name = {Name: e.target.name.value}
    
    let update = this.state.people;
    update.push(e.target.name.value)

    fetch(`${config.REACT_APP_API_BASE}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(name),
    })

    this.setState({
      people: update,
      currentUser: e.target.name.value,
    })

    e.target.name.value = ''

    this.adoptionCountdown()
  }



  render() {
    if (this.state.people[0] === this.state.currentUser) {
      clearInterval(this.intervalID)
    }

    let dog = this.state.dog;
    let cat = this.state.cat;
    let people = this.state.people;

    return (
      <div id="pets">
        <div className='dog-info'>
          <h2>{dog.name}</h2>
          <img src={dog.imageURL} />
          <p>{dog.description}</p>
          <ul>
            <li>{dog.gender}</li>
            <li>{dog.age}</li>
            <li>{dog.breed}</li>
          </ul>
          <p>{dog.story}</p>
          {this.state.currentUser && this.state.currentUser === people[0] && <form id='dog'>
            <button>Adopt Me!</button>
          </form>}
        </div>
        <div className='cat-info'>
          <h2>{cat.name}</h2>
          <img src={cat.imageURL} />
          <p>{cat.description}</p>
          <ul>
            <li>{cat.gender}</li>
            <li>{cat.age}</li>
            <li>{cat.breed}</li>
          </ul>
          <p>{cat.story}</p>
          {this.state.currentUser && this.state.currentUser === people[0] && <form id='cat'>
            <button>Adopt Me!</button>
          </form>}
        </div>
        <div>
          <p>If you would like to adopt a pet, please join the back of the line!</p>
          <ul>
            {people.map(person => {
                return (
                  <li>{person}</li>
                )
            })}
          </ul>
          <form onSubmit={e => this.onJoinLineClick(e)}>
            <label for="name"></label>
            <input id="name" placeholder='Your name eg. John Smith' required></input>
            <button>Join the line!</button>
          </form>
        </div>
      </div>
    )
  }
}
export default AdoptionPage