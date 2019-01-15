import React from 'react'
import { Link } from 'gatsby'
const Topsocial = () => (
  <div class="global-nav">
<div class="container">
  <div class="navigation-top">
    
    <ul class="social">
      <li>
        <a href="https://twitter.com/PDS_Technology" target="_blank"><span class="icon-twitter"></span></a>
      </li>
    </ul>
    <ul class="global-list">
      <li><Link to="/blog">Blog</Link></li>
      {/* <li><Link to="#">Careers</Link></li> */}
    </ul> 
  </div>
</div>
</div>
)

export default Topsocial
