import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToQueue } from '../../../ducks/video_reducer'
import QueueList from './QueueList/QueueList'
import io from 'socket.io-client'
import plus from '../../../images/plus-white.svg'
import './Queue.css'

const socket = io('/queue-namespace')

class Queue extends Component {
  constructor() {
    super()
    this.state = {
      queueInput: ''
    }
    socket.on('queue response', data => {
      this.props.addToQueue(data)
    })
  }

  updateQueueInput(queueInput) {
    this.setState({queueInput})
  }
  emitQueue() {
    socket.emit('blast message', this.state.queueInput)
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
        <QueueList 
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
    videoQueue: state.videoQueue
  }
}

export default connect(mapStateToProps, {addToQueue})(Queue)