import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { joinRoom } from '../../ducks/video_reducer'
import Player from './Player/Player'
import Chat from './Chat/Chat'
import Queue from './Queue/Queue'
import './Dashboard.css'
import logo from '../../images/vidgear4.svg'


class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <div className="Dash-top">
          <div className="Dash-top-logo">
            <a href='/logout'><button  onClick={() => this.props.joinRoom({user_id: this.props.user.id, rooms_id: null})}>
              <img src={logo} alt=""/>
            </button></a>
          </div>
          <div className="Dash-user-info-container dropdown">
            <div className="Dash-user-info-banner">
              <p>{this.props.user.display_name}</p>
              <div className="Dash-user-img">
                <img src={this.props.user.img} alt=""/>
              </div>
            </div>
            <div className='dropdown-content'>
              <a href='/logout'><button onClick={() => this.props.joinRoom({user_id: this.props.user.id, rooms_id: null})}>Logout</button></a>
              <Link to='/findroom'><button onClick={() => this.props.joinRoom({user_id: this.props.user.id, rooms_id: null})}>Leave Room</button></Link>
            </div>
          </div>
        </div>
        <div id='player'><Player/></div>
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

export default connect(mapStateToProps, {joinRoom})(Dashboard);