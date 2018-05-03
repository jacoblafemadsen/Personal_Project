import React from 'react'
import './RoomCard.css'
import { connect } from 'react-redux'
import { joinRoom } from '../../../ducks/video_reducer'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

class RoomCard extends React.Component {
  constructor() {
    super()
    this.state = {
      input: '',
      correct: 'RoomCard-Correct',
      redirect: false
    }
  }
  updateInput(input) {
    this.setState({input})
  }
  join() {
    console.log(this.state.input + '||' + this.props.roomObj.password)
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
      <div className="RoomCard">
        <p>{`Room Name: ${this.props.roomObj.name}`}</p>
        <p>{`Created By: ${this.props.roomObj.made_by}`}</p>
        <input 
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button
          className={this.state.correct}
          onClick={() => this.join()}
        >Join</button>
      </div>
    )
  }
}

export default connect(null, {joinRoom})(RoomCard)