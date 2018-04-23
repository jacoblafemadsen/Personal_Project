import React from 'react'
import './ChatCard.css'

function ChatCard(props) {
  return (
    <div className="ChatCard">
      <div className="ChatCard_user_img">

      </div>
      <div className="ChatCard_message">
        <p>{props.message}</p>
      </div>
    </div>
  )
}

export default ChatCard