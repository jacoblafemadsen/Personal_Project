import React, { Component } from 'react'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'
import { nextInQueue } from '../../../ducks/video_reducer'
import io from 'socket.io-client'

const socket = io('/player-namespace')

class Player extends Component {
  constructor() {
    super()
    this.state = {
      stateEvent: {}
    }
    socket.on('generate response', res => {
      res === 'play' ? this.play() : ''
      res === 'pause' ? this.pause() : ''
    })
    this.putEventOnState = this.putEventOnState.bind(this)

  }
  play() {
    this.state.stateEvent.playVideo()
  }
  pause() {
    this.state.stateEvent.pauseVideo()
  }
  emitPlayerStateChange(name) {
    socket.emit('broadcast message', name)
  }
  putEventOnState(event) {
    this.setState({stateEvent: event.target})
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
          videoId={this.props.currentVideo.id}
          opts={opts}         
          onEnd={() => this.props.nextInQueue()}
          onReady={e => this.putEventOnState(e)}
        />
        <button onClick={() => this.emitPlayerStateChange('pause')}>Pause</button>
        <button onClick={() => this.emitPlayerStateChange('play')}>Play</button>

        <h1>{`X6CXr-41SVA`}</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentVideo: state.currentVideo,
  }
}

export default connect(mapStateToProps, {nextInQueue})(Player)