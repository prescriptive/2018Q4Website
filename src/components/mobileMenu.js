import React from "react"
// import { slide as Menu } from "react-burger-menu"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import * as variable from "../components/variables"

const MobileContainer = styled.div`
  display: none;
  position: relative;
  height: 30px;
  width: 55px;
  text-align: center;
  margin: 0px;
  padding: 0px;
  .dark-mode {
    display: flex !important;
    justify-content: center;
  }
  ul {
    padding-left: 0px;
  }
  li {
    font-size: 30px;
    font-weight: 600;
    margin: 0px 0px 20px 0px !important;
    padding: 0px;
    list-style: none;
    text-align: left;
    &:focus {
      outline: none !important;
    }
    a {
      display: block !important;
      text-align: left;
      color: ${variable.darkGray};
      text-decoration: none;
      font-size: 27px;
      &:focus {
        outline: none !important;
      }
      &.active {
        color: ${variable.red};
      }
    }
    ul {
      flex-direction: column;
      justify-content: center !important;
      width: 100% !important;
      margin: 0px;
      padding: 0px;
    }
  }
  .menu-container {
    padding: 40px 30px;
    &:focus {
      outline: none !important;
    }
    img {
      max-width: 150px;
    }
  }
  @media (max-width: ${variable.tabletWidth}) {
    display: block;
    .bm-menu-wrap {
      top: 0px;
    }
    .bm-overlay {
      left: 0;
      top: 0;
    }
    .bm-cross {
      background: #000000;
    }
    .bm-burger-bars {
      background: #000000;
      border-radius: 10px;
    }
    .bm-menu {
      background-color: rgba(255, 255, 255, 0.9);
    }
  }
  @media (max-width: ${variable.tabletWidth}) {
    display: block;
  }
`
const activeStyle = {
  color: variable.red,
}
const Wrapper = styled.div`
  * {
    box-sizing: border-box;
  }
`

const MenuToggle = styled.div`
  position: ${props => (props.open ? "fixed" : "relative")};
  z-index: 9999;
  width: 40px;
  height: 40px;
  transform: rotate(0deg);
  transition: all 0.25s ease-in;
  cursor: pointer;
  margin-left: auto;
  top: ${props => (props.open ? "28px" : "auto")};
  right: ${props => (props.open ? "20px" : "auto")};
  span {
    display: block;
    position: absolute;
    height: 7px;
    width: 100%;
    background: #000000;
    border-radius: 10px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: ${props =>
      props.open ? "all 0.25s ease-in" : "all 0.25s ease-out"};
  }
  span:nth-child(1) {
    top: ${props => (props.open ? "calc(50% - 3.5px)" : "10%")};
    transform-origin: left center;
  }
  span:nth-child(2) {
    top: ${props => (props.open ? 0 : "calc(50% - 3.5px)")};
    left: ${props => (props.open ? "calc(50% - 3.5px)" : null)};
    width: ${props => (props.open ? "7px" : null)};
    height: ${props => (props.open ? "100%" : null)};
    transform-origin: left center;
  }
  span:nth-child(3) {
    top: calc(90% - 8px);
    transform-origin: left center;
    width: ${props => (props.open ? 0 : null)};
    opacity: ${props => (props.open ? 0 : 1)};
  }
`

const RotateContainer = styled.div`
  height: 100%;
  width: 100%;
  transition: ${props =>
    props.open ? "all 0.25s ease-in-out" : "all 0.25s ease-in-out"};
  transform: ${props => (props.open ? "rotate(-45deg)" : "none")};
`

const MenuWrapper = styled.div`
  position: fixed;
  overflow: hidden;
  right: ${props => (props.open ? "0" : "-100%")};
  top: 0;
  z-index: 999;
  width: 100%;
  max-width: 240px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  transition: ${props =>
    props.open ? "all 0.25s ease-out" : "all 0.6s ease-out"};
  box-shadow: 0px 4px 20px -5px #e8e8e8;
  padding: 40px 30px;
  ul {
    padding-left: 0px;
  }
  li {
    font-size: 30px;
    font-weight: 600;
    margin: 0px 0px 20px 0px !important;
    padding: 0px;
    list-style: none;
    text-align: left;
    &:focus {
      outline: none !important;
    }
    a {
      display: block !important;
      text-align: left;
      color: ${variable.darkGray};
      text-decoration: none;
      font-size: 27px;
      &:focus {
        outline: none !important;
      }
      &.active {
        color: ${variable.red};
      }
    }
    ul {
      flex-direction: column;
      justify-content: center !important;
      width: 100% !important;
      margin: 0px;
      padding: 0px;
    }
  }
`

