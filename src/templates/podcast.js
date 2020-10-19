import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import SEO from "../components/seo"
import BackgroundImage from "gatsby-background-image"
import Img from "gatsby-image"
import { linkResolver } from "../utils/linkResolver"
import prismicHtmlSerializer from "../gatsby/htmlSerializer"
import { RichText } from "prismic-reactjs"
import PodcastTeaser from "../components/entities/podcast/PodcastTeaser"
import BasicSectionSlice from "../components/slices/BasicSectionSlice"
import LeftRightSlice from "../components/slices/LeftRightSlice"
import ColumnsSectionSlice from "../components/slices/ColumnsSectionSlice"
import "../components/scss/blocks/podSubscribe.scss"
import AudioPlayer from "react-h5-audio-player"
import { RHAP_UI } from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faRedoAlt } from "@fortawesome/free-solid-svg-icons"
// import { faUndoAlt } from "@fortawesome/free-solid-svg-icons"
import ResponsiveEmbed from "react-responsive-embed"

const AudioFileStyle = styled.div`
  .listen {
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .rhap_rewind-button {
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      content: "15";
      color: ${variable.darkGray};
      font-size: 10px;
      position: absolute;
    }
    svg {
      font-size: 34px;
      color: ${variable.darkGray};
    }
  }
  .rhap_forward-button {
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      content: "15";
      color: black;
      font-size: 10px;
      position: absolute;
      color: ${variable.darkGray};
    }
    svg {
      font-size: 34px;
      color: ${variable.darkGray};
    }
  }
  .rhap_progress-bar-show-download {
    background-color: ${variable.lightGray};
  }
  .rhap_download-progress {
    background-color: ${variable.medGray};
  }
  .rhap_progress-filled {
    background-color: ${variable.red};
  }
  .rhap_progress-indicator {
    background: ${variable.red};
  }
  .rhap_controls-section {
    display: none;
  }
  @media (max-width: ${variable.mobileWidth}) {
    #rhap_current-time {
      display: none;
    }
    .rhap_time {
      display: none;
    }
    .slash {
      display: none;
    }
  }
`
const PodHeader = styled.div`
  margin-bottom: 40px;
  .pod-header-container {
    min-height: 360px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    h1 {
      color: white;
    }
  }
`
const PodcastStyle = styled.div`
  .slice-image {
    margin-top: 40px;
  }
  .slice-text {
    margin-top: 40px;
  }
  .pod-image {
    text-align: center;
  }
  .pod-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .pod-left {
      width: calc(100% - 420px);
      @media (max-width: ${variable.mobileWidth}) {
        width: calc(100%);
        margin-bottom: 0px;
      }
      h2 {
        margin: 0px 0px 0px 0px;
      }
      h2.show-notes {
        margin: 20px 0px 10px 0px;
      }
    }
    .pod-right {
      width: 390px;
      text-align: left;
      @media (max-width: ${variable.mobileWidth}) {
        width: calc(100%);
        text-align: left;
      }
      .pod-right-image-player {
        @media (max-width: ${variable.mobileWidth}) {
          display: flex;
          flex-direction: column-reverse;
        }
      }
      img {
        max-width: 100%;
        border-radius: 4px;
      }
    }
  }
  .pod-image-desc {
    .pod-image {
      float: left;
      width: 200px;
      margin: 0px 20px 10px 0px;
      @media (max-width: ${variable.mobileWidth}) {
        float: none;
        width: 100%;
        margin: 0px 0px 20px 0px;
      }
    }

    p {
      display: unset;
    }
  }
  .pod-top-summary {
    margin-top: 40px;
    margin-bottom: 60px;
  }
  .podcasts-container {
    display: flex;
    flex-wrap: wrap;
    > article {
      margin-bottom: 40px;
      width: calc((100%) / 3 - 14px);
      margin-right: 20px;
      &:nth-child(3n + 3) {
        margin-right: 0px;
      }
      @media (max-width: ${variable.tabletWidth}) {
        width: calc(100% / 2 - 10px);
        &:nth-child(3n + 3) {
          margin-right: 20px;
        }
        &:nth-child(2n + 2) {
          margin-right: 0px;
        }
      }
      @media (max-width: ${variable.mobileWidth}) {
        width: 100%;
        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
  }
  .subscribe-blocker {
    margin: 60px 0px;
  }
  .contact-blocker {
    padding: 60px 0px;
  }
  .rhap_container {
    margin-bottom: 0px;
    border: 0px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .rhap_rewind-button {
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      content: "15";
      color: ${variable.darkGray};
      font-size: 10px;
      position: absolute;
    }
    svg {
      font-size: 34px;
      color: ${variable.darkGray};
    }
  }
  .rhap_forward-button {
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      content: "15";
      color: black;
      font-size: 10px;
      position: absolute;
      color: ${variable.darkGray};
    }
    svg {
      font-size: 34px;
      color: ${variable.darkGray};
    }
  }
  .rhap_progress-bar-show-download {
    background-color: ${variable.lightGray};
  }
  .rhap_download-progress {
    background-color: ${variable.medGray};
  }
  .rhap_progress-filled {
    background-color: ${variable.red};
  }
  .rhap_progress-indicator {
    background: ${variable.red};
  }
  .pod-above-title {
    font-weight: bold;
  }
  .top-pod-title-date {
    display: none;
    @media (max-width: ${variable.mobileWidth}) {
      display: block;
    }
  }
  .bottom-pod-above-title {
    font-weight: bold;
    display: block;
    @media (max-width: ${variable.mobileWidth}) {
      display: none;
    }
  }
  .pod-date {
    margin-bottom: 10px;
    margin-top: 5px;
  }
  .video-title {
    font-weight: bold;
  }
  .left-player {
    display: none;
    @media (max-width: ${variable.mobileWidth}) {
      display: block;
      h2 {
        margin-top: 20px !important;
        margin-bottom: 10px !important;
      }
    }
  }
  .right-player {
    display: block;
    @media (max-width: ${variable.mobileWidth}) {
      display: none;
    }
    h2 {
      margin: 0px 0px 20px 0px;
    }
  }
`

