import React from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import './QueueCard.css'

const socket = io()

function QueueCard(props) {
  var card
  if(props.index === 0) {
    card = (
      <div 
        className={props.hide ? "QueueCard-card-hide" : "QueueCard-card"}
      >
        <div className={props.hide ? "QueueCard-card-img-hide" : "QueueCard-card-img"}>
          <img src={props.video.video_img} alt="" style={{border: `3px solid ${props.color}`}}/>
        </div>
        <p>{props.video.name}</p>
        <div className={props.hide ? "QueueCard-btnImg-hide" : "QueueCard-btnImg"}>
          <div className={props.hide ? "QueueCard-user-img" : "QueueCard-user-img"}>
            <img src={props.video.img} alt=""/>
          </div>
        </div>
      </div>
    )
  } else {
    card = (
      <div className={props.hide ? "QueueCard-card-hide" : "QueueCard-card"}>
        <div className={props.hide ? "QueueCard-card-img-hide" : "QueueCard-card-img"}>
          <img src={props.video.video_img} alt=""/>
        </div>
        <p>{props.video.name}</p>
        <div className={props.hide ? "QueueCard-btnImg-hide" : "QueueCard-btnImg"}>
          <button onClick={() => {
              axios.delete(`/api/queue/${props.video.id}`)
              socket.emit('remove message', {index: props.index, rooms_id: props.rooms_id})
            }
          }>X</button>
          <div className={props.hide ? "QueueCard-user-img" : "QueueCard-user-img"}>
            <img src={props.video.img} alt=""/>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="QueueCard">
      {card}
    </div>
  )
}

export default QueueCard