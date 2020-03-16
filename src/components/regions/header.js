import PropTypes, { nominalTypeHack } from "prop-types"
import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../container"
import BackgroundImage from "gatsby-background-image"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import Fade from "@material-ui/core/Fade"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import * as variable from "../variables"
import MobileMenu from "../mobilemenu"

var FA = require("react-fontawesome")

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: variable.medLightGray,
    color: "rgba(0, 0, 0, 0.87)",
    padding: 20,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip)

const useStyles = makeStyles(theme => ({
  button: {
    fontSize: 18,
    color: variable.medLightGray,
    textDecoration: "none",
    paddingTop: 10,
    paddingBottom: 10,
    display: "block",
  },
}))

const HeaderStyle = styled.header`
  .header-social-container {
    background-color: ${variable.darkGray};
    padding: 12px 0px;
    .social-container {
      display: flex;
      justify-content: flex-end;
    }
    .fa {
      color: white;
      font-size: 30px;
    }
  }
  .header-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding-top: 24px;
    padding-bottom: 24px;
  }
  .logo {
    width: 293px;
    img {
      max-width: 100%;
    }
  }
  ul.main-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    li {
      list-style: none;
      margin-right: 60px;
      &:last-child {
        margin-right: 0px;
        a {
          background-color: ${variable.darkGray};
          color: white;
          padding: 15px 30px;
          border-radius: 4px;
          &:hover {
            background-color: ${variable.medGray};
            transition: all 0.3s ease;
          }
        }
      }
      a {
        text-decoration: none;
        color: ${variable.medLightGray};
        font-size: 18px;
        text-transform: uppercase;
        font-weight: 400;
      }
    }
  }
  @media (max-width: ${variable.tabletWidth}) {
    ul.main-menu {
      display: none;
    }
  }
`
function menuRender(menuitem, classes) {
  console.log(menuitem)
  if (
    menuitem.items[0].sub_nav_link_label[0] &&
    menuitem.items[0].sub_nav_link_label[0].text != "Dummy"
  ) {
    return (
      <HtmlTooltip
        TransitionComponent={Fade}
        interactive
        title={
          <React.Fragment>
            {menuitem.items.map((submenuitem, index) => (
              <div key={index}>
                <Link
                  className={classes.button}
                  to={submenuitem.sub_nav_link.uid}
                >
                  {submenuitem.sub_nav_link_label[0].text}
                </Link>
              </div>
            ))}
          </React.Fragment>
        }
      >
        <Link to={menuitem.primary.link.uid}>
          {menuitem.primary.label[0].text}
        </Link>
      </HtmlTooltip>
    )
  } else {
    return (
      <Link to={menuitem.primary.link.uid}>
        {menuitem.primary.label[0].text}
      </Link>
    )
  }
}
export const Header = () => {
  const data = useStaticQuery(graphql`
    query {
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
                  url
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
            twitter {
              url
            }
          }
        }
      }
    }
  `)
  const nav = data.nav.nodes[0].data.nav
  const logo = data.logo.nodes[0].data.logo.url
  var twitter = null
  if (data.logo.nodes[0].data.twitter.url) {
    var twitter = data.logo.nodes[0].data.twitter.url
  }
  const classes = useStyles()
  return (
    <HeaderStyle className="header">
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />

      {twitter && (
        <div class="header-social-container">
          <Container>
            <div class="social-container">
              <a href={twitter}>
                <FA name="twitter" />
              </a>
            </div>
          </Container>
        </div>
      )}
      <Container className="header-container">
        <Link className="logo" to="/">
          <img src={logo} />
        </Link>
        <MobileMenu />
        <ul className="main-menu">
          {nav.map((menuitem, index) => (
            <li key={index}>{menuRender(menuitem, classes)}</li>
          ))}
        </ul>
      </Container>
    </HeaderStyle>
  )
}

export default Header
