import React from "react"
import styled from "styled-components"
import Container from "../container"
import * as variable from "../variables"
import { Link } from "gatsby"

const FooterStyle = styled.footer`
  padding: 24px 0px;
  background-color: ${variable.darkGray};
  text-align: center;
  color: white;
  div {
    color: white;
    a{
      color:white;
    }
  }
`

export const Footer = () => {
  return (
    <FooterStyle>
      <Container className="footer-container">
      <div>
        &copy; {new Date().getFullYear()} Prescriptive Data Solutions
        </div>
        <div>
        <Link to="/prescriptive-data-solutions-llc-privacy-policy">Privacy Policy</Link>
        </div>
      </Container>
    </FooterStyle>
  )
}

export default Footer
