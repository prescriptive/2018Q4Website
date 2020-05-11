import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import { RichText } from "prismic-reactjs"
import * as variable from "../variables"

const LeftRightStyle = styled.div`
  ._form {
    display: block;
  }
  .left-right-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  section {
    width: 50%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    &:nth-child(1) {
      justify-content: flex-end;
    }
    &:nth-child(2) {
      justify-content: flex-start;
    }
    @media (max-width: ${variable.mobileWidth}) {
      width: 100%;
    }
    > div {
      max-width: calc(${variable.desktopWidth} / 2);
      display: block;
      padding: 0px 20px;
      margin: 0;
      width: 100%;
      @media (max-width: ${variable.tabletWidth}) {
        max-width: calc(${variable.tabletWidth} / 2);
      }

      @media (max-width: ${variable.mobileWidth}) {
        max-width: calc(${variable.mobileWidth} / 1);
      }
    }
  }
  .section-embed {
    iframe {
      max-width: 100%;
    }
  }
`

export const addActive = id => {
  if (typeof window !== "undefined") {
    var script = document.createElement("script")
    script.type = "text/javascript"
    script.src =
      "https://prescriptivesolutions.activehosted.com/f/embed.php?id=" + id
    document.getElementsByTagName("head")[0].appendChild(script)
  }
}

function returnLeft(primary) {
  return (
    <React.Fragment>
      {primary.left_background_imageSharp && (
        <BackgroundImage
          Tag="section"
          fluid={primary.left_background_imageSharp.childImageSharp.fluid}
        >
          <Container>
            {primary.left_content && (
              <div className="section-content">
                {RichText.render(primary.left_content)}
              </div>
            )}
            {primary.embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{ __html: primary.embed[0].text }}
              />
            )}
          </Container>
        </BackgroundImage>
      )}
      {!primary.left_background_imageSharp && (
        <section>
          <Container>
            {primary.left_content && (
              <div className="section-content">
                {RichText.render(primary.left_content)}
              </div>
            )}
            {primary.embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{ __html: primary.embed[0].text }}
              />
            )}
            {primary.active_campaign_form_number && (
              <div class={"_form_" + primary.active_campaign_form_number}>
                {addActive(primary.active_campaign_form_number)}
              </div>
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
      {primary.right_background_imageSharp && (
        <BackgroundImage
          Tag="section"
          fluid={primary.right_background_imageSharp.childImageSharp.fluid}
        >
          <Container>
            {primary.right_content && (
              <div className="section-content">
                {RichText.render(primary.right_content)}
              </div>
            )}
            {primary.right_embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{
                  __html: primary.right_embed[0].text,
                }}
              />
            )}
          </Container>
        </BackgroundImage>
      )}
      {!primary.right_background_imageSharp && (
        <section>
          <Container>
            {primary.right_content && (
              <div className="section-content">
                {RichText.render(primary.right_content)}
              </div>
            )}
            {primary.right_embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{
                  __html: primary.right_embed[0].text,
                }}
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
    <LeftRightStyle>
      <div className="left-right-container">
        {returnLeft(slice.primary)}
        {returnRight(slice.primary)}
      </div>
    </LeftRightStyle>
  )
}

export default LeftRightSlice
