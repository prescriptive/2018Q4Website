import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../container"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import Tooltip from "@material-ui/core/Tooltip"
import Fade from "@material-ui/core/Fade"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import * as variable from "../variables"
// import MobileMenu from "../mobileMenu"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { withPreview } from "gatsby-source-prismic-graphql"

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: variable.medLightGray,
    padding: "10px 20px",
    fontSize: theme.typography.pxToRem(16),
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
  background-color: ${variable.offWhite};
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 24px;
    padding-bottom: 24px;
  }
  .logo {
    max-width: 293px;
    width: 293px;
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
    li {
      list-style: none;
      margin-right: 50px;
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
            color: white;
          }
          &[aria-current] {
            color: white !important;
          }
        }
      }
      a {
        text-decoration: none;
        color: ${variable.medLightGray};
        font-size: 18px;
        text-transform: uppercase;
        font-weight: 400;
        &:hover {
          color: ${variable.red};
        }
        &[aria-current] {
          color: ${variable.red};
        }
      }
    }
  }
  @media (max-width: ${variable.tabletWidth}) {
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
    menuitem.items[0].sub_nav_link_label.text != "" &&
    menuitem.items[0].sub_nav_link_label.text != "Dummy"
  ) {
    return (
      <HtmlTooltip
        TransitionComponent={Fade}
        interactive
        classes="tooltip"
        id="the-tooltip"
        title={
          <React.Fragment>
            {menuitem.items.map((submenuitem, index) => (
              <div key={index}>
                {console.log(submenuitem)}
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
                    to={submenuitem.relative_link.text}
                  >
                    {submenuitem.sub_nav_link_label.text}
                  </Link>
                )}
              </div>
            ))}
          </React.Fragment>
        }
      >
        <Link activeStyle={activeStyle} to={menuitem.primary.link.url}>
          {menuitem.primary.label.text}
        </Link>
      </HtmlTooltip>
    )
  } else {
    if (menuitem.primary.link.url != "") {
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

const query2 = graphql`
  query menu {
    allPrismicSiteInformation {
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
`

export const Header = () => (
  <StaticQuery
    query={query2}
    render={withPreview(data => {
      const nav = data.allPrismicSiteInformation.nodes[0].data.nav
      const logo =
        data.allPrismicSiteInformation.nodes[0].data.logo.localFile
          .childImageSharp.fluid
      var twitter = null
      if (data.allPrismicSiteInformation.nodes[0].data.twitter) {
        var twitter = data.allPrismicSiteInformation.nodes[0].data.twitter.url
      }
      // const classes = useStyles()
      return (
        <HeaderStyle className="header">
          {twitter && (
            <div className="header-social-container">
              <Container>
                <div className="social-container">
                  <a href={twitter} target="_blank" rel="noreferrer">
                    {/* <FontAwesomeIcon icon={faTwitter} /> */}
                  </a>
                </div>
              </Container>
            </div>
          )}
          <Container className="header-container">
            <Link className="logo" to="/">
              <Img fluid={logo} />
            </Link>
            {/* <div className="mobile-menu-container">{<MobileMenu />}</div> */}
            <ul className="main-menu">
              {nav.map((menuitem, index) => (
                <li key={index}>{menuRender(menuitem)}</li>
              ))}
            </ul>
          </Container>
        </HeaderStyle>
      )
    }, query2)}
  />
)

export default Header
