import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Player from './Player/Player'
import Chat from './Chat/Chat'
import Queue from './Queue/Queue'
import './Dashboard.css'

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <div className="Dash-top">
          <Link to="/findroom"><button>Leave Room</button></Link>
          <a href='/logout'><button>Logout</button></a>
          <div className="Dash-user-info-container">
            <div className="Dash-user-info-banner">
              <p>{this.props.user.display_name}</p>
              <div className="Dash-user-img">
                <img src={this.props.user.img} alt=""/>
              </div>
            </div>
          </div>
        </div>
        <div id='player'><Player /></div>
        <div id='queue'><Queue/></div>
        <div id='chat'><Chat/></div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Dashboard);