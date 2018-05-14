import React, { Component } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import letter from '../../../images/letter-white.svg'
import chatGuy from '../../../images/chat.svg'
import ChatCard from './ChatCard/ChatCard'
import './Chat.css'

const socket = io()

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      newMessage: ''
    }
  }
  componentDidMount(){
    socket.on(`chat-${this.props.user.rooms_id}`, data => {
      const messages = [data, ...this.state.messages]
      this.setState({messages})
    })
  }

  sendMessage() {
    if(this.state.newMessages !== '') {
      var obj = {
        rooms_id: this.props.user.rooms_id,
        id: this.props.user.id,
        display_name: this.props.user.display_name,
        img: this.props.user.img,
        color: this.props.user.color,
        message: this.state.newMessage
      }
      socket.emit('chat message', obj)
      this.setState({newMessage: ''})
    }
  }

  updateInput(newMessage) {
    this.setState({newMessage})
  }

  render() {
    const messages = this.state.messages.map((e, i) => {
      return (
        <ChatCard
          userObj={e}
          messageUser={e.id}
          currentUser={this.props.user.id}
          color={this.props.user.color}
        />
      )
    })
    return (
      <div 
        className="Chat" 
        style={{borderLeft: `10px solid ${this.props.user.color}`}}
      >
        <div className="Chat_messages_container">
          {messages[0] ? messages : <div className="Chat-chatGuy" style={{background: `${this.props.user.color}`}}><img src={chatGuy} alt=""/></div>}
        </div>
        <textarea
          spellCheck="true"
          className="Chat_input"
          type="text"
          value={this.state.newMessage}
          onChange={e => this.updateInput(e.target.value)}
        />
        <button
          style={{background: `${this.props.user.color}`}}
          className="Chat_send"
          onClick={() => this.sendMessage()}
        >
        <img src={letter} alt=""/>
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Chat)