import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import * as variable from "../components/variables"
import thetwittericon from "../images/twitter.png"
import linkedinicon from "../images/LinkedIN.png"
const activeStyle = {
  color: variable.red,
}

const MenuToggle = styled.div`
  position: ${props => (props.open ? "fixed" : "relative")};
  z-index: 9999;
  width: 40px;
  height: 40px;
  transform: rotate(0deg);
  transition: all 0.25s ease-in;
  cursor: pointer;
  margin-left: auto;
  top: ${props => (props.open ? "5px" : "auto")};
  right: ${props => (props.open ? "5%" : "auto")};
  span {
    display: block;
    position: absolute;
    height: 7px;
    width: 100%;
    background: white;
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
    top: ${props => (props.open ? 0 : "calc(50% - 4px)")};
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
  background-color: rgba(0, 0, 0, 0.31);
  transition: ${props =>
    props.open ? "all 0.25s ease-out" : "all 0.6s ease-out"};

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
      color: white;
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
  ul.sub-menu {
    padding: 0px;
    li {
      margin: 4px 0px 4px 0px !important;
      a {
        font-size: 16px;
      }
    }
  }
  .social-holder-mobile{
    img{
      width:26px;
      height:26px;
    }
  }
`

const SubMenuReturn = ({ submenuitem, index }) => {
  if (
    submenuitem.sub_nav_link_label.text !== "Dummy" &&
    submenuitem.id !== "undefined"
  ) {
    return (
      <li key={submenuitem.id}>
        {submenuitem.sub_nav_link.url && (
          <Link
            to={submenuitem.sub_nav_link.url}
            activeClassName="active"
            onClick={() => this.toggleMenu()}
            activeStyle={activeStyle}
          >
            {submenuitem.sub_nav_link_label.text}
          </Link>
        )}
        {submenuitem.relative_link.text && (
          <Link
            to={"/" + submenuitem.relative_link.text}
            activeClassName="active"
            onClick={() => this.toggleMenu()}
            activeStyle={activeStyle}
          >
            {submenuitem.sub_nav_link_label.text}
          </Link>
        )}
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
                          url
                        }
                        sub_nav_link_label {
                          text
                        }
                        relative_link {
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
                          id
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
              <div className="menu-container">
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
                            {menuitem.items
                              .filter(submenuitem => submenuitem.id !== null)
                              .map((submenuitem, index) => {
                                return (
                                  <SubMenuReturn
                                    key={index}
                                    submenuitem={submenuitem}
                                    index={index}
                                  />
                                )
                              })}
                          </ul>
                        )}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="social-holder-mobile">
              <a href="https://www.linkedin.com/company/prescriptive.solutions"
              ><img src={linkedinicon}/></a>
              <a href="https://twitter.com/PDS_Technology"
              style={{
                marginLeft:"10px",
              }}
              ><img src={thetwittericon}/></a>
              </div>
            </MenuWrapper>
          </>
        )}
      />
    )
  }
}

export default Mobilemenu
