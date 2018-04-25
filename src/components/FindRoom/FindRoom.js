import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, joinRoom } from '../../ducks/video_reducer'
import './FindRoom.css'
import RoomCard from './RoomCard/RoomCard';

class FindRoom extends Component {
  constructor() {
    super()
    this.state ={
      roomNameInpt: '',
      passwordInpt: '',
      rooms: []
    }
  }
  componentDidMount() {
    this.props.getUser()
    axios.get('/api/rooms').then(res => {
      this.setState({rooms: res.data})
    })
  }
  updateName(roomNameInpt) {
    this.setState({roomNameInpt})
  }
  updatePassword(passwordInpt) {
    this.setState({passwordInpt})
  }
  prepForMakeRoom() {
    let roomObj = {
      name: this.state.roomNameInpt,
      password: this.state.passwordInpt,
      made_by: this.props.user.display_name
    }
    axios.post('/api/makeroom', roomObj).then(res => {
      this.props.joinRoom({user_id: this.props.user.id, room_id: res.data.id})
    }).catch(e => console.log(e))
  }
  render() {
    var roomArr = this.state.rooms.map(e => {
      return (
        <RoomCard 
          roomObj={e}
          userId={this.props.user.id}
        />
      )
    })
    return (
      <div className="FindRoom">
        <div className="FR-top-bar">
          <Link to='/'><button>home</button></Link>
          <Link to='/dashboard'><button>DashBoard</button></Link>
        </div>
        <div className="FR-join-room">
          {roomArr}
        </div>
        <div className="FR-create-room">
          <div className="FR-user-img">
            <img src={this.props.user.img} alt=""/>
          </div>
          <label>Room name</label>
          <input 
            type="text"
            onChange={e => this.updateName(e.target.value)}
            value={this.state.roomNameInpt}
          />
          <label>Password</label>
          <input 
            type="password"
            onChange={e => this.updatePassword(e.target.value)}
            value={this.state.passwordInpt}
          />
          <Link to='/dashboard'><button
            onClick={() => this.prepForMakeRoom()}
          >Make room</button></Link>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {getUser, joinRoom})(FindRoom);