// Sort and display the different slice options
const PostSlices = ({ slices, blog, leadership, job }) => {
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
              {<BasicSectionSlice slice={slice} />}
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

        case "columns_section":
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-left-right"
            >
              {<ColumnsSectionSlice slice={slice} />}
            </div>
          )

        default:
          return
      }
    })()
    return res
  })
}

// Sort and display the different slice options
const SidebarSlices = ({ sidebar }) => {
  return sidebar.map((slice, index) => {
    console.log(slice)
    const res = (() => {
      switch (slice.slice_type) {
        case "image":
          return (
            <div key={index} className="slice-wrapper slice-image">
              <Img
                fluid={slice.primary.image.localFile.childImageSharp.fluid}
              />
            </div>
          )

        case "text":
          return (
            <div key={index} className="slice-wrapper slice-text">
              <RichText
                render={slice.primary.text.raw}
                linkResolver={linkResolver}
                htmlSerializer={prismicHtmlSerializer}
              />
            </div>
          )

        default:
          return
      }
    })()
    return res
  })
}

export const VideoSlice = ({ video }) => {
  var video_id = video.embed_url.split("v=")[1]
  var ampersandPosition = video_id.indexOf("&")
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition)
  }
  return (
    <div style={{ padding: "20px 0px 0px 0px" }}>
      <ResponsiveEmbed src={"https://www.youtube.com/embed/" + video_id} />
    </div>
  )
}

