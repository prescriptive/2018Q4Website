import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../container"
import * as variable from "../variables"

const FooterStyle = styled.footer`
  padding: 24px 0px;
  background-color: ${variable.darkGray};
  text-align: center;
  color: white;
  div {
    color: white;
  }
`

export const Footer = () => {
  return (
    <FooterStyle>
      <Container className="footer-container">
        &copy; {new Date().getFullYear()} Prescriptive Data Solutions
      </Container>
    </FooterStyle>
  )
}

export default Footer
