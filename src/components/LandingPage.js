import React, { Component } from 'react';
import { Link } from "react-router-dom";

class LandingPage extends Component {

  render() {
    return (
      <div>
        <p>Description of Adoption Process TEST2</p>
        <img src='https://cdn.abcotvs.com/dip/images/5760725_dogadoption.JPG?w=1600' alt='really cute dog getting adopted'/>
        <Link to={`/AdoptionPage`}>See available pets!</Link>
      </div>
    )
  }
}
export default LandingPage