import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/vidgear3.svg'
import imgWheel from '../../images/image-wheel.svg'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home_banner">
          <div className="Home_img">
            <img src={imgWheel} />
          </div>
          <div className="Home_logo">
            <img src={logo} alt="" draggable="false" />

          </div>
          <div className="Home_btns">
            <Link to='/create'><button>Create Room</button></Link>
            <Link to='/join'><button>Join Room</button></Link>
          </div>
        </div>
        <div className="Home_body">

        </div>
      </div>
    );
  }
}

export default Home;
