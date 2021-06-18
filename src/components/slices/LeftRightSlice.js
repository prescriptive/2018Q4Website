import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import { RichText } from "prismic-reactjs"
import * as variable from "../variables"
import linkResolver from "../../utils/linkResolver"
import prismicHtmlSerializer from "../../gatsby/htmlSerializer"
import Container from "../container"

const LeftRightStyle = styled.div`
  ._form {
    display: block;
  }
  .full-width-content{
    display: flex;
    z-index:1;
    /* width:${variable.desktopWidth}; */
    padding:30px 5%;
    max-width:${variable.desktopWidth};
  }
  .full-left-right{
    position: absolute;
    width: 100%;
    display: flex;
    height: 100%;
  }
  .full-width-content-inner{
      max-width: calc(50% - 20px);
      @media (max-width: ${variable.mobileWidth}) {
        max-width:100%;
      }
    }
  .left-right-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // max-width: ${variable.desktopWidth};
    // display: block;
    // padding: 0px 20px;
    margin: 0 auto;
    @media (max-width: ${variable.tabletWidth}) {
      max-width: ${variable.tabletWidth};
    }
    @media (max-width: ${variable.mobileWidth}) {
      max-width: ${variable.mobileWidth};
      padding: 0px 15px;
    }
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
  img {
    max-width: 100%;
    margin: 0 auto;
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

function returnLeft(primary, leftWidth) {
  return (
    <React.Fragment>
      {primary.left_background_image.localFile && (
        <BackgroundImage
          Tag="section"
          fluid={primary.left_background_image.localFile.childImageSharp.fluid}
        >
          <div
          // style={{
          //   width: "calc(" + variable.desktopWidth + " * ." + leftWidth + ")",
          // }}
          >
            {primary.left_content && (
              <div className="section-content">
                <RichText
                  render={primary.left_content.raw}
                  linkResolver={linkResolver}
                  htmlSerializer={prismicHtmlSerializer}
                />
              </div>
            )}
            {primary.embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{ __html: primary.embed.text }}
              />
            )}
          </div>
        </BackgroundImage>
      )}
      {!primary.left_background_image.localFile && (
        <section>
          <div
          // style={{
          //   width: "calc(" + variable.desktopWidth + " * ." + leftWidth + ")",
          // }}
          >
            {primary.left_content && (
              <div className="section-content">
                <RichText
                  render={primary.left_content.raw}
                  linkResolver={linkResolver}
                  htmlSerializer={prismicHtmlSerializer}
                />
              </div>
            )}
            {primary.embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{ __html: primary.embed.text }}
              />
            )}
            {primary.active_campaign_form_number && (
              <div className={"_form_" + primary.active_campaign_form_number}>
                {addActive(primary.active_campaign_form_number)}
              </div>
            )}
          </div>
        </section>
      )}
    </React.Fragment>
  )
}

function returnRight(primary, rightWidth) {
  return (
    <React.Fragment>
      {primary.right_background_image.localFile && (
        <BackgroundImage
          Tag="section"
          fluid={primary.right_background_image.localFile.childImageSharp.fluid}
        >
          <div
          // style={{
          //   width:
          //     "calc(" + variable.desktopWidth + " * ." + rightWidth + ")",
          // }}
          >
            {primary.right_content && (
              <div className="section-content">
                <RichText
                  linkResolver={linkResolver}
                  render={primary.right_content.raw}
                  htmlSerializer={prismicHtmlSerializer}
                />
              </div>
            )}
            {primary.right_embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{
                  __html: primary.right_embed.text,
                }}
              />
            )}
          </div>
        </BackgroundImage>
      )}
      {!primary.right_background_image.localFile && (
        <section>
          <div
          // style={{
          //   width:
          //     "calc(" + variable.desktopWidth + " * ." + rightWidth + ")",
          // }}
          >
            {primary.right_content && (
              <div className="section-content">
                {primary.right_content_above_form && (
                  <div className="content-above-form">
                    <RichText
                      render={primary.right_content_above_form.raw}
                      linkResolver={linkResolver}
                      htmlSerializer={prismicHtmlSerializer}
                    />
                  </div>
                )}
                {primary.right_active_campaign_form_number && (
                  <div
                    className={
                      "_form_" + primary.right_active_campaign_form_number
                    }
                  >
                    {addActive(primary.right_active_campaign_form_number)}
                  </div>
                )}
                <div className="right-content-lower">
                  <RichText
                    render={primary.right_content.raw}
                    linkResolver={linkResolver}
                    htmlSerializer={prismicHtmlSerializer}
                  />
                </div>
              </div>
            )}
            {primary.right_embed && (
              <div
                className="section-embed"
                dangerouslySetInnerHTML={{
                  __html: primary.right_embed.text,
                }}
              />
            )}
          </div>
        </section>
      )}
    </React.Fragment>
  )
}

function returnFull(slice, leftWidth, rightWidth) {
  console.log(slice.primary.full_width_content)
  if(slice.primary.full_width_content !== undefined){
    if(slice.primary.full_width_content.raw.length > 0){
      return (
        <React.Fragment>
        <Container className="full-width-content">
        <div className="full-width-content-inner">
        <RichText
          render={slice.primary.full_width_content.raw}
          linkResolver={linkResolver}
          htmlSerializer={prismicHtmlSerializer}
        />
        </div>
      </Container>
      <div className="full-left-right">
        {returnLeft(slice.primary, leftWidth)}
        {returnRight(slice.primary, rightWidth)}
        </div>
        </React.Fragment>
        )
    }
    else{
      return(
        <React.Fragment>
        {returnLeft(slice.primary, leftWidth)}
        {returnRight(slice.primary, rightWidth)}
        </React.Fragment>
      )
    }
  }
  else{
    return(
      <React.Fragment>
      {returnLeft(slice.primary, leftWidth)}
      {returnRight(slice.primary, rightWidth)}
      </React.Fragment>
    )
  }


}

export const LeftRightSlice = ({ slice }) => {
  var leftWidth = 50
  var rightWidth = 50
  if (slice.primary.right_width) {
    leftWidth = slice.primary.left_width
  }
  if (slice.primary.right_width) {
    rightWidth = slice.primary.right_width
  }
  return (
    <LeftRightStyle>

      <div className="left-right-container">
        {slice.primary.section_title.text && (
          <h2>{slice.primary.section_title.text}</h2>
        )}
        {returnFull(slice, leftWidth, rightWidth )}
        </div>
    </LeftRightStyle>
  )
}

export default LeftRightSlice
