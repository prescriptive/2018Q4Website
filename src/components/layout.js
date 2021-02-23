import React from "react"
import PropTypes from "prop-types"
import Header from "../components/regions/header"
import Footer from "../components/regions/footer"
import "../components/scss/layout/layout.scss"

const Layout = ({ children, slug }) => {
  var pageId = ""
  if (slug) {
    pageId = slug
  }

  return (
    <div id={pageId}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