const Podcast = props => {
  const podcastUrl = props.data.page.audio_url
  const podcasts = props.data.podcast
  const subscribeBlock = props.data.subscribeBlock.data.body
  const contactBlock = props.data.contactBlock.data.body
  const bg = props.data.bgImage.childImageSharp.fluid
  const allPodInfo = props.data.allpodinfo.nodes
  const site = props.data.site
  var podDesc = ""
  if (props.data.podinfo) {
    var podInfo = props.data.podinfo.data
    if (podInfo.podcast_image.localFile) {
      var podInfoImage = podInfo.podcast_image.localFile.childImageSharp.fluid
      var podInfoImageUrl = podInfo.podcast_image.url
    }
    if (podInfo.youtube_embed) {
      var podInfoYoutube = podInfo.youtube_embed
    }
    if (podInfo.body) {
      var podInfoSidebar = podInfo.body
    }
    if (podInfo.meta_description.text) {
      var podDesc = podInfo.meta_description.text
    } else {
      var podDesc = props.data.page.description.replace(/<[^>]*>/g, "")
      podDesc = podDesc.substring(0, 400) + "..."
    }
    console.log(podDesc)
  }
  const meta = {
    data: props.data.page,
    podimage: podInfoImageUrl,
    desc: podDesc,
  }

  return (
    <Layout>
      <SEO site={site} page={meta} />
      <PodHeader>
        {/* <BackgroundImage Tag="section" fluid={bg}> */}
        <Container>
          <div className="pod-header-container">
            <h1>{props.data.page.title}</h1>
          </div>
        </Container>
        {/* </BackgroundImage> */}
      </PodHeader>
      <PodcastStyle>
        <Container>
          <div className="pod-container">
            <div className="pod-left">
              <h2>Watch the Video</h2>
              {/* {podInfoYoutube && <VideoSlice video={podInfo.youtube_embed} />} */}
              <div className="left-player">
                <AudioFileStyle>
                  <h2>Listen to Audio</h2>

                  <AudioPlayer
                    progressJumpSteps={{
                      forward: 15000,
                      backward: 15000,
                    }}
                    layout="horizontal"
                    customControlsSection={[]}
                    customProgressBarSection={[
                      ,
                      RHAP_UI.MAIN_CONTROLS,
                      RHAP_UI.PROGRESS_BAR,
                      RHAP_UI.CURRENT_TIME,
                      <div className="slash">/</div>,
                      RHAP_UI.DURATION,
                    ]}
                    src={podcastUrl}
                    onPlay={e => console.log("onPlay")}
                    // customIcons={{
                    //   rewind: <FontAwesomeIcon icon={faUndoAlt} />,
                    //   forward: <FontAwesomeIcon icon={faRedoAlt} />,
                    // }}
                    // other props here
                  />
                </AudioFileStyle>
              </div>
              <h2 className="show-notes">Show Notes</h2>
              <div className="top-pod-title-date">
                <div className="pod-above-title">{props.data.page.title}</div>
                <div className="pod-date">{props.data.page.published_at}</div>
              </div>
              <div className="pod-image-desc">
                {podInfoImage && (
                  <div className="pod-image">
                    <Img fluid={podInfoImage} />
                  </div>
                )}
                <div className="bottom-pod-above-title">
                  {props.data.page.title} - {props.data.page.published_at}
                </div>
                <div
                  className="pod-descs"
                  dangerouslySetInnerHTML={{
                    __html: props.data.page.description,
                  }}
                />
              </div>
            </div>
            <div className="pod-right">
              <div className="pod-right-image-player">
                <div className="right-player">
                  <h2>Listen to Audio</h2>
                  <div className="player-image">
                    <img src={props.data.page.artwork_url} />

                    <AudioFileStyle
                      style={{ position: "relative", top: "-40px" }}
                    >
                      <AudioPlayer
                        progressJumpSteps={{
                          forward: 15000,
                          backward: 15000,
                        }}
                        layout="horizontal"
                        customControlsSection={[]}
                        customProgressBarSection={[
                          ,
                          RHAP_UI.MAIN_CONTROLS,
                          RHAP_UI.PROGRESS_BAR,
                          RHAP_UI.CURRENT_TIME,
                          <div className="slash">/</div>,
                          RHAP_UI.DURATION,
                        ]}
                        src={podcastUrl}
                        onPlay={e => console.log("onPlay")}
                        // customIcons={{
                        //   rewind: <FontAwesomeIcon icon={faUndoAlt} />,
                        //   forward: <FontAwesomeIcon icon={faRedoAlt} />,
                        // }}
                        // other props here
                      />
                    </AudioFileStyle>
                  </div>
                </div>
              </div>
              {podInfoSidebar && <SidebarSlices sidebar={podInfoSidebar} />}
            </div>
          </div>

          {/* <RichText render={props.data.page.description} linkResolver={linkResolver} /> */}
        </Container>

        <div className="subscribe-blocker">
          <PostSlices slices={subscribeBlock} />
        </div>

        <Container>
          <h2>Browse All Episodes</h2>
          <div class="podcasts-container">
            {podcasts.nodes.map((post, index) => (
              <PodcastTeaser
                post={post}
                key={index}
                podinfo={allPodInfo}
              ></PodcastTeaser>
            ))}
          </div>
        </Container>

        <div className="contact-blocker">
          <PostSlices slices={contactBlock} />
        </div>
      </PodcastStyle>
    </Layout>
  )
}

