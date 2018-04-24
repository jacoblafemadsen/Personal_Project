import React, { Component } from 'react'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'
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
        rel: 0
      }
    };
    return (
      <div className="Player">
        <YouTube
          className='player'
          videoId={this.props.currentVideoId}
          opts={opts}         
          onPlay={() => this.emitPlayerStateChange('play')}
          onPause={() => this.emitPlayerStateChange('pause')}
          onReady={ e => this.putEventOnState(e)}
        />
        <h1>{`X6CXr-41SVA`}</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentVideoId: state.currentVideoId
  }
}

export default connect(mapStateToProps)(Player)