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
            <MobileContainer>
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
            </MobileContainer>
          </>
        )}
      />
    )
  }
}

export default Mobilemenu
