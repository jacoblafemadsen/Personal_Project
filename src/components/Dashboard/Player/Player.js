import React, { Component } from 'react'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'
import { nextInQueue, deleteVideo } from '../../../ducks/video_reducer'
import io from 'socket.io-client'

const socket = io()

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stateEvent: {},
      btnStatus: 'play' 
    }
    this.putEventOnState = this.putEventOnState.bind(this)
  }
  componentDidMount() {
    socket.on(`video-${this.props.user.rooms_id}`, res => {
      res === 'play' ? this.play() : ''
      res === 'pause' ? this.pause() : ''
      res === '-60' ? this.seekToLocation(-60) : ''
      res === '-10' ? this.seekToLocation(-10) : ''
      res === '10' ? this.seekToLocation(10) : ''
      res === '60' ? this.seekToLocation(60) : ''
      res === 'next' ? this.next() : ''
    })
  }

  emitPlayerStateChange(name) {
    socket.emit('video message', {rooms_id: this.props.user.rooms_id, name: name})
  }
  putEventOnState(event) {
    this.setState({stateEvent: event.target})
  }

  play() {
    this.state.stateEvent.playVideo()
    this.setState({btnStatus: 'pause'})
  }
  pause() {
    this.state.stateEvent.pauseVideo()
    this.setState({btnStatus: 'play'})
  }
  next() {
    this.setState({btnStatus: 'play'})
    this.props.deleteVideo(this.props.videoQueue[0].id)
    this.props.nextInQueue()
  }
  seekToLocation(num) {
    this.state.stateEvent.seekTo(this.state.stateEvent.getCurrentTime() + num)
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
        color: 'white',
        rel: 0,
        controls: 0,
        info: 0
      }
    };
    return (
      <div className="Player">
        <YouTube
          className='player'
          videoId={this.props.videoQueue[0] ? this.props.videoQueue[0].video_id : ''}
          opts={opts}         
          onEnd={() => this.next()}
          onReady={e => this.putEventOnState(e)}
        />
        <button onClick={() => {
          if(this.state.btnStatus === 'pause') {
            this.emitPlayerStateChange('pause')
          } else if (this.state.btnStatus === 'play') {
            this.emitPlayerStateChange('play')
          }
        }}>{this.state.btnStatus}</button>
        <button onClick={() => this.emitPlayerStateChange('-60')}>-60</button>
        <button onClick={() => this.emitPlayerStateChange('-10')}>-10</button>
        <button onClick={() => this.emitPlayerStateChange('10')}>10</button>
        <button onClick={() => this.emitPlayerStateChange('60')}>60</button>
        <button onClick={() => this.emitPlayerStateChange('next')}>next video</button>
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

export default connect(mapStateToProps, {nextInQueue, deleteVideo})(Player)