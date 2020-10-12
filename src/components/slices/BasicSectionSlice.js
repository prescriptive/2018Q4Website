import styled from "styled-components"
import React from "react"
// import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import { RichText, Date } from "prismic-reactjs"
import { Link } from "gatsby"

// import { RichText } from "prismic-dom"
import YouTube from "react-youtube"
import ResponsiveEmbed from "react-responsive-embed"
import "../scss/block/defaultBlogCta.scss"
import linkResolver from "../../utils/linkResolver"
import BasicSectionSliceInner from "../slices/BasicSectionSlice"
import LeftRightSlice from "../slices/LeftRightSlice"
import * as variable from "../variables"
import prismicHtmlSerializer from "../../gatsby/htmlSerializer"
import { GatsbyImage as Img } from "@wardpeet/gatsby-image-nextgen/compat"

// const linkResolver = require("../../utils/linkResolver")

const BasicStyle = styled.div`
  .basic-outer {
    display: inline-block;
    overflow: hidden;
    position: relative;
    width: 100%;
    .basic-image {
      /* width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute !important; */
      position:inherit !important;
      > div{
        padding:0px !important;
      }
    img{
      z-index: -1;
      pointer-events: none;
      position: absolute !important;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
    }
    }
    .basic-slice-container {
      // position: absolute;
      // top: 0px;
      position: relative;
      z-index: 1;
    }
  }
  .video-container-outer {
    .video-container {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      min-height: 500px;

      video {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -100;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .video-content {
        position: relative;
        z-index: 1;
        h2 {
          color: white;
          text-align: center;
        }
      }
    }
  }
  .youtube-video-container {
    position: relative;
    &::after {
      display: block;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: rgba(0, 0, 0, 0.75);
    }
  }
  .sidebar-active {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width: ${variable.mobileWidth}) {
      flex-direction: column;
    }
    .section-content {
      width: calc(100% - 390px);
      @media (max-width: ${variable.mobileWidth}) {
        width: 100%;
      }
    }
    .sidebar {
      width: 350px;
      top: 60px;
      position: -webkit-sticky;
      position: sticky;
      -webkit-align-self: flex-start;
      -ms-flex-item-align: start;
      align-self: flex-start;
      @media (max-width: ${variable.mobileWidth}) {
        width: 100%;
        margin-top: 40px;
      }
      .section-container {
        width: 100%;
        padding: 0px;
        max-width: 100%;
      }
      .slice-wrapper {
        > div > div {
          border-radius: 10px;
        }
      }
      .basic-slice-container {
        width: 100%;
        max-width: 100%;
        padding: 0px;
        z-index: 2;
        section {
          padding: 35px;
          .section-content {
            width: 100%;
            p {
              a {
                text-decoration: underline;
              }
            }
            ul {
              margin: 0px;
              padding-left: 20px;
              li {
                margin-bottom: 3px;
                &:last-child() {
                  margin-bottom: 0px;
                }
                a {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }
`

const myCustomLink = (type, element, content, children, index) => (
  <Link key={element.data.id} to={linkResolver(element.data)}>
    {console.log(children)}
    <a>{content}</a>
  </Link>
)
// Sort and display the different slice options
const PostSlices = ({ slices }) => {
  return slices.map((slice, index) => {
    var sliceID = ""
    if (slice.primary) {
      if (slice.primary.slice_id != undefined) {
        var sliceID = slice.primary.slice_id.text
      }
    }

    const res = (() => {
      switch (slice.slice_type) {
        case "basic_section":
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-basic"
            >
              {<BasicSectionSliceInner slice={slice} />}
            </div>
          )

        case "left_right_section":
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-left-right"
            >
              {<LeftRightSlice slice={slice} />}
            </div>
          )

        default:
          return
      }
    })()
    return res
  })
}

