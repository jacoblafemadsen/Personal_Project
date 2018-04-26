import React from 'react'
import './QueueCard.css'

function QueueCard(props) {
  var card
  if(props.index === 0) {
    card = (
      <div className="QueueCard-card" id="currentVid">
        <div className="QueueCard-card-img">
          <img src={props.video.video_img} alt=""/>
        </div>
        <p>{props.video.name}</p>
      </div>
    )
  } else {
    card = (
      <div className="QueueCard-card" id="queueVid">
        <div className="QueueCard-card-img">
          <img src={props.video.video_img} alt=""/>
        </div>
        <p>{props.video.name}</p>
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