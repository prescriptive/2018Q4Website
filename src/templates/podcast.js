import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import SEO from "../components/seo"
import BackgroundImage from "gatsby-background-image"
import Img from "gatsby-image"
import { linkResolver } from "../utils/linkResolver"
import { RichText, Date } from "prismic-reactjs"
import { withPreview } from "gatsby-source-prismic"
import BgImageHat from "../images/podcasthat.png"
import PodcastTeaser from "../components/entities/podcast/PodcastTeaser"
import BasicSectionSlice from "../components/slices/BasicSectionSlice"
import LeftRightSlice from "../components/slices/LeftRightSlice"
import ColumnsSectionSlice from "../components/slices/ColumnsSectionSlice"
import "../components/scss/blocks/podSubscribe.scss"
import AudioPlayer from "react-h5-audio-player"
import { RHAP_UI } from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons"
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons"
const AudioFileStyle = styled.span`
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
  .pod-image {
    text-align: center;
  }
  .pod-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .pod-left {
      width: calc(60% - 20px);
      @media (max-width: ${variable.mobileWidth}) {
        width: calc(100%);
        margin-bottom: 60px;
      }
    }
    .pod-right {
      width: calc(40% - 20px);
      text-align: right;
      @media (max-width: ${variable.mobileWidth}) {
        width: calc(100%);
        text-align: left;
      }
      img {
        max-width: 100%;
      }
    }
  }
  .pod-image-desc {
    img {
      float: left;
      width: 200px;
      margin: 0px 20px 10px 0px;
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
    justify-content: space-between;
    flex-wrap: wrap;
    > article {
      width: calc(100% / 3 - 10px);
      margin-bottom: 40px;
      @media (max-width: ${variable.tabletWidth}) {
        width: calc(100% / 2 - 10px);
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
    margin-bottom: 20px;
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
    console.log(slice)
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

const Podcast = props => {
  const podcastUrl = props.data.page.audio_url
  const podcasts = props.data.podcast
  const subscribeBlock = props.data.subscribeBlock.data.body
  const contactBlock = props.data.contactBlock.data.body
  const bg = props.data.bgImage.childImageSharp.fluid
  console.log(props)

  return (
    <Layout>
      {/* <SEO site={site} page={node} /> */}
      <PodHeader>
        <BackgroundImage Tag="section" fluid={bg}>
          <Container>
            <div className="pod-header-container">
              <h1>{props.data.page.title}</h1>
            </div>
          </Container>
        </BackgroundImage>
      </PodHeader>
      <PodcastStyle>
        <Container>
          <div className="pod-container">
            <div className="pod-left">
              <div className="pod-date">{props.data.page.published_at}</div>
              <div className="pod-top-summary">{props.data.page.summary}</div>
              <AudioFileStyle>
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
                  customIcons={{
                    rewind: <FontAwesomeIcon icon={faUndoAlt} />,
                    forward: <FontAwesomeIcon icon={faRedoAlt} />,
                  }}
                  // other props here
                />
              </AudioFileStyle>
              <h2>Show Notes</h2>
              <div className="pod-image-desc">
                <img src={props.data.page.artwork_url} />
                <div
                  className="pod-descs"
                  dangerouslySetInnerHTML={{
                    __html: props.data.page.description,
                  }}
                />
              </div>
            </div>
            <div className="pod-right">
              <img src={BgImageHat} />
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
              <PodcastTeaser post={post} key={index}></PodcastTeaser>
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
  query PodcastById($id: String!) {
    bgImage: file(relativePath: { eq: "podcast.webp" }) {
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
      }
    }
    page: buzzsproutPodcastEpisode(id: { eq: $id }) {
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