export const BasicSectionSlice = ({ slice }) => {
  const videoOptions = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
    },
  }
  var font_color = null
  var fluid = null
  var bg_color = null
  var h1_title = false
  var bg_video = null
  var video_id = null
  var bg_video_image = false
  var sidebar = null
  var sidebarClass = ""
  if (slice.items != null) {
    if (slice.items[0].sidebar_block_reference.document != null) {
      sidebar = slice.items[0].sidebar_block_reference.document.data.body
      sidebarClass = "sidebar-active"
    }
  }
  if (slice.primary.background_image.localFile != null) {
    fluid = slice.primary.background_image.localFile.childImageSharp.fluid
  }
  if (slice.primary.background_video != null) {
    bg_video = slice.primary.background_video.url
  }
  if (slice.primary.youtube_background.embed_url != null) {
    var video_id = slice.primary.youtube_background.embed_url.split("v=")[1]
    var ampersandPosition = video_id.indexOf("&")
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition)
    }
  }
  if (
    slice.primary.background_video.id == null &&
    slice.primary.background_image.localFile == null &&
    slice.primary.youtube_background.embed_url == null
  ) {
    bg_video_image = true
  }
  if (slice.primary.background_color != null) {
    bg_color = slice.primary.background_color
  }
  if (slice.primary.font_color != null) {
    font_color = slice.primary.font_color
  }
  // if (slice.primary.h1_title != null) {
  //   h1_title = slice.primary.h1_title
  // }
  var theh1Title = null
  var theh2Title = null
  if (slice.primary.section_title && slice.primary.h1_title == true) {
    var theh1Title = slice.primary.section_title.text
  } else if (slice.primary.section_title && slice.primary.h1_title == false) {
    var theh2Title = slice.primary.section_title.text
  }
  // const content = slice.primary.content.raw.map(function(slice, index) {
  //   if (slice.type === "heading1") {
  //     return <h1>{RichText.render(slice)}</h1>
  //   }
  // })
  return (
    <BasicStyle>
      {fluid && (
        // <BackgroundImage
        //   Tag="section"
        //   fluid={fluid}
        //   style={{ backgroundColor: bg_color }}
        //   className={sidebarClass}
        // >
        <div className="basic-outer">
          <div className="basic-image-inner">
            <Img fluid={fluid} className="basic-image" />
          </div>
          <Container
            className="basic-slice-container"
            style={{ color: font_color }}
          >
            {theh1Title && <h1>{theh1Title}</h1>}
            {theh2Title && <h2>{theh2Title}</h2>}
            <div className="section-content">
              <RichText
                render={slice.primary.content.raw}
                linkResolver={linkResolver}
                htmlSerializer={prismicHtmlSerializer}
                // serializeHyperlink={myCustomLink}
              />
            </div>
            {sidebar && (
              <div class="sidebar">
                <PostSlices slices={sidebar} />
              </div>
            )}
          </Container>
        </div>
      )}
      {bg_video && (
        <div class="video-container-outer">
          <div class="video-container">
            <video
              autoplay="autoplay"
              loop="true"
              muted="true"
              playsinline="true"
              preload="auto"
              src={bg_video}
              type="video/mp4"
            ></video>
            <Container>
              <section>
                <div class="video-content">
                  <h2>Video Tag Example.</h2>
                </div>
              </section>
            </Container>
          </div>
        </div>
      )}
      {video_id && (
        <div class="youtube-video-container">
          <ResponsiveEmbed
            src={
              "https://www.youtube.com/embed/" +
              video_id +
              "?loop=1&autoplay=1&mute=1&showinfo=0&controls=0&rel=0&iv_load_policy=3&modestbranding=1&autohide=1&playlist=" +
              video_id
            }
          />
        </div>
      )}
      {bg_video_image && (
        <div style={{ backgroundColor: bg_color }}>
          <Container className="basic-slice-container">
            <section className={sidebarClass}>
              {theh1Title && <h1>{theh1Title}</h1>}
              {theh2Title && <h2>{theh2Title}</h2>}
              {slice.primary.content && (
                <div className="section-content">
                  <RichText
                    render={slice.primary.content.raw}
                    linkResolver={linkResolver}
                    htmlSerializer={prismicHtmlSerializer}
                  />
                </div>
              )}
              {sidebar && (
                <div class="sidebar">
                  <PostSlices slices={sidebar} />
                </div>
              )}
            </section>
          </Container>
        </div>
      )}
    </BasicStyle>
  )
}

export default BasicSectionSlice
