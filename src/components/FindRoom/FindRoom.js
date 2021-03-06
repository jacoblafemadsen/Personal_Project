import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, joinRoom, changeColor } from '../../ducks/video_reducer'
import { Redirect } from 'react-router-dom'
import './FindRoom.css'
import RoomCard from './RoomCard/RoomCard';
import logoOuter from '../../images/synchronizedvid_logo_outer_ring.svg'
import logoInner from '../../images/synchronizedvid_logo_inner.svg'

class FindRoom extends Component {
  constructor() {
    super()
    this.state ={
      roomNameInpt: '',
      passwordInpt: '',
      rooms: [],
      redirect: false
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
    if(this.state.passwordInpt && this.state.roomNameInpt) {
      let roomObj = {
        name: this.state.roomNameInpt,
        password: this.state.passwordInpt,
        made_by: this.props.user.display_name
      }
      axios.post('/api/rooms', roomObj).then(res => {
        this.props.joinRoom({user_id: this.props.user.id, rooms_id: res.data.id})
      }).catch(e => console.log(e))
      this.setState({input: '', redirect: true})
    } else {
      this.setState({roomNameInpt: '', passwordInpt: ''})
    }
  }
  render() {
    if(this.state.redirect) {
      return <Redirect push to="/dashboard"/>
    }
    var roomArr = this.state.rooms.map((e, i) => {
      if(i % 2 === 0) {
        return (
          <RoomCard 
            key={e.id}
            eo="even"
            roomObj={e}
            userId={this.props.user.id}
          />
        )
      } else {
        return (
          <RoomCard 
            key={e.id}
            eo="odd"
            roomObj={e}
            userId={this.props.user.id}
          />
        )
      }
    })
    return (
      <div className="FindRoom">
        <div className="FR-top-bar-container" style={{background: `${this.props.user.color}`}}>
          <div className="FR-top-bar">
            <Link to='/'><button>
              <img src={logoOuter} id="FR-logo" alt="" draggable="false" />
              <img src={logoInner} alt="" draggable="false" />
            </button></Link>
          </div>
        </div>
        <div className="FR-rooms">
          <div className="FR-join-room">
            <div className="FR-join-room-title">
              <p>Join a room</p>
            </div>
            <div className="FR-join-room-container">
              {roomArr}
            </div>
          </div>
          <div className="FR-create-room">
            <p>Create a room</p>
            <div className="FR-create-room-card">
              <div className="FR-color-img">
                <div className="FR-user-img">
                  <img src={this.props.user.img} alt=""/>
                </div>
                <div className="FR-color-pick dropdown" style={{background: `${this.props.user.color}`}}>
                  <div className="dropdown-color-picker">
                    <button onClick={() => this.props.changeColor({user_id: this.props.user.id, color: "#7fffd4"})} style={{background: `#7fffd4`}}></button>
                    <button onClick={() => this.props.changeColor({user_id: this.props.user.id, color: "#00FFFF"})} style={{background: `#00FFFF`}}></button>
                    <button onClick={() => this.props.changeColor({user_id: this.props.user.id, color: "#FF6EFF"})} style={{background: `#FF6EFF`}}></button>
                    <button onClick={() => this.props.changeColor({user_id: this.props.user.id, color: "#8FD400"})} style={{background: `#8FD400`}}></button>
                    <button onClick={() => this.props.changeColor({user_id: this.props.user.id, color: "#FFFF26"})} style={{background: `#FFFF26`}}></button>
                    <button onClick={() => this.props.changeColor({user_id: this.props.user.id, color: "#FF0000"})} style={{background: `#FF0000`}}></button>
                    <button onClick={() => this.props.changeColor({user_id: this.props.user.id, color: "#D900D9"})} style={{background: `#D900D9`}}></button>
                    <button onClick={() => this.props.changeColor({user_id: this.props.user.id, color: "#2196F3"})} style={{background: `#2196F3`}}></button>
                    <button onClick={() => this.props.changeColor({user_id: this.props.user.id, color: "#FFCC33"})} style={{background: `#FFCC33`}}></button>
                  </div>
                </div>
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
              <button
                id="FR-button-create"
                style={{background: `${this.props.user.color}`}}
                onClick={() => this.prepForMakeRoom()}
              >Make a room</button>
            </div>
          </div>
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

export default connect(mapStateToProps, {getUser, joinRoom, changeColor})(FindRoom);