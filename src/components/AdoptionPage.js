import React, { Component } from 'react';

import config from '../config'

class AdoptionPage extends Component {

  state = {
    dog: {},
    cat: {},
    people: [],
    currentUser: null,
    animal: true,
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

    this.updatePeople()

  }

  updatePeople = () => {
    fetch(`${config.REACT_APP_API_BASE}/people`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({
        people: data
      })
    })
  }

  fetchCalls(animal) {
    fetch(`${config.REACT_APP_API_BASE}/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(animal)
    })
      .then(() => {
        return fetch(`${config.REACT_APP_API_BASE}/pets`);
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          dog: data[1],
          cat: data[0],
        })
        return fetch(`${config.REACT_APP_API_BASE}/people`)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          people: data
        })
      })
  }

  fillTheQueue() {
    let self = this;
    let names = [{ Name: 'Malcolm Reynolds' }, { Name: 'River Tam' }, { Name: 'Kaylee Frye' }, { Name: 'Hoban Washburne' }]
    let count = 3;
    let update = this.state.people;
    update.push(names[count].Name);
    let intervalID = setInterval(function () {
      fetch(`${config.REACT_APP_API_BASE}/people`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(names[count--]),
      }).then(() => {
        self.updatePeople()
      });
      if (count === 0) {
        clearInterval(intervalID)
      }
    }, 5000);
  };

  onJoinLineClick(e) {
    e.preventDefault();

    let name = { Name: e.target.name.value }
    console.log(e.target.name.value)
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

    let self = this;

    let intervalID = setInterval(function () {
      let animal;

      if (self.state.animal === true) {
        animal = { type: 'cats' }
      } else {
        animal = { type: 'dogs' }
      }

      self.fetchCalls(animal)

      self.setState({
        animal: !self.state.animal
      })
      if (self.state.people[1] === self.state.currentUser) {
        clearInterval(intervalID)
      }
    }, 5000)

    e.target.name.value = ''

  }



  render() {
    let dog = this.state.dog;
    let cat = this.state.cat;
    let people = this.state.people;

    if(people[0] === this.state.currentUser && people.length === 1){
      this.fillTheQueue();
    }

    return (
      <div id="pets">
        <div className='dog-info'>
          <h2>{dog.name}</h2>
          <img src={dog.imageURL} alt={dog.description} />
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
          <img src={cat.imageURL} alt={cat.description} />
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
            {people.map((person, idx) => {
              return (
                <li key={idx}>{person}</li>
              )
            })}
          </ul>
          <form onSubmit={e => this.onJoinLineClick(e)}>
            <label htmlFor="name"></label>
            <input id="name" placeholder='Your name eg. John Smith' required></input>
            <button>Join the line!</button>
          </form>
        </div>
      </div>
    )
  }
}
export default AdoptionPage