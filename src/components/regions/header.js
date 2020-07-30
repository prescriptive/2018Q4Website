// import PropTypes, { nominalTypeHack } from "prop-types"
// import React from "react"
// import { Link } from "gatsby"
// import styled from "styled-components"
// import Container from "../container"
// import BackgroundImage from "gatsby-background-image"
// import { withStyles, makeStyles } from "@material-ui/core/styles"
// import Button from "@material-ui/core/Button"
// import Tooltip from "@material-ui/core/Tooltip"
// import Fade from "@material-ui/core/Fade"
// import { StaticQuery, graphql } from "gatsby"
// import Img from "gatsby-image"
// import * as variable from "../variables"
// import MobileMenu from "../mobileMenu"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faTwitter } from "@fortawesome/free-brands-svg-icons"
// import { withPreview } from "gatsby-source-prismic-graphql"

// const HtmlTooltip = withStyles(theme => ({
//   tooltip: {
//     backgroundColor: variable.medLightGray,
//     color: "rgba(0, 0, 0, 0.87)",
//     padding: 20,
//     fontSize: theme.typography.pxToRem(12),
//     border: "1px solid #dadde9",
//   },
// }))(Tooltip)

// const useStyles = makeStyles(theme => ({
//   button: {
//     fontSize: 18,
//     color: variable.medLightGray,
//     textDecoration: "none",
//     paddingTop: 10,
//     paddingBottom: 10,
//     display: "block",
//   },
// }))

// const HeaderStyle = styled.header`
//   .header-social-container {
//     background-color: ${variable.darkGray};
//     padding: 12px 0px;
//     @media (max-width: ${variable.tabletWidth}) {
//       display: none;
//     }
//     .social-container {
//       display: flex;
//       justify-content: flex-end;
//     }
//     svg {
//       font-size: 30px;
//       path {
//         color: white;
//       }
//     }
//   }
//   background-color: ${variable.offWhite};
//   .header-container {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding-top: 24px;
//     padding-bottom: 24px;
//   }
//   .logo {
//     max-width: 293px;
//     img {
//       max-width: 100%;
//     }
//   }

//   .mobile-menu-container {
//     width: 55px;
//     margin-left: 20px;
//   }
//   ul.main-menu {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     align-items: center;
//     padding: 0px;
//     li {
//       list-style: none;
//       margin-right: 50px;
//       &:last-child {
//         margin-right: 0px;
//         a {
//           background-color: ${variable.darkGray};
//           color: white;
//           padding: 15px 30px;
//           border-radius: 4px;
//           &:hover {
//             background-color: ${variable.medGray};
//             transition: all 0.3s ease;
//             color: white;
//           }
//           &[aria-current] {
//             color: white !important;
//           }
//         }
//       }
//       a {
//         text-decoration: none;
//         color: ${variable.medLightGray};
//         font-size: 18px;
//         text-transform: uppercase;
//         font-weight: 400;
//         &:hover {
//           color: ${variable.red};
//         }
//         &[aria-current] {
//           color: ${variable.red};
//         }
//       }
//     }
//   }
//   @media (max-width: ${variable.tabletWidth}) {
//     ul.main-menu {
//       display: none;
//     }
//   }
// `
// const activeStyle = {
//   color: variable.red,
// }

// function menuRender(menuitem) {
//   if (
//     menuitem.fields[0].sub_nav_link_label &&
//     menuitem.fields[0].sub_nav_link_label[0].text != "Dummy"
//   ) {
//     return (
//       <HtmlTooltip
//         TransitionComponent={Fade}
//         interactive
//         title={
//           <React.Fragment>
//             {menuitem.fields.map((submenuitem, index) => (
//               <div key={index}>
//                 <Link
//                   activeStyle={activeStyle}
//                   to={submenuitem.sub_nav_link.uid}
//                 >
//                   {submenuitem.sub_nav_link_label[0].text}
//                 </Link>
//               </div>
//             ))}
//           </React.Fragment>
//         }
//       >
//         <Link activeStyle={activeStyle} to={menuitem.primary.link.uid}>
//           {menuitem.primary.label[0].text}
//         </Link>
//       </HtmlTooltip>
//     )
//   } else {
//     if (menuitem.primary.link) {
//       return (
//         <Link activeStyle={activeStyle} to={menuitem.primary.link._meta.uid}>
//           {menuitem.primary.label[0].text}
//         </Link>
//       )
//     }
//     if (menuitem.primary.relative_link) {
//       return (
//         <Link
//           activeStyle={activeStyle}
//           to={menuitem.primary.relative_link[0].text}
//         >
//           {menuitem.primary.label[0].text}
//         </Link>
//       )
//     }
//   }
// }

// const query2 = graphql`
//   query menu {
//     prismic {
//       allSite_informations {
//         edges {
//           node {
//             logo
//             twitter {
//               ... on PRISMIC__ExternalLink {
//                 _linkType
//                 url
//               }
//             }
//             nav {
//               ... on PRISMIC_Site_informationNavNav_item {
//                 type
//                 label
//                 fields {
//                   sub_nav_link {
//                     ... on PRISMIC_Pa {
//                       title
//                       meta_title
//                       _meta {
//                         uid
//                       }
//                       _linkType
//                     }
//                     ... on PRISMIC__ExternalLink {
//                       _linkType
//                       url
//                     }
//                   }
//                   sub_nav_link_label
//                 }
//                 primary {
//                   relative_link
//                   link {
//                     ... on PRISMIC__ExternalLink {
//                       _linkType
//                       url
//                     }
//                     _linkType
//                     ... on PRISMIC_Pa {
//                       title
//                       meta_title
//                       _meta {
//                         uid
//                       }
//                     }
//                   }
//                   label
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `

// export const Header = () => (
//   <StaticQuery
//     query={query2}
//     render={withPreview(data => {
//       const nav = data.prismic.allSite_informations.edges[0].node.nav
//       const logo = data.prismic.allSite_informations.edges[0].node.logo.url
//       var twitter = null
//       if (data.prismic.allSite_informations.edges[0].node.twitter) {
//         var twitter =
//           data.prismic.allSite_informations.edges[0].node.twitter.url
//       }
//       // const classes = useStyles()
//       return (
//         <HeaderStyle className="header">
//           {twitter && (
//             <div className="header-social-container">
//               <Container>
//                 <div className="social-container">
//                   <a href={twitter} target="_blank" rel="noreferrer">
//                     <FontAwesomeIcon icon={faTwitter} />
//                   </a>
//                 </div>
//               </Container>
//             </div>
//           )}
//           <Container className="header-container">
//             <Link className="logo" to="/">
//               <img alt="logo home" src={logo} />
//             </Link>
//             <div className="mobile-menu-container">{<MobileMenu />}</div>
//             <ul className="main-menu">
//               {nav.map((menuitem, index) => (
//                 <li key={index}>{menuRender(menuitem)}</li>
//               ))}
//             </ul>
//           </Container>
//         </HeaderStyle>
//       )
//     }, query2)}
//   />
// )

// export default Header
