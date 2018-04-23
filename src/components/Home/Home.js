import React, { Component } from 'react'
import logo from '../../images/vidgear3.svg'
import imgWheel from '../../images/image-wheel.svg'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home_banner">
          <div className="Home_img">
            
          </div>
          <div className="Home_logo">
            <img src={logo} alt="" draggable="false" />

          </div>
          <div className="Home_btns">
            <a href={process.env.REACT_APP_LOGIN}><button>Get started</button></a>
          </div>
        </div>
        <div className="Home_body">

        </div>
      </div>
    );
  }
}

export default Home;
