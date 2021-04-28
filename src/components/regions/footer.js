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
      display:block;
    }
  }
  .footer-flex{
    display:flex;
    justify-content:center;
    align-items:center;
    @media (max-width: ${variable.mobileWidth}) {
      flex-direction:column;
    }
    > div{
      margin-right:60px;
      @media (max-width: ${variable.mobileWidth}) {
        margin-right:0px;
        margin-bottom:10px;
      }
    }
  }
`

export const Footer = () => {
  return (
    <FooterStyle>
      <Container className="footer-container">
        <div className="footer-flex">
          <div>&copy; {new Date().getFullYear()} Prescriptive Data Solutions</div>
          <div className="privacy-link"><Link to="/prescriptive-data-solutions-llc-privacy-policy">Privacy Policy</Link></div>
        </div>
      </Container>
    </FooterStyle>
  )
}

export default Footer
