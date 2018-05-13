import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { joinRoom, getUser } from '../../ducks/video_reducer'
import Player from './Player/Player'
import Chat from './Chat/Chat'
import Queue from './Queue/Queue'
import './Dashboard.css'
import logo from '../../images/synchronizedvid_logo1.svg'


class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      roomName: ''
    }
  }
  componentDidMount() {
    this.props.getUser()
    this.setState({roomName: ''})
    axios.get(`/api/room/${this.props.user.rooms_id}`).then(res => {
      console.log(res.data.name)
      this.setState({roomName: res.data.name})
    })
  }
  render() {
    return (
      <div className="Dashboard">
        <div className="Dash-top" style={{background: `${this.props.user.color}`}}>
          <div className="Dash-top-logo">
            <a href='/logout'><button  onClick={() => this.props.joinRoom({user_id: this.props.user.id, rooms_id: null})}>
              <img src={logo} alt=""/>
            </button></a>
          </div>
          <div className="Dash-top-room-name">
            <h1>{this.state.roomName}</h1>
          </div>
          <div className="Dash-user-info-container dropdown">
            <div className="Dash-user-info-banner">
              <p>{this.props.user.display_name}</p>
              <div className="Dash-user-img">
                <img src={this.props.user.img} alt=""/>
              </div>
            </div>
            <div className='dropdown-content'>
              <a href='/logout'>
                <button 
                  onClick={() => this.props.joinRoom({user_id: this.props.user.id, rooms_id: null})}
                  style={{background: `${this.props.user.color}`}}
                >Logout</button>
              </a>
              <Link to='/findroom'>
                <button 
                  onClick={() => this.props.joinRoom({user_id: this.props.user.id, rooms_id: null})}
                  style={{background: `${this.props.user.color}`}}
                >Leave Room</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="Dash-sub-bar">
          <div id='queue-sub-bar'><Queue/></div>
          <div className="Dash-sub-bar-name">
            <h1>{this.state.roomName}</h1>
          </div>
          <div id='chat-sub-bar'><Chat/></div>
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

export default connect(mapStateToProps, {joinRoom, getUser})(Dashboard);