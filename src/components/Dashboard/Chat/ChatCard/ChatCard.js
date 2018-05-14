import React from 'react'
import './ChatCard.css'

function ChatCard(props) {
  var card
  console.log(props.messageUser)
  if(props.currentUser === props.messageUser) {
    card = (
      <div className="main">
        <div id="mainCard" className="ChatCard_message" style={{background: `${props.color}`}}>
          <p>{props.userObj.message}</p>
        </div>
        <div className="ChatCard_user_img">
          <img src={props.userObj.img} alt=""/>
        </div>
      </div>
    )
  } else {
    card = (
      <div className="other">
        <div className="ChatCard_user_img">
          <img src={props.userObj.img} alt=""/>
        </div>
        <div 
          id="otherCard"
          className="ChatCard_message"  
          style={{background: `${props.userObj.color}`}}
        >
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