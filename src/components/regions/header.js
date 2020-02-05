import PropTypes, { nominalTypeHack } from "prop-types"
import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../container"
// import Container from "../container"
// import * as variable from "../variables"
// import MobileMenu from "../mobilemenu"
// import BackgroundImage from "gatsby-background-image"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import Zoom from "@material-ui/core/Zoom"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import * as variable from "../variables"

// const HtmlTooltip = withStyles(theme => ({
//   tooltip: {
//     backgroundColor: "#f5f5f9",
//     color: "rgba(0, 0, 0, 0.87)",
//     padding: 20,
//     fontSize: theme.typography.pxToRem(12),
//     border: "1px solid #dadde9",
//   },
// }))(Tooltip)

// const useStyles = makeStyles(theme => ({
//   button: {
//     fontSize: 18,
//     color: variable.gray,
//     textDecoration: "none",
//     paddingTop: 10,
//     paddingBottom: 10,
//     display: "block",
//   },
// }))

// const HeaderStyle = styled.header`
//   padding: 20px 0px;
//   .header-container {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     align-items: center;
//   }
//   .logo {
//     width: 300px;
//   }
//   ul.main-menu {
//     width: calc(100% - 500px);
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     align-items: center;
//     li {
//       list-style: none;
//       a {
//         text-decoration: none;
//         color: ${variable.gray};
//         font-size: 18px;
//       }
//     }
//   }
// `
// function menuRender(menuitem) {
//   if (menuitem.primary.link.uid == "home") {
//     return <Link to={"/"}>{menuitem.primary.label.text}</Link>
//   } else {
//     return (
//       <Link to={menuitem.primary.link.uid}>{menuitem.primary.label.text}</Link>
//     )
//   }
// }
// export const Header = () => {
//   const data = useStaticQuery(graphql`
//     query {
//       nav: allPrismicMainNavigation {
//         nodes {
//           data {
//             nav {
//               primary {
//                 link {
//                   uid
//                 }
//                 label {
//                   text
//                 }
//               }
//               items {
//                 sub_nav_link {
//                   uid
//                 }
//                 sub_nav_link_label {
//                   text
//                 }
//               }
//             }
//           }
//         }
//       }
//       logo: file(relativePath: { eq: "logo.png" }) {
//         childImageSharp {
//           fluid(maxWidth: 600) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//     }
//   `)
//   const nav = data.nav.nodes[0].data.nav
//   const logo = data.logo.childImageSharp.fluid
//   const classes = useStyles()
//   return (
//     <HeaderStyle className="header">
//       <Container className="header-container">
//         <Link className="logo" to="/">
//           <Img fluid={logo} />
//         </Link>
//         <ul className="main-menu">
//           {nav.map((menuitem, index) => (
//             <li key={index}>
//               {menuitem.items[0].sub_nav_link && (
//                 <HtmlTooltip
//                   TransitionComponent={Zoom}
//                   interactive
//                   title={
//                     <React.Fragment>
//                       {menuitem.items.map((submenuitem, index) => (
//                         <div key={index}>
//                           <Link
//                             className={classes.button}
//                             to={submenuitem.sub_nav_link.uid}
//                           >
//                             {submenuitem.sub_nav_link_label.text}
//                           </Link>
//                         </div>
//                       ))}
//                     </React.Fragment>
//                   }
//                 >
//                   {menuRender(menuitem)}
//                 </HtmlTooltip>
//               )}
//               {!menuitem.items[0].sub_nav_link && menuRender(menuitem)}
//             </li>
//           ))}
//         </ul>
//       </Container>
//     </HeaderStyle>
//   )
// }

// export default Header
