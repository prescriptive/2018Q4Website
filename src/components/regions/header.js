import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../container"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import * as variable from "../variables"
import MobileMenu from "../mobileMenu"
import thetwittericon from "../../images/twitter.png"
import linkedinicon from "../../images/LinkedIN.png"
import logowhite from "../../images/logo-white.png"
const HeaderStyle = styled.header`
  background-color: rgba(0,0,0,0.31);
  position:absolute;
  z-index:9;
  width:100%;
  .header-social-container {
    background-color: ${variable.darkGray};
    @media (max-width: ${variable.tabletWidth}) {
      display: none;
    }
    .social-container {
      display: flex;
      justify-content: flex-end;
    }
    svg {
      font-size: 30px;
      path {
        color: white;
      }
    }
  }
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: ${variable.tabletWidth}) {
     height:50px;
    }
  }
  .logo {
    max-width: 190px;
    width: 190px;
    img {
      max-width: 100%;
    }
  }

  .mobile-menu-container {
    width: 55px;
    margin-left: 20px;
  }
  ul.main-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    margin-right:80px;
    li {
      list-style: none;
      margin-right: 50px;
      position: relative;
      &:last-child{
        margin-right:0px;
      }
      a {
        text-decoration: none;
        color: white;
        font-size: 18px;
        text-transform: uppercase;
        font-weight: 400;
        padding: 15px 0px;
        &:hover {
          color: ${variable.red};
        }
        &[aria-current] {
          color: ${variable.red};
        }
      }
      .sub-menu {
        display: none;
        background-color: rgba(0, 0, 0, 0.31);
        padding: 10px 20px 0px 20px;
        position: absolute;
        top: 37px;
        left: -20px;
        z-index: 100;
        border-radius: 2px;
        min-width: 145px;
        animation-duration: 4s;
        a {
          color: white;
          font-size: 16px;
          margin-bottom: 10px;
          display: block;
          text-transform: capitalize;
          padding: 0px;
          font-weight: 400;
          &:hover {
            color: ${variable.red};
          }
        }
      }
      &:hover .sub-menu {
        display: block;
      }
    }
  }
  .mobile-menu-container {
    display: none;
  }
  .social-holder{
    img{
      width:26px;
      height:26px;
    }
  }
  .menu-social-holder{
    display:flex;
    justify-content:space-between;
    align-items:center;
    @media (max-width: ${variable.tabletWidth}) {
      display:none;
    }
  }
  @media (max-width: ${variable.tabletWidth}) {
    .mobile-menu-container {
      display: block;
    }
    ul.main-menu {
      display: none;
    }
  }
`
const activeStyle = {
  color: variable.red,
}

function menuRender(menuitem) {
  if (
    menuitem.items[0].sub_nav_link_label.text !== "" &&
    menuitem.items[0].sub_nav_link_label.text !== "Dummy"
  ) {
    return (
      <div>
        <Link activeStyle={activeStyle} to={menuitem.primary.link.url}>
          {menuitem.primary.label.text}
        </Link>
        <div className="sub-menu">
          {menuitem.items.map((submenuitem, index) => (
            <div key={index}>
              {submenuitem.sub_nav_link.url && (
                <Link
                  activeStyle={activeStyle}
                  to={submenuitem.sub_nav_link.url}
                >
                  {submenuitem.sub_nav_link_label.text}
                </Link>
              )}
              {submenuitem.relative_link.text && (
                <Link
                  activeStyle={activeStyle}
                  to={"/" + submenuitem.relative_link.text}
                >
                  {submenuitem.sub_nav_link_label.text}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    if (menuitem.primary.link.url !== "") {
      return (
        <Link activeStyle={activeStyle} to={menuitem.primary.link.url}>
          {menuitem.primary.label.text}
        </Link>
      )
    }
    if (menuitem.primary.relative_link) {
      return (
        <Link
          activeStyle={activeStyle}
          to={menuitem.primary.relative_link.text}
        >
          {menuitem.primary.label.text}
        </Link>
      )
    }
  }
}

export const Header = () => {
  const data = useStaticQuery(graphql`
    query menu {
      twittericon: file(relativePath: { eq: "tweeticon.png" }) {
        childImageSharp {
          fixed(width: 30, height: 24) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
      site: allPrismicSiteInformation {
        nodes {
          data {
            nav {
              ... on PrismicSiteInformationNavNavItem {
                id
                items {
                  sub_nav_link {
                    url
                    link_type
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
  `)
  const nav = data.site.nodes[0].data.nav
  const logo = data.site.nodes[0].data.logo.localFile.childImageSharp.fluid
  const twittericon = data.twittericon.childImageSharp.fixed
  var twitter = null
  if (data.site.nodes[0].data.twitter) {
    twitter = data.site.nodes[0].data.twitter.url
  }
  return (
    <HeaderStyle className="header">
      <Container className="header-container">
        <Link className="logo" to="/">
          <img src={logowhite} alt="logo" />
        </Link>
        <div className="mobile-menu-container">{<MobileMenu />}</div>
        <div className="menu-social-holder">
        <ul className="main-menu">
          {nav.map((menuitem, index) => (
            <li key={index}>{menuRender(menuitem)}</li>
          ))}
        </ul>
        <div className="social-holder">
        <a target="_blank" href="https://www.linkedin.com/company/prescriptive.solutions"
        ><img src={linkedinicon}/></a>
        <a target="_blank" href="https://twitter.com/PDS_Technology"
        style={{
          marginLeft:"10px",
        }}
        ><img src={thetwittericon}/></a>
        </div>
        </div>
      </Container>
    </HeaderStyle>
  )
}

export default Header
