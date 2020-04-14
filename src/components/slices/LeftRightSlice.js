import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import HtmlRender from "../../utils/htmlSerializer"
import linkResolver from "../../utils/linkResolver"
import { RichText } from "prismic-reactjs"
import * as variable from "../variables"
import Helmet from "react-helmet"

const LeftRightStyle = styled.div`
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

function returnLeft(primary) {
  return (
    <React.Fragment>
      {primary.left_background_image.localFile && (
        <BackgroundImage
          Tag="section"
          fluid={primary.left_background_image.localFile.childImageSharp.fluid}
        >
          <Container>
            {primary.left_content && (
              <div
                className="section-content"
                dangerouslySetInnerHTML={{ __html: primary.left_content.html }}
              />
            )}
            {primary.embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{ __html: primary.embed.text }}
              />
            )}
          </Container>
        </BackgroundImage>
      )}
      {!primary.left_background_image.localFile && (
        <section>
          <Container>
            {primary.left_content && (
              <div
                className="section-content"
                dangerouslySetInnerHTML={{ __html: primary.left_content.html }}
              />
            )}
            {primary.embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{ __html: primary.embed.text }}
              />
            )}
            {primary.active_campaign_form_number && (
              <div>
                <Helmet>
                  <script
                    src={
                      "https://prescriptivesolutions.activehosted.com/f/embed.php?id=" +
                      primary.active_campaign_form_number
                    }
                    type="text/javascript"
                    charset="utf-8"
                  ></script>
                </Helmet>
                <div
                  class={"_form_" + primary.active_campaign_form_number}
                ></div>
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
      {primary.right_background_image.localFile && (
        <BackgroundImage
          Tag="section"
          fluid={primary.right_background_image.localFile.childImageSharp.fluid}
        >
          <Container>
            {primary.right_content && (
              <div
                className="section-content"
                dangerouslySetInnerHTML={{ __html: primary.right_content.html }}
              />
            )}
            {primary.right_embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{ __html: primary.right_embed.text }}
              />
            )}
          </Container>
        </BackgroundImage>
      )}
      {!primary.right_background_image.localFile && (
        <section>
          <Container>
            {primary.right_content && (
              <div
                className="section-content"
                dangerouslySetInnerHTML={{ __html: primary.right_content.html }}
              />
            )}
            {primary.right_embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{ __html: primary.right_embed.text }}
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
      <div className="left-right-container">
        {returnLeft(slice.primary)}
        {returnRight(slice.primary)}
      </div>
    </LeftRightStyle>
  )
}

export default LeftRightSlice
