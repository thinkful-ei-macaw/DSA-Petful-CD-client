import React from 'react'
import { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import LandingPage from '../components/LandingPage'
import AdoptionPage from '../components/AdoptionPage'


class Root extends Component {
  
  
  render() {
    return (
      <div>
        <h1>Petful</h1>
        <Switch>
          <Route exact path={'/'} component={LandingPage} />
          <Route path={'/AdoptionPage'} component={AdoptionPage} />
        </Switch>
      </div>
    )
  }
}

export default Root
