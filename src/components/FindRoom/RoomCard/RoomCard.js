import React from 'react'
import { connect } from 'react-redux'
import { joinRoom } from '../../../ducks/video_reducer'
import { Redirect } from 'react-router-dom'
import './RoomCard.css'
import hideIcon from '../../../images/hide-button.svg'

class RoomCard extends React.Component {
  constructor() {
    super()
    this.state = {
      input: '',
      redirect: false,
      display: false
    }
  }
  updateInput(input) {
    this.setState({input})
  }
  join() {
    if(this.state.input === this.props.roomObj.password) {
      this.props.joinRoom({user_id: this.props.userId, rooms_id: this.props.roomObj.id})
      this.setState({input: '', redirect: true})
    } else {
      this.setState({input: ''})
    }
  }
  render() {
    if(this.state.redirect) {
      return <Redirect push to="/dashboard"/>
    }
    return (
      <div className="RoomCard" onClick={() => this.setState({display: true})}>
        <button 
          style={{background: `${this.props.user.color}`}}
          className={this.state.display ? "RoomCard-btn1" : "RoomCard-off"}
          onClick={() => setTimeout(() => this.setState({display: false}), 50)}
        >
          <img src={hideIcon} alt=""/>
        </button>
        <p id="RoomCard-p1">{`${this.props.roomObj.name}`}</p>
        <p id="RoomCard-p2">{`Created By: ${this.props.roomObj.made_by}`}</p>
        <div id="RoomCard-btnInput" className={this.state.display ? "RoomCard-on" : "RoomCard-off"}>
          <p className={this.state.display ? "RoomCard-on" : "RoomCard-off"}>Password: </p>
          <input 
            className={this.state.display ? "RoomCard-on" : "RoomCard-off"}
            onChange={e => this.updateInput(e.target.value)}
            value={this.state.input}
          />
          <button
            style={{background: `${this.props.user.color}`}}
            className={this.state.display ? "RoomCard-btn2" : "RoomCard-off"}
            onClick={() => this.join()}
          >Go</button>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {joinRoom})(RoomCard)