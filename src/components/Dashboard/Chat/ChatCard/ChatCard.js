import React from 'react'
import './ChatCard.css'

function ChatCard(props) {
  return (
    <div className="ChatCard">
      {
        props.currentUser === props.userObj.display_name
        ?
        <div className="main">
          <div id="mainCard" className="ChatCard_message">
            <p>{props.userObj.message}</p>
          </div>
          <div className="ChatCard_user_img">
            <img src={props.userObj.img} alt=""/>
          </div>
        </div>
        :
        <div className="other">
          <div className="ChatCard_user_img">
            <img src={props.userObj.img} alt=""/>
          </div>
          <div id="otherCard" className="ChatCard_message">
            <p>{props.userObj.message}</p>
          </div>
        </div>
      }
    </div>
  )
}

export default ChatCard