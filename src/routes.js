import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import FindRoom from './components/FindRoom/FindRoom'

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/findroom' component={FindRoom} />
    <Route path='/dashboard' component={Dashboard} />
  </Switch>
)