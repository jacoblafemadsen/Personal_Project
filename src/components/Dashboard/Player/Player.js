import React, { Component } from 'react'
import YouTube from 'react-youtube'
import axios from 'axios'
import { connect } from 'react-redux'
import { nextInQueue } from '../../../ducks/video_reducer'
import vidgearLogo from '../../../images/synchronizedvid_logo1.svg'
import back60 from '../../../images/PlayerControls/back_60_button.svg'
import back10 from '../../../images/PlayerControls/back_10_button.svg'
import play_icon from '../../../images/PlayerControls/play_button.svg'
import pause_icon from '../../../images/PlayerControls/pause_button.svg'
import forward10 from '../../../images/PlayerControls/forward_10_button.svg'
import forward60 from '../../../images/PlayerControls/forward_60_button.svg'
import volumeMinus from '../../../images/PlayerControls/minus-volume-button.svg'
import volumePlus from '../../../images/PlayerControls/plus-volume-button.svg'
import nextVideo from '../../../images/PlayerControls/next-video-button.svg'
import mute_icon from '../../../images/PlayerControls/mute-volume-button.svg'
import unmute_icon from '../../../images/PlayerControls/unmute-volume-button.svg'
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
      mute: false,
      firstPlay: true
    }
    this.putEventOnState = this.putEventOnState.bind(this)
  }
  componentDidMount() {
    socket.on(`video-${this.props.user.rooms_id}`, res => {
      console.log(res.key)
      if(res.key === 'play') this.play()
      if(res.key === 'pause') this.pause()
      if(res.key === '-60') this.seekToLocation(-60 + res.payload)
      if(res.key === '-10') this.seekToLocation(-10 + res.payload)
      if(res.key === '10') this.seekToLocation(10 + res.payload)
      if(res.key === '60') this.seekToLocation(60 + res.payload)
      res.key === 'next' ? this.next() : ''
    })
  }

  emitPlayerStateChange(key, payload = -1) {
    socket.emit('video message', {rooms_id: this.props.user.rooms_id, key: key, payload: payload})
  }
  putEventOnState(event) {
    this.setState({stateEvent: event.target})
  }

  play() {
    this.state.stateEvent.playVideo()
    this.setState({btnStatus: 'pause', firstPlay: false})
  }
  pause() {
    this.state.stateEvent.pauseVideo()
    this.setState({btnStatus: 'play'})
  }
  next() {
    this.setState({btnStatus: 'play', firstPlay: true})
    axios.delete(`/api/queue/${this.props.videoQueue[0].id}`)
    this.props.nextInQueue()
  }
  seekToLocation(num) {
    this.state.stateEvent.seekTo(num)
  }

  render() {
    const opts = {
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
        <div className='Player-YouTube-container'>
          <YouTube
            className='Player-YouTube'
            videoId={this.props.videoQueue[0] ? this.props.videoQueue[0].video_id : ''}
            opts={opts}         
            onEnd={() => this.next()}
            onReady={e => this.putEventOnState(e)}
          />
          <div 
            className='Player-YouTube-overlay'
            onClick={() => {
              if(this.state.btnStatus === 'pause') {
                this.emitPlayerStateChange('pause')
              } else if (this.state.btnStatus === 'play') {
                this.emitPlayerStateChange('play')
              }
            }}
          >
            <div 
              className='Player-YouTube-overlay-icon-container'
            >
              <div className='Player-YouTube-overlay-icon'>
                <div 
                  className={this.state.btnStatus === 'play' && this.state.firstPlay === true ? 'Player-YouTube-overlay-icon-background' : 'dont-display-background'}
                  style={{background: `${this.props.user.color}`}}
                >
                </div>
                <img className={this.state.btnStatus === 'play' && this.state.firstPlay === true ? 'Player-YouTube-overlay-icon-img' : 'dont-display-img'} src={vidgearLogo} alt=""/>
              </div>
            </div>
          </div>
        </div>
        <div className="Player-controls-container">
          <div 
            className="Player-controls"
            style={{background: `${this.props.user.color}`}}
          >
            <button 
              onClick={() => {
                this.pause()
                this.emitPlayerStateChange('pause')
                this.emitPlayerStateChange('-60', this.state.stateEvent.getCurrentTime())
              }}>
              <img src={back60} alt=""/>
            </button>
            <button 
              onClick={() => {
                this.pause()
                this.emitPlayerStateChange('pause')
                this.emitPlayerStateChange('-10', this.state.stateEvent.getCurrentTime())
              }}>
              <img src={back10} alt=""/>
            </button>
            <button 
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
              onClick={() => {
                this.pause()
                this.emitPlayerStateChange('pause')
                this.emitPlayerStateChange('10', this.state.stateEvent.getCurrentTime())
              }}>
              <img src={forward10} alt=""/>
            </button>
            <button
              onClick={() => {
                this.pause()
                this.emitPlayerStateChange('pause')
                this.emitPlayerStateChange('60', this.state.stateEvent.getCurrentTime())
              }}>
              <img src={forward60} alt=""/>
            </button>
            <button 
              onClick={() => this.emitPlayerStateChange('next')}
            >
              <img src={nextVideo} alt=""/>
            </button>
            <button 
              onClick={() => {
                if(this.state.mute) {
                  this.state.stateEvent.unMute()
                  this.setState({mute: false})
                } else {
                  this.state.stateEvent.mute()
                  this.setState({mute: true})
                }
            }}
            >
              {this.state.mute ? <img src={mute_icon} alt=""/> : <img src={unmute_icon} alt=""/>}
            </button>
            <button 
              onClick={() => {
                var vol = this.state.stateEvent.getVolume() - 10
                if(vol >= 0) {
                  this.state.stateEvent.setVolume(vol)
                  this.setState({curVolume: vol})
                }
              }}
            >
              <img src={volumeMinus} alt=""/>
            </button>
            <div className="Player-current-volume">
              <p style={{color: `${this.props.user.color}`}}>{this.state.curVolume}</p>
            </div>
            <button 
              onClick={() => {
                var vol = this.state.stateEvent.getVolume() + 10
                if(vol <= 100) {
                  this.state.stateEvent.setVolume(vol)
                  this.setState({curVolume: vol})
                }
              }}
            >
              <img src={volumePlus} alt=""/>
            </button>
          </div>
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