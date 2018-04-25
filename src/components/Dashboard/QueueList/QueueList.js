import React from 'react'
import './QueueList.css'

function QueueCard(props) {
  return (
    <div className="QueueList">
      <div className="Queue-card" id="currentVid">
        <div className="Queue-card-img">
          <img src={props.curVid.img} alt=""/>
        </div>
        <p>{props.curVid.name}</p>
      </div>
      {      
        props.vidArr.map(e => {
          return (
            <div className="Queue-card" id="queueVid">
              <div className="Queue-card-img">
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