import React from "react"
import { slide as Menu } from "react-burger-menu"
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
  li {
    font-size: 30px;
    font-weight: 600;
    margin: 0px 0px 20px 0px !important;
    padding: 0px;
    list-style: none;
    &:focus {
      outline: none !important;
    }
    a {
      display: block !important;
      text-align: center;
      color: #000000;
      text-decoration: none;
      &:focus {
        outline: none !important;
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
  @media (max-width: ${variable.tabletWidth}) {
    display: block;
    .bm-menu-wrap {
      top: 0px;
      width: 100% !important;
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
                onStateChange={state => this.handleStateChange(state)}
              >
                <li>
                  <Link to="/" onClick={() => this.toggleMenu()}>
                    <img src={data.logo.nodes[0].data.logo.url} />
                  </Link>
                </li>
                {data.nav.nodes[0].data.nav.map((menuitem, index) => (
                  <li key={index}>
                    <Link
                      activeStyle={{ color: variable.darkgray }}
                      to={menuitem.primary.link.uid}
                      onClick={() => this.toggleMenu()}
                    >
                      {menuitem.primary.label[0].text}
                    </Link>
                    {menuitem.items[0].sub_nav_link.uid && (
                      <ul className="sub-menu">
                        {menuitem.items.map((submenuitem, index) => (
                          <li key={index}>
                            <Link to={submenuitem.sub_nav_link.uid}>
                              {submenuitem.sub_nav_link_label[0].text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </Menu>
            </MobileContainer>
          </>
        )}
      />
    )
  }
}

export default Mobilemenu
