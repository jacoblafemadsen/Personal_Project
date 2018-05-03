import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRoomQueue, addToQueue, deleteVideo } from '../../../ducks/video_reducer'
import axios from 'axios'
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
      this.props.addToQueue(data)
    })
    socket.on(`remove-${this.props.user.rooms_id}`, data => {
      this.props.deleteVideo(data)
    })
    axios.get(`/api/queue/${this.props.user.rooms_id}`).then(res => {
      this.props.getRoomQueue(res.data)
    })
  }
  emitQueue() {
    var vidId = this.state.queueInput
    vidId.length > 11 ? vidId = vidId.substr((vidId.search(/watch\?v=/) + 8), 11) : ''
    if(vidId.length === 11) {
      axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${vidId}&key=${process.env.REACT_APP_YOUTUBE}&part=snippet,statistics`).then(res => {
        var obj = {
          video_id: vidId, 
          video_name: res.data.items[0].snippet.localized.title,
          video_img: res.data.items[0].snippet.thumbnails.default.url,
          user: this.props.user
        }
        axios.post(`/api/queue`, obj).then(res => {
          socket.emit('queue message', res.data)
          this.setState({queueInput: ''})
        })
      })
    } else {
      this.setState({queueInput: ''})
    }
  }

  updateQueueInput(queueInput) {
    this.setState({queueInput})
  }

  render() {
     var queueArr = this.props.videoQueue.map((e, i) => {
        return (
          <QueueCard 
            video={e}
            index={i}
          />
        )
     })
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
        <h1>{`YENnaTK-sKs`}</h1>
        <h1>{`ZzCVqLjLhUY`}</h1>
        {queueArr}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    videoQueue: state.videoQueue,
    user: state.user
  }
}

export default connect(mapStateToProps, {getRoomQueue, addToQueue, deleteVideo})(Queue)