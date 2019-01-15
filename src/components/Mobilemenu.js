import React from 'react'
import logo from '../images/Prescriptive-new-logo-resized.png'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'gatsby'

const Mobilemenu = () => (
  <div className="mobile-container" style={{position: 'relative'}}>
  <a href="#" className="bm-burger-button .hamburger-box">
  </a>
  <Menu right>
        <AnchorLink offset='158' href="#header">Home</AnchorLink>
        <AnchorLink offset='158' href="#services">Services</AnchorLink>
        <AnchorLink offset='158' href="#about">About</AnchorLink>
        <Link to="/blog">Blog</Link>
        <AnchorLink offset='158' href="#contact-us" class="mobile-btn">Contact</AnchorLink>
  </Menu>
  </div>
)

export default Mobilemenu