export default Podcast

export const podcastQuery = graphql`
  query PodcastById($buzzer: String!, $buzzId: String!) {
    bgImage: file(relativePath: { eq: "pod.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site: allPrismicSiteInformation {
      nodes {
        data {
          description {
            text
          }
          site_url {
            text
          }
          site_title {
            text
          }
          twitter_author {
            text
          }
        }
      }
    }
    contactBlock: prismicBlocks(
      id: { eq: "82cd060c-8d0b-5e93-b730-63abec35e126" }
    ) {
      data {
        body {
          ... on PrismicBlocksBodyLeftRightSection {
            id
            slice_type
            primary {
              active_campaign_form_number
              embed {
                raw
              }
              left_background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              left_content {
                html
                raw
              }
              right_background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              right_content {
                html
                raw
              }
              right_embed {
                raw
              }
              section_title {
                text
              }
              slice_id {
                text
              }
            }
          }
          ... on PrismicBlocksBodyColumnsSection {
            id
            slice_type
            primary {
              background_color
              background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              column_count
              font_color
              h1_title
              slice_id {
                text
              }
              section_title {
                text
              }
            }
            items {
              content {
                raw
              }
            }
          }
        }
      }
    }
    subscribeBlock: prismicBlocks(
      id: { eq: "cc6385d2-62fa-5b5a-a79c-70d3d5199b56" }
    ) {
      data {
        body {
          ... on PrismicBlocksBodyColumnsSection {
            id
            slice_type
            primary {
              background_color
              background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              column_count
              font_color
              h1_title
              slice_id {
                text
              }
              section_title {
                text
              }
            }
            items {
              content {
                raw
              }
            }
          }
        }
      }
    }
    podcast: allBuzzsproutPodcastEpisode {
      nodes {
        artwork_url
        artist
        audio_url
        description
        summary
        season_number
        title
        id
        published_at(formatString: "MMM D Y")
        tags
        slug
      }
    }
    allpodinfo: allPrismicPodcast {
      nodes {
        data {
          buzzsprout_id {
            text
          }
          podcast_image {
            url
            localFile {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
    podinfo: prismicPodcast(
      data: { buzzsprout_id: { text: { eq: $buzzId } } }
    ) {
      data {
        buzzsprout_id {
          text
        }
        podcast_image {
          url
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        title {
          text
        }
        meta_description {
          text
        }
        youtube_embed {
          embed_url
        }
        body {
          ... on PrismicPodcastBodyText {
            id
            slice_type
            primary {
              text {
                raw
              }
            }
          }
          ... on PrismicPodcastBodyImage {
            id
            slice_type
            primary {
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    page: buzzsproutPodcastEpisode(id: { eq: $buzzer }) {
      artwork_url
      artist
      audio_url
      description
      summary
      season_number
      title
      id
      published_at(formatString: "MMM D Y")
      tags
    }
  }
`
