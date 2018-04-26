import React from 'react'
import './QueueCard.css'
//TODO:
function QueueCard(props) {
  return (
    <div className="QueueCard">
      <div className="QueueCard-card" id="currentVid">
        <div className="QueueCard-card-img">
          <img src={props.curVid.img} alt=""/>
        </div>
        <p>{props.curVid.name}</p>
      </div>
      {      
        props.vidArr.map(e => {
          return (
            <div className="QueueCard-card" id="queueVid">
              <div className="QueueCard-card-img">
                <img src={e.img} alt=""/>
              </div>
              <p>{e.name}</p>
            </div>
          )
        })
      }
    </div>  
  )
}

export default QueueCard