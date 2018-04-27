import React from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import './QueueCard.css'

const socket = io()

function QueueCard(props) {
  var card
  if(props.index === 0) {
    card = (
      <div className="QueueCard-card" id="currentVid">
        <div className="QueueCard-card-img">
          <img src={props.video.video_img} alt=""/>
        </div>
        <p>{props.video.name}</p>
        <div className="QueueCard-user-img">
          <img src={props.video.user_img} alt=""/>
        </div>
      </div>
    )
  } else {
    card = (
      <div className="QueueCard-card" id="queueVid">
        <div className="QueueCard-card-img">
          <img src={props.video.video_img} alt=""/>
        </div>
        <p>{props.video.name}</p>
        <div className="QueueCard-btnImg">
          <button onClick={() => {
              axios.delete(`/api/queue/${props.video.id}`)
              socket.emit('remove message', {index: props.index, rooms_id: props.video.rooms_id})
            }
          }>X</button>
          <div className="QueueCard-user-img">
            <img src={props.video.user_img} alt=""/>
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