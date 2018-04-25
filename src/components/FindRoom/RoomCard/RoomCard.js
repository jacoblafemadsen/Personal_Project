import React from 'react'
import './RoomCard.css'
import { connect } from 'react-redux'
import { joinRoom } from '../../../ducks/video_reducer'
import { Link } from 'react-router-dom'

function RoomCard(props) {
  return (
    <div className="RoomCard">
      <p>{`Room Name: ${props.roomObj.name}`}</p>
      <p>{`Created By: ${props.roomObj.made_by}`}</p>
      <Link to="/dashboard">
        <button
          onClick={() => props.joinRoom({user_id: props.userId, room_id: props.roomObj.id})}
        >Join</button>
      </Link>
    </div>
  )
}

export default connect(null, {joinRoom})(RoomCard)