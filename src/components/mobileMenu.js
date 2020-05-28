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
  if (submenuitem.sub_nav_link_label[0].text != "Dummy") {
    return (
      <li key={index}>
        <Link activeStyle={activeStyle} to={submenuitem.sub_nav_link._meta.uid}>
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
            nav: prismic {
              allSite_informations {
                edges {
                  node {
                    nav {
                      ... on PRISMIC_Site_informationNavNav_item {
                        type
                        label
                        fields {
                          sub_nav_link {
                            ... on PRISMIC_Pa {
                              title
                              meta_title
                              _meta {
                                uid
                              }
                              _linkType
                            }
                            ... on PRISMIC__ExternalLink {
                              _linkType
                              url
                            }
                          }
                          sub_nav_link_label
                        }
                        primary {
                          relative_link
                          link {
                            ... on PRISMIC__ExternalLink {
                              _linkType
                              url
                            }
                            _linkType
                            ... on PRISMIC_Pa {
                              title
                              meta_title
                              _meta {
                                uid
                              }
                            }
                          }
                          label
                        }
                      }
                    }
                  }
                }
              }
            }
            logo: prismic {
              allSite_informations {
                edges {
                  node {
                    logo
                    twitter {
                      ... on PRISMIC__ExternalLink {
                        _linkType
                        url
                      }
                    }
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
                    {data.nav.allSite_informations.edges[0].node.nav.map(
                      (menuitem, index) => (
                        <li key={index}>
                          {menuitem.primary.link && (
                            <Link
                              activeStyle={{ color: variable.darkgray }}
                              to={menuitem.primary.link._meta.uid}
                              onClick={() => this.toggleMenu()}
                              activeClassName="active"
                              activeStyle={activeStyle}
                            >
                              {menuitem.primary.label[0].text}
                            </Link>
                          )}
                          {!menuitem.primary.link && (
                            <Link
                              activeStyle={{ color: variable.darkgray }}
                              to={menuitem.primary.relative_link[0].text}
                              onClick={() => this.toggleMenu()}
                              activeClassName="active"
                              activeStyle={activeStyle}
                            >
                              {menuitem.primary.label[0].text}
                            </Link>
                          )}
                          {menuitem.fields[0].sub_nav_link && (
                            <ul className="sub-menu">
                              {menuitem.fields.map((submenuitem, index) => (
                                <SubMenuReturn
                                  submenuitem={submenuitem}
                                  index={index}
                                />
                              ))}
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
