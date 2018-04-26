import React, { Component } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import letter from '../../../images/letter-white.svg'
import ChatCard from './ChatCard/ChatCard'
import './Chat.css'

const socket = io()

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state ={
      messages: [],
      newMessage: ''
    }
  }
  componentDidMount(){
    socket.on(`chat-${this.props.user.rooms_id}`, data => {
      const messages = [...this.state.messages, data]
      this.setState({messages})
    })
  }

  sendMessage() {
    socket.emit('chat message', {rooms_id: this.props.user.rooms_id, display_name: this.props.user.display_name, img: this.props.user.img, message: this.state.newMessage})
    this.setState({newMessage: ''})
  }

  updateInput(newMessage) {
    this.setState({newMessage})
  }

  render() {
    const messages = this.state.messages.map(e => {
      return (
        <ChatCard 
          userObj={e}
          currentUser={this.props.user.display_name}
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