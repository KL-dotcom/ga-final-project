import React from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'
import { isAuthenticated, logout } from '../../lib/auth'



const Navbar = () => {
  const history = useHistory()

  const handleLogout = () => {
    logout()
    history.push('/')
  }

  return (


    <div className="navbar">
      {/* <div className="navbar-content"> */}
      <div className="navbar-left">
        <Link to='/events' className="link">Events</Link>
        {isAuthenticated() && <Link to='/events/new' className="link">New Event</Link>}
        {/* {isAuthenticated() && <Link to='/events/attending' className="link">Attending</Link>} */}
      </div>
      <Link to='/' className="title">EVENTR</Link>
      <div className="navbar-right">
        {!isAuthenticated() && <Link to='/login' className="link">Login</Link>}
        {!isAuthenticated() && <Link to='/register' className="link">Register</Link>}
        {isAuthenticated() && <Link to='/profile' className="link">Profile</Link>}
        {isAuthenticated() && <span onClick={handleLogout} className="link">Logout</span>}
      </div>
      {/* </div> */}
      <div className="navbar-line"></div>
    </div>

  )
}



export default withRouter(Navbar)