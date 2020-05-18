import React, { Component } from 'react';
import { Link } from "react-router-dom";

class LandingPage extends Component {

  render() {
    return (
      <div className="landing">
        <p>Welcome to the FIFO Adoption Center!  We have many wonderful pets for you to adopt!  To begin the adoption process, please proceed to our adoption page. Once there you will be able to see the pets that are currently available for adoption.  Due to our strict first in first out policies, you will only be able to see one cat and one dog at a time. If you choose to become the new forever home for one of our lovable animals, you can join the line of potential adopters by entering your name at the bottom of the adoption page. Once you have joined the line, you will be able to see the pets being adopted and where you are in the line in relation to the front. Once you have reached the front of the line, you will see an option to adopt either the dog or the cat at the front of the line. Please make your decision, and the pet will be yours to take home and love! In the future we hope to be able to provide the option to adopt BOTH a cat AND a dog at the same time, but for now, if your desire is to bring diversity to your home by adopting both, please go through the process twice!</p>
        <img id="adoption" src='https://cdn.abcotvs.com/dip/images/5760725_dogadoption.JPG?w=1600' alt='really cute dog getting adopted'/>
        <Link className="link" to={`/AdoptionPage`}>See available pets!</Link>
      </div>
    )
  }
}
export default LandingPage