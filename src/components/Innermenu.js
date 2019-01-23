import React from 'react'
import { Link } from 'gatsby'
import logo from '../images/Prescriptive-new-logo-resized.png'
import InnerMobilemenu from '../components/InnerMobilemenu'

const Innermenu= () => (
<div className="main-nav main-nav-inner">
<div className="container">
  <Link to="/" class="navbar-brand">
    <img style={{width: "355px"}} src={logo} alt="prescriptive" />
  </Link>
  <nav className="nav">
    <ul className="navigation-list">
      <li><Link to="/#header">Home</Link></li>
      <li><Link to="/#services">Services</Link></li>
      <li><Link to="/#about">About</Link></li>
      <li><Link to="/#contact-us" class="btn btn-sm">Contact</Link></li>
    </ul>
  </nav>

  <InnerMobilemenu />

</div>
</div>

)

export default Innermenu

