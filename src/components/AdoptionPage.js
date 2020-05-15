import React, { Component } from 'react';
import { Link } from "react-router-dom";

class AdoptionPage extends Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <div className='dog-info'>
          <h2>dog name</h2>
          <img />
          <p>Description</p>
          <ul>
            <li>gender</li>
            <li>age</li>
            <li>breed</li>
          </ul>
          <p>story of the pet</p>
        </div>
        <div className='cat-info'>
          <h2>cat name</h2>
          <img />
          <p>Description</p>
          <ul>
            <li>gender</li>
            <li>age</li>
            <li>breed</li>
          </ul>
          <p>story of the pet</p>
        </div>
      </div>
    )
  }
}
export default AdoptionPage