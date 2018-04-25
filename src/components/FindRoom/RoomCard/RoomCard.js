import React from 'react'
import './RoomCard.css'
import { Link } from 'react-router-dom'

function RoomCard(props) {
  return (
    <div className="RoomCard">
      <p>{`Room Name: ${props.roomObj.name}`}</p>
      <p>{`Created By: ${props.roomObj.made_by}`}</p>
      <Link to="/dashboard"><button>Join</button></Link>
    </div>
  )
}

export default RoomCard