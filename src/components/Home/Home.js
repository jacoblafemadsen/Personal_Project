import React, { Component } from 'react'
import logoOuter from '../../images/synchronizedvid_logo_outer_ring.svg'
import logoInner from '../../images/synchronizedvid_logo_inner.svg'
import rings1 from '../../images/rings-one.svg'
import rings2 from '../../images/rings-two.svg'
import earthRing from '../../images/earth-ring.svg'
import login from '../../images/login-guy.svg'
import joinCreate from '../../images/join-create-guy.svg'
import queueGuy from '../../images/queue-guy.svg'
import chatGuy from '../../images/how-to-chat.svg'
import logoPlay from '../../images/logo-how-to-play.svg'
import laptopGuy from '../../images/laptop-guy.svg'
import phoneGuy from '../../images/phone-guy.svg'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home_first_fold">
          <div className="Home_top_bar">
            <div className="Home_top_bar_container">
              <div className="Home_logo">
                <img src={logoOuter} alt="" draggable="false" />
                <img src={logoInner} alt="" draggable="false" />
              </div>
              <div className="Home_btn">
                <a href={process.env.REACT_APP_LOGIN}><button>Let's get started</button></a>
              </div>
            </div>
          </div>
          <div className="Home_img">
            <div className="Home-laptop-guy">
              <img src={laptopGuy} alt="" draggable="false" />
            </div>
            <div className="Home_img_rings">
              <img src={rings1} id="ring1" alt="" draggable="false" />
              <img src={rings2} id="ring2" alt="" draggable="false" />
              <img src={earthRing} id="ringEarth" alt="" draggable="false" />
              <h1>Share and watch videos in real time, with your friends, family, coworkers, and peers</h1>
            </div>
            <div className="Home-phone-guy">
              <img src={phoneGuy} alt="" draggable="false" />
            </div>
          </div>
        </div>
        <div className="Home_body">

          <div className="Home_how_tol">
            <div className="Home_how_to_img">
              <img src={login} alt="" draggable="false" />
            </div>
            <div className="Home_how_to_textl">
              <h1>Login</h1>
              <p>You can either use your Google, Facebook, of Github account to login.</p>
            </div>
          </div>
          
          <div className="Home_how_tor">
            <div className="Home_how_to_textr">
              <h1>Room</h1>
              <p>Create a unique room and invite others by giving them the password, or join a room.</p>
            </div>
            <div className="Home_how_to_img">
              <img src={joinCreate} alt="" draggable="false" />
            </div>
          </div>

          <div className="Home_how_tol">
            <div className="Home_how_to_img">
              <img src={queueGuy} alt="" draggable="false" />
            </div>
            <div className="Home_how_to_textl">
              <h1>Queue videos</h1>
              <p>Copy a YouTube url, or video id, and paste it in the input to add a video to the queue.</p>
            </div>
          </div>

          <div className="Home_how_tor">
            <div className="Home_how_to_textr">
              <h1>Chat</h1>
              <p>Discuss what's happening, in the real time, while your watching.</p>
            </div>
            <div className="Home_how_to_img">
              <img src={chatGuy} alt="" draggable="false" />
            </div>
          </div>

          <div className="Home_how_tol">
            <div className="Home_how_to_img">
              <img src={logoPlay} alt="" draggable="false" />
            </div>
            <div className="Home_how_to_textl">
              <h1>Play</h1>
              <p>Press play and the first queued video will begin playing for everyone in the room, welcome to synchronized Vid.</p>
            </div>
          </div>

        </div>
        <div className="Home_footer">
          <div className="Home_footer_h1">
            <h1>Synchronized Vid</h1>
          </div>
          <div className="Home_footer_p">
            <p>Created by: Jacob Madsen</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