const SubMenuReturn = ({ submenuitem, index }) => {
  if (
    submenuitem.sub_nav_link_label.text != "Dummy" &&
    submenuitem.id != "undefined"
  ) {
    return (
      <li key={submenuitem.id}>
        <Link activeStyle={activeStyle} to={submenuitem.sub_nav_link.url}>
          {submenuitem.sub_nav_link_label.text}
        </Link>
      </li>
    )
  } else {
    return ""
  }
}
class Mobilemenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
    }
  }

  toggleMenu() {
    this.setState(state => ({ menuOpen: !state.menuOpen }))
  }
  // handleStateChange(state) {
  //   this.setState({ menuOpen: state.isOpen })
  // }

  // closeMenu() {
  //   this.setState({ menuOpen: false })
  // }

  // toggleMenu() {
  //   this.setState(state => ({ menuOpen: !state.menuOpen }))
  // }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allPrismicSiteInformation {
              nodes {
                data {
                  nav {
                    ... on PrismicSiteInformationNavNavItem {
                      id
                      items {
                        sub_nav_link {
                          id
                          link_type
                        }
                        sub_nav_link_label {
                          text
                        }
                      }
                      primary {
                        label {
                          text
                        }
                        link {
                          url
                          link_type
                        }
                        relative_link {
                          text
                        }
                      }
                    }
                  }
                  logo {
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 400) {
                          ...GatsbyImageSharpFluid_withWebp_tracedSVG
                        }
                      }
                    }
                  }
                  twitter {
                    url
                  }
                }
              }
            }
          }
        `}
        render={data => (
          <>
            <div id="mobile-menu-header">
              <div classnName="menu-container">
                <MenuToggle
                  onClick={() => this.toggleMenu()}
                  open={this.state.menuOpen}
                >
                  <RotateContainer open={this.state.menuOpen}>
                    <span />
                    <span />
                    <span />
                  </RotateContainer>
                </MenuToggle>
              </div>
            </div>
            <MenuWrapper open={this.state.menuOpen}>
              <div className="menu-wrap-inner" open={this.state.menuOpen}>
                <ul>
                  <li>
                    <Link
                      to="/"
                      activeClassName="active"
                      onClick={() => this.toggleMenu()}
                      activeStyle={activeStyle}
                    >
                      Home
                    </Link>
                  </li>
                  {data.allPrismicSiteInformation.nodes[0].data.nav.map(
                    (menuitem, index) => (
                      <li key={menuitem.id}>
                        {menuitem.primary.link.id && (
                          <Link
                            activeStyle={{ color: variable.darkgray }}
                            to={menuitem.primary.link.url}
                            onClick={() => this.toggleMenu()}
                            activeClassName="active"
                            activeStyle={activeStyle}
                          >
                            {menuitem.primary.label.text}
                          </Link>
                        )}
                        {!menuitem.primary.link.id && (
                          <Link
                            activeStyle={{ color: variable.darkgray }}
                            to={menuitem.primary.relative_link.text}
                            onClick={() => this.toggleMenu()}
                            activeClassName="active"
                            activeStyle={activeStyle}
                          >
                            {menuitem.primary.label.text}
                          </Link>
                        )}
                        {menuitem.items[0].sub_nav_link && (
                          <ul className="sub-menu">
                            {menuitem.items.map((submenuitem, index) => {
                              if (submenuitem.id) {
                                return (
                                  <SubMenuReturn
                                    submenuitem={submenuitem}
                                    index={index}
                                  />
                                )
                              }
                            })}
                          </ul>
                        )}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </MenuWrapper>
            {/* <MobileContainer>
              <Menu
                right
                noOverlay
                isOpen={this.state.menuOpen}
                width={240}
                onStateChange={state => this.handleStateChange(state)}
              >
                <div className="menu-container">
                  <ul>
                    <li>
                      <Link
                        to="/"
                        activeClassName="active"
                        onClick={() => this.toggleMenu()}
                        activeStyle={activeStyle}
                      >
                        Home
                      </Link>
                    </li>
                    {data.allPrismicSiteInformation.nodes[0].data.nav.map(
                      (menuitem, index) => (
                        <li key={menuitem.id}>
                          {menuitem.primary.link.id && (
                            <Link
                              activeStyle={{ color: variable.darkgray }}
                              to={menuitem.primary.link.url}
                              onClick={() => this.toggleMenu()}
                              activeClassName="active"
                              activeStyle={activeStyle}
                            >
                              {menuitem.primary.label.text}
                            </Link>
                          )}
                          {!menuitem.primary.link.id && (
                            <Link
                              activeStyle={{ color: variable.darkgray }}
                              to={menuitem.primary.relative_link.text}
                              onClick={() => this.toggleMenu()}
                              activeClassName="active"
                              activeStyle={activeStyle}
                            >
                              {menuitem.primary.label.text}
                            </Link>
                          )}
                          {menuitem.items[0].sub_nav_link && (
                            <ul className="sub-menu">
                              {menuitem.items.map((submenuitem, index) => {
                                if (submenuitem.id) {
                                  return (
                                    <SubMenuReturn
                                    submenuitem={submenuitem}
                                    index={index}
                                  />  
                                  )
                                }
                              })}
                            </ul>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </Menu>
            </MobileContainer> */}
          </>
        )}
      />
    )
  }
}

export default Mobilemenu
