import React, { Component } from 'react'
import YouTube from 'react-youtube'
import axios from 'axios'
import { connect } from 'react-redux'
import { nextInQueue } from '../../../ducks/video_reducer'
import back60 from '../../../images/PlayerControls/back_60_button.svg'
import back10 from '../../../images/PlayerControls/back_10_button.svg'
import play_icon from '../../../images/PlayerControls/play_button.svg'
import pause_icon from '../../../images/PlayerControls/pause_button.svg'
import forward10 from '../../../images/PlayerControls/forward_10_button.svg'
import forward60 from '../../../images/PlayerControls/forward_60_button.svg'
import volumeMinus from '../../../images/PlayerControls/minus-volume-button.svg'
import volumePlus from '../../../images/PlayerControls/plus-volume-button.svg'
import io from 'socket.io-client'
import './Player.css'

const socket = io()

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stateEvent: {},
      btnStatus: 'play',
      curVolume: 100,
      mute: false
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
    axios.delete(`/api/queue/${this.props.videoQueue[0].id}`)
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
        <div className="Player-controls">
          <button 
            style={{background: `${this.props.user.color}`}}
            onClick={() => this.emitPlayerStateChange('-60')}>
            <img src={back60} alt=""/>
          </button>
          <button 
            style={{background: `${this.props.user.color}`}}
            onClick={() => this.emitPlayerStateChange('-10')}>
            <img src={back10} alt=""/>
          </button>
          <button 
            style={{background: `${this.props.user.color}`}}
            onClick={() => {
              if(this.state.btnStatus === 'pause') {
                this.emitPlayerStateChange('pause')
              } else if (this.state.btnStatus === 'play') {
                this.emitPlayerStateChange('play')
              }
          }}>
            <img src={this.state.btnStatus === 'play' ? play_icon : pause_icon} alt=""/>
          </button>
          <button 
            style={{background: `${this.props.user.color}`}}
            onClick={() => this.emitPlayerStateChange('10')}>
            <img src={forward10} alt=""/>
          </button>
          <button
            style={{background: `${this.props.user.color}`}}
            onClick={() => this.emitPlayerStateChange('60')}>
            <img src={forward60} alt=""/>
          </button>
          <button 
            style={{background: `${this.props.user.color}`}}
            onClick={() => this.emitPlayerStateChange('next')}>next video</button>
          <button 
            style={{background: `${this.props.user.color}`}}
            onClick={() => {
              var vol = this.state.stateEvent.getVolume() - 20
              if(vol >= 0) {
                this.state.stateEvent.setVolume(vol)
                this.setState({curVolume: vol})
              }
            }}
          >
            <img src={volumeMinus} alt=""/>
          </button>
          <p>{this.state.curVolume}</p>
          <button 
            style={{background: `${this.props.user.color}`}}
            onClick={() => {
              var vol = this.state.stateEvent.getVolume() + 20
              if(vol <= 100) {
                this.state.stateEvent.setVolume(vol)
                this.setState({curVolume: vol})
              }
            }}
          >
            <img src={volumePlus} alt=""/>
          </button>
          <button 
            style={{background: `${this.props.user.color}`}}
            onClick={() => {
              if(this.state.mute) {
                this.state.stateEvent.unMute()
                this.setState({mute: false})
              } else {
                this.state.stateEvent.mute()
                this.setState({mute: true})
              }
          }}
          >{this.state.mute ? 'unmute' : 'mute'}</button>
        </div>
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

export default connect(mapStateToProps, {nextInQueue})(Player)