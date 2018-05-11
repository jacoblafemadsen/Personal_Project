import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRoomQueue, addToQueue, deleteVideo, getUser } from '../../../ducks/video_reducer'
import axios from 'axios'
import QueueCard from './QueueCard/QueueCard'
import io from 'socket.io-client'
import plus from '../../../images/plus-black.svg'
import hamburger from '../../../images/hamburger-button.svg'
import './Queue.css'

const socket = io()

class Queue extends Component {
  constructor() {
    super()
    this.state = {
      queueInput: '',
      hide: true
    }
  }
  componentDidMount() {
    this.props.getUser()
    socket.on(`queue-${this.props.user.rooms_id}`, queue_id => {
      axios.get(`/api/queueitem/${queue_id}`).then(res => {
        this.props.addToQueue(res.data)
      })
    })
    socket.on(`remove-${this.props.user.rooms_id}`, data => {
      console.log(data)
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
          users_id: this.props.user.id,
          rooms_id: this.props.user.rooms_id
        }
        axios.post(`/api/queue`, obj).then(res => {
          socket.emit('queue message', {queue_id: res.data, rooms_id: this.props.user.rooms_id})
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
            key={e.video_id + i}
            video={e}
            index={i}
            rooms_id={this.props.user.rooms_id}
            color={this.props.user.color}
            hide={this.state.hide}
          />
        )
     })
    return (
      <div className={this.state.hide ? "Queue-hide" : "Queue"}>
        <div className={this.state.hide ? "Queue-title-button-hide" : "Queue-title-button"}>
          <div className="Queue-text">
            <p>Video Queue</p>
            <a href="https://www.youtube.com/" target="_blank" style={{color: `${this.props.user.color}`}}>Grab a video here</a>
          </div>
          <button
            style={{background: `${this.props.user.color}`}}
            onClick={() => this.setState({hide: !(this.state.hide)})}
          >
            <img src={hamburger} alt=""/>
          </button>
        </div>
        <div className={this.state.hide ? "int-btn-container-hide" : "int-btn-container"}>
          <input
            placeholder="YouTube video id or full url"
            className={this.state.hide ? "Queue_input-hide" : "Queue_input"}
            value={this.state.queueInput}
            onChange={(e) => this.updateQueueInput(e.target.value)}
          />
          <button 
            className={this.state.hide ? "Queue_add-hide" : "Queue_add"}
            style={{background: `${this.props.user.color}`}}
            onClick={() => this.emitQueue()}
          >
            <img src={plus} alt=""/>
          </button>
        </div>       
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

export default connect(mapStateToProps, {getRoomQueue, addToQueue, deleteVideo, getUser})(Queue)