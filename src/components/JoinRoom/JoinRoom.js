import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class JoinRoom extends Component {
  render() {
    return (
      <div className="JoinRoom">
        <Link to='/create'><button>Create Room</button></Link>
        <Link to='/dashboard'><button>DashBoard</button></Link>
      </div>
    );
  }
}

export default JoinRoom;