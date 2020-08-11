import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { linkResolver } from "../utils/linkResolver"
import { RichText, Date } from "prismic-reactjs"
import AudioPlayer from "react-h5-audio-player"
import { RHAP_UI } from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons"
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons"

const PodcastStyle = styled.div`
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

const Podcast = props => {
  // const prismicContent = props.data.prismic.allBlog_posts.edges[0]
  // if (!prismicContent) return null
  const node = props.data.page.data
  // const site = props.data.site.data
  // const defaultBlock = props.data.defaultBlock.data

  console.log(props)

  const podcastUrl = node.podcast.url
  console.log(RHAP_UI)
  // const defaultBlock = props.data.prismic.allBlocks.edges[0].node
  // const site = props.data.prismic.allSite_informations.edges[0].node

  return (
    <Layout>
      {/* <SEO site={site} page={node} /> */}
      <PodcastStyle>
        <Container>
          <h1>{node.title.text}</h1>
          <AudioPlayer
            progressJumpSteps={{
              forward: 15000,
              backward: 15000,
            }}
            layout="horizontal"
            customControlsSection={[RHAP_UI.VOLUME_CONTROLS]}
            customProgressBarSection={[
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.CURRENT_TIME,
              <div>/</div>,
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
          <RichText render={node.body.raw} linkResolver={linkResolver} />
        </Container>
      </PodcastStyle>
    </Layout>
  )
}

export default Podcast

export const podcastQuery = graphql`
  query PodcastBySlug($uid: String!) {
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
    page: prismicPodcast(uid: { eq: $uid }) {
      uid
      type
      data {
        title {
          text
        }
        body {
          raw
        }
        podcast {
          url
        }
      }
    }
  }
`
