import React, { Component } from 'react';
import { Link } from "react-router-dom";
import config from '../config'

class AdoptionPage extends Component {

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

  render() {

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
        </div>
      </div>
    )
  }
}
export default AdoptionPage