import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CreateRoom extends Component {
  render() {
    return (
      <div className="CreateRoom">
        <Link to='/join'><button>Join Room</button></Link>
        <Link to='/dashboard'><button>DashBoard</button></Link>
      </div>
    );
  }
}

export default CreateRoom;