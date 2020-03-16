import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import HtmlRender from "../../utils/htmlSerializer"
import linkResolver from "../../utils/linkResolver"
import { RichText } from "prismic-reactjs"
import * as variable from "../variables"

const LeftRightStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  section {
    width: 50%;
    box-sizing: border-box;
    @media (max-width: ${variable.mobileWidth}) {
      width: 100%;
    }
  }
`

function returnLeft(primary) {
  return (
    <React.Fragment>
      {primary.left_background_image.fluid && (
        <BackgroundImage
          Tag="section"
          fluid={primary.left_background_image.fluid}
        >
          <Container>
            {primary.left_content && (
              <div
                className="section-content"
                dangerouslySetInnerHTML={{ __html: primary.left_content.html }}
              />
            )}
          </Container>
        </BackgroundImage>
      )}
      {!primary.left_background_image.fluid && (
        <section>
          <Container>
            {primary.left_content && (
              <div
                className="section-content"
                dangerouslySetInnerHTML={{ __html: primary.left_content.html }}
              />
            )}
          </Container>
        </section>
      )}
    </React.Fragment>
  )
}

function returnRight(primary) {
  return (
    <React.Fragment>
      {primary.right_background_image.fluid && (
        <BackgroundImage
          Tag="section"
          fluid={primary.right_background_image.fluid}
        >
          <Container>
            {primary.right_content && (
              <div
                className="section-content"
                dangerouslySetInnerHTML={{ __html: primary.right_content.html }}
              />
            )}
          </Container>
        </BackgroundImage>
      )}
      {!primary.right_background_image.fluid && (
        <section>
          <Container>
            {primary.right_content && (
              <div
                className="section-content"
                dangerouslySetInnerHTML={{ __html: primary.right_content.html }}
              />
            )}
          </Container>
        </section>
      )}
    </React.Fragment>
  )
}

export const LeftRightSlice = ({ slice }) => {
  return (
    <LeftRightStyle
      id={"id-" + slice.id}
      className="slice-wrapper slice-left-right"
    >
      {returnLeft(slice.primary)}
      {returnRight(slice.primary)}
    </LeftRightStyle>
  )
}

export default LeftRightSlice
