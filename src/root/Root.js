import React from 'react'
import { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import LandingPage from '../components/LandingPage'


class Root extends Component {
  
  
  render() {
    return (
      <div>
        <h1>Petful</h1>
        <Switch>
          <Route exact path={'/'} component={LandingPage} />
        </Switch>
      </div>
    )
  }
}

export default Root
