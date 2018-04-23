import React, { Component } from 'react'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'
import io from 'socket.io-client'

const socket = io('/player-namespace')

class Player extends Component {
  constructor() {
    super()
    this.state = {
      currentTime: 0,
      playerCode: '',
      stateEvent: {}
    }
    socket.on('generate response', videoState => {
      console.log(this.state.stateEvent)
      switch (videoState) {
        case YouTube.PlayerState.UNSTARTED:
          this.setState({currentTime: this.state.stateEvent.getCurrentTime()});
          break;
        case YouTube.PlayerState.ENDED:
          this.setState({currentTime: this.state.stateEvent.getCurrentTime()});
          break;
        case YouTube.PlayerState.PLAYING:
          this.state.stateEvent.playVideo()
          this.setState({currentTime: this.state.stateEvent.getCurrentTime()});
          break;
        case YouTube.PlayerState.PAUSED:
          this.state.stateEvent.pauseVideo()
          this.setState({currentTime: this.state.stateEvent.getCurrentTime()});
          break;
        case YouTube.PlayerState.BUFFERING:
          this.setState({currentTime: this.state.stateEvent.getCurrentTime()});
          break;
        case YouTube.PlayerState.CUED:
          this.setState({currentTime: this.state.stateEvent.getCurrentTime()});
          break;
    }})
    this.putEventOnState = this.putEventOnState.bind(this)
  }
  emitPlayerStateChange(event) {
      socket.emit('blast message', event.data)
    
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
          onStateChange={this.emitPlayerStateChange}
          onReady={this.putEventOnState}
        />
        <h1>X6CXr-41SVA</h1>
        <h1>https://www.youtube.com/watch?v=sllAIF99h3s</h1>
        {`Current Time: ${this.state.currentTime}`}
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