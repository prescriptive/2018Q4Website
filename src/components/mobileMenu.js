import React from "react"
import { slide as Menu } from "react-burger-menu"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import * as variable from "../components/variables"
import Container from "../components/container"

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
      // width: 100% !important;
      ul {
        margin-top: 10px;
        li {
          a {
            font-size: 14px !important;
          }
        }
      }
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
const SubMenuReturn = ({ submenuitem, index }) => {
  if (submenuitem.sub_nav_link_label[0].text != "Dummy") {
    return (
      <li key={index}>
        <Link to={submenuitem.sub_nav_link.uid}>
          {submenuitem.sub_nav_link_label[0].text}
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
    console.log(this)
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen })
  }

  closeMenu() {
    this.setState({ menuOpen: false })
  }

  toggleMenu() {
    this.setState(state => ({ menuOpen: !state.menuOpen }))
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query MobileMenuQuery {
            nav: allPrismicSiteInformation {
              nodes {
                data {
                  nav {
                    primary {
                      label {
                        text
                      }
                      relative_link {
                        text
                      }
                      link {
                        uid
                      }
                    }
                    items {
                      sub_nav_link {
                        uid
                      }
                      sub_nav_link_label {
                        text
                      }
                    }
                  }
                }
              }
            }
            logo: allPrismicSiteInformation {
              nodes {
                data {
                  logo {
                    url
                  }
                }
              }
            }
          }
        `}
        render={data => (
          <>
            <MobileContainer>
              <a href="#" className="bm-burger-button .hamburger-box"></a>
              <Menu
                right
                noOverlay
                isOpen={this.state.menuOpen}
                width={240}
                onStateChange={state => this.handleStateChange(state)}
              >
                <div className="menu-container">
                  <li>
                    <Link
                      to="/"
                      activeClassName="active"
                      onClick={() => this.toggleMenu()}
                    >
                      Home
                    </Link>
                  </li>
                  {data.nav.nodes[0].data.nav.map((menuitem, index) => (
                    <li key={index}>
                      {menuitem.primary.link.uid && (
                        <Link
                          activeStyle={{ color: variable.darkgray }}
                          to={menuitem.primary.link.uid}
                          onClick={() => this.toggleMenu()}
                          activeClassName="active"
                        >
                          {menuitem.primary.label[0].text}
                        </Link>
                      )}
                      {!menuitem.primary.link.uid && (
                        <Link
                          activeStyle={{ color: variable.darkgray }}
                          to={menuitem.primary.relative_link[0].text}
                          onClick={() => this.toggleMenu()}
                          activeClassName="active"
                        >
                          {menuitem.primary.label[0].text}
                        </Link>
                      )}
                      {menuitem.items[0].sub_nav_link.uid && (
                        <ul className="sub-menu">
                          {menuitem.items.map((submenuitem, index) => (
                            <SubMenuReturn
                              submenuitem={submenuitem}
                              index={index}
                            />
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </div>
              </Menu>
            </MobileContainer>
          </>
        )}
      />
    )
  }
}

export default Mobilemenu
