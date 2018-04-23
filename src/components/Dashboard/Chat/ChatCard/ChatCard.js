import React from 'react'
import './ChatCard.css'

function ChatCard(props) {
  return (
    <div className="ChatCard">
      <div className="ChatCard_user_img">
        <img src={props.userObj.img} alt=""/>
      </div>
      <div className="ChatCard_message">
        <p>{props.userObj.message}</p>
      </div>
    </div>
  )
}

export default ChatCard