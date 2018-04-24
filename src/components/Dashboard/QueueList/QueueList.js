import React from 'react'
import './QueueList.css'

function QueueCard(props) {
  var flag = true
  return (
    <div className="QueueList">
      <div className="Queue-card" id="currentVid">
        <img src={props.curVid.img} alt=""/>
        <p>{props.curVid.name}</p>
      </div>
      {      
        props.vidArr.map(e => {
          return (
            <div className="Queue-card" id="queueVid">
              <img src={e.img} alt=""/>
              <p>{e.name}</p>
            </div>
          )
        })
      }
      <div className="Queue-card" id="currentVid">
        <img src={props.curVid.img} alt=""/>
        <p>{props.curVid.name}</p>
      </div>
    </div>
  )
}

export default QueueCard