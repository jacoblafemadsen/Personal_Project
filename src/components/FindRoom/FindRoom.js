import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class FindRoom extends Component {
  render() {
    return (
      <div className="FindRoom">
        <Link to='/dashboard'><button>DashBoard</button></Link>
      </div>
    );
  }
}

export default FindRoom;