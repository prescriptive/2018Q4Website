import styled from "styled-components"
import * as variable from "../components/variables"
const Container = styled.div`
  max-width: ${variable.desktopWidth};
  display: block;
  padding: 0px 5%;
  margin: 0 auto;
  box-sizing: content-box;
  @media (max-width: ${variable.tabletWidth}) {
    max-width: ${variable.tabletWidth};
  }
  @media (max-width: ${variable.mobileWidth}) {
    max-width: ${variable.mobileWidth};
  }
`

export default Container
