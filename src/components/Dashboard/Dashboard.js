import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Player from './Player/Player'
import Chat from './Chat/Chat'
import Queue from './Queue/Queue'
import './Dashboard.css'

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <div className="Dash-top">
          <Link to="/join"><button>Leave Room</button></Link>
        </div>
        <div id='player'><Player /></div>
        <div id='queue'><Queue/></div>
        <div id='chat'><Chat/></div>
      </div>
    );
  }
}

export default Dashboard;