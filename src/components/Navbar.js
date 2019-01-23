import React from 'react'
import { Link } from 'gatsby'
import logo from '../images/Prescriptive-new-logo-resized.png'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Mobilemenu from '../components/Mobilemenu'

const Navbar = () => (
<div className="main-nav main-nav-home">
<div className="container">
  <Link to="/" class="navbar-brand brander">
    <img style={{width: "355px"}} src={logo} alt="prescriptive" />
  </Link>
  <nav className="nav">
    <ul className="navigation-list">
      <li><AnchorLink offset='158' href="#header">Home</AnchorLink></li>
      <li><AnchorLink offset='158' href="#services">Services</AnchorLink></li>
      <li><AnchorLink offset='158' href="#about">About</AnchorLink></li>
      <li><AnchorLink offset='158' href="#contact-us" class="btn btn-sm">Contact</AnchorLink></li>
    </ul>
  </nav>

  <Mobilemenu />

</div>
</div>

)

export default Navbar

