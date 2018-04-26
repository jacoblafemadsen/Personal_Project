import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToQueue } from '../../../ducks/video_reducer'
import QueueCard from './QueueCard/QueueCard'
import io from 'socket.io-client'
import plus from '../../../images/plus-white.svg'
import './Queue.css'

const socket = io()

class Queue extends Component {
  constructor() {
    super()
    this.state = {
      queueInput: ''
    }
  }
  componentDidMount() {
    socket.on(`queue-${this.props.user.rooms_id}`, data => {
      console.log(data)
      this.props.addToQueue(data)
    })
  }
  updateQueueInput(queueInput) {
    this.setState({queueInput})
  }
  emitQueue() {
    socket.emit('queue message', {rooms_id: this.props.user.rooms_id, queueInput: this.state.queueInput})
    this.setState({queueInput: ''})
  }

  render() {
    return (
      <div className="Queue">
        <div className="int-btn-container">
          <input
            className="Queue_input"
            value={this.state.queueInput}
            onChange={(e) => this.updateQueueInput(e.target.value)}
          />
          <button 
            className="Queue_add"
            onClick={() => this.emitQueue()}
          >
            <img src={plus} alt=""/>
          </button>
        </div>
        
        <h1>{`X6CXr-41SVA`}</h1>
        <QueueCard 
          curVid={this.props.currentVideo} 
          vidArr={this.props.videoQueue}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentVideo: state.currentVideo,
    videoQueue: state.videoQueue,
    user: state.user
  }
}

export default connect(mapStateToProps, {addToQueue})(Queue)