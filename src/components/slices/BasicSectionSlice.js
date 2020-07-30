import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import { Link, RichText, Date } from "prismic-reactjs"
import YouTube from "react-youtube"
import ResponsiveEmbed from "react-responsive-embed"
import "../scss/block/defaultBlogCta.scss"
import { linkResolver } from "../../utils/linkResolver"
import BasicSectionSliceInner from "../slices/BasicSectionSlice"
import LeftRightSlice from "../slices/LeftRightSlice"
import * as variable from "../variables"

const BasicStyle = styled.div`
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

// Sort and display the different slice options
const PostSlices = ({ slices }) => {
  console.log(slices)
  return slices.map((slice, index) => {
    var sliceID = ""
    if (slice.primary) {
      if (slice.primary.slice_id != undefined) {
        var sliceID = slice.primary.slice_id[0].text
      }
    }

    const res = (() => {
      switch (slice.type) {
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
  console.log(slice)
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
  if (slice.fields != null) {
    if (slice.fields[0].sidebar_block_reference != null) {
      console.log(slice.fields[0].sidebar_block_reference)
      sidebar = slice.fields[0].sidebar_block_reference.body
      sidebarClass = "sidebar-active"
    }
  }
  if (slice.primary.background_image.localFile != null) {
    fluid = slice.primary.background_image.localFile.childImageSharp.fluid
  }
  if (slice.primary.background_video.id != null) {
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
    slice.primary.background_image == null &&
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
  if (slice.primary.h1_title != null) {
    h1_title = slice.primary.h1_title
  }
  // const content = slice.primary.content.raw.map(function(slice, index) {
  //   if (slice.type === "heading1") {
  //     return <h1>{RichText.render(slice)}</h1>
  //   }
  // })
  return (
    <BasicStyle>
                {console.log(slice)}

      {fluid && (
        <BackgroundImage
          Tag="section"
          fluid={fluid}
          style={{ backgroundColor: bg_color }}
          className={sidebarClass}
        >
          <Container
            className="basic-slice-container"
            style={{ color: font_color }}
          >
            {slice.primary.section_title && h1_title && (
              <h1>{slice.primary.section_title[0].text}</h1>
            )}
            {slice.primary.section_title && !h1_title && (
              <h2>{slice.primary.section_title.text}</h2>
            )}
            <div className="section-content">
              <RichText
                render={slice.primary.content.raw}
                linkResolver={linkResolver}
              />
              
            </div>
            {sidebar && (
              <div class="sidebar">
                <PostSlices slices={sidebar} />
              </div>
            )}
          </Container>
        </BackgroundImage>
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
              {slice.primary.section_title && h1_title && (
                <h1>{slice.primary.section_title[0].text}</h1>
              )}
              {slice.primary.section_title && !h1_title && (
                <h2>{slice.primary.section_title[0].text}</h2>
              )}
              {slice.primary.content && (
                <div className="section-content">
                  <RichText
                    render={slice.primary.content}
                    linkResolver={linkResolver}
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
