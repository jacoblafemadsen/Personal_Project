import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import CreateRoom from './components/CreateRoom/CreateRoom'
import JoinRoom from './components/JoinRoom/JoinRoom'
import Dashboard from './components/Dashboard/Dashboard'

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/create' component={CreateRoom} />
    <Route path='/join' component={JoinRoom} />
    <Route path='/dashboard' component={Dashboard} />
  </Switch>
)