import React, { Component } from 'react'
import io from 'socket.io-client'
import letter from '../../../images/letter-white.svg'
import ChatCard from './ChatCard/ChatCard'
import './Chat.css'

const socket = io('/chat-namespace')

class Chat extends Component {
  constructor() {
    super()
    this.state ={
      messages: [],
      newMessage: ''
    }
    socket.on('generate response', data => {
      const messages = [...this.state.messages, data]
      this.setState({messages})
    })
  }

  sendMessage() {
    socket.emit('blast message', this.state.newMessage)
    this.setState({newMessage: ''})
  }

  updateInput(newMessage) {
    this.setState({newMessage})
  }

  render() {
    const messages = this.state.messages.map(e => {
      return (
        <ChatCard 
          message={e}
        />
      )
    })
    return (
      <div className="Chat">
        <div className="Chat_messages_container">
        {messages}
        </div>
        <textarea
          spellCheck="true"
          className="Chat_input"
          value={this.state.newMessage}
          onChange={e => this.updateInput(e.target.value)}
        />
        <button
          className="Chat_send"
          onClick={() => this.sendMessage()}
        >
        <img src={letter}/>
        </button>
      </div>
    );
  }
}

export default Chat