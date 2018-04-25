import React from 'react'
import './ChatCard.css'

function ChatCard(props) {
  var card
  if(props.currentUser === props.userObj.display_name) {
    card = (
      <div className="main">
        <div id="mainCard" className="ChatCard_message">
          <p>{props.userObj.message}</p>
        </div>
        <div className="ChatCard_user_img">
          <img src={props.userObj.img} alt=""/>
        </div>
      </div>
    )
  } else if('theServer' === props.userObj.display_name) {
    card = (
      <div className="server">
        <div id="serverCard" className="ChatCard_message">
          <p>{props.userObj.message}</p>
        </div>
      </div>
    )
  } else {
    card = (
      <div className="other">
        <div className="ChatCard_user_img">
          <img src={props.userObj.img} alt=""/>
        </div>
        <div id="otherCard" className="ChatCard_message">
          <p>{props.userObj.message}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="ChatCard">
      {card}
    </div>
  )
}

export default ChatCard