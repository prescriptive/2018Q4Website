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
import { withPreview } from "gatsby-source-prismic"
import { Media, Player, controls } from "react-media-player"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import BgImage from "../images/podcast.webp"
const { PlayPause, MuteUnmute } = controls
const PodHeader = styled.div`
  background-image: url(${BgImage});
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
.pod-image{
  img{
    max-width:300px;
  }
}
.pod-container{
  display:flex;
  justify-content:space-between;
  .pod-left{
    width:calc(50% - 20px);
  }
  .pod-right{
    width:calc(50% - 20px);
  }
}
.pod-image-desc{
  img{
    float:left;
    width:200px;
    margin:0px 20px 10px 0px;
  }
  p{
    display:unset;
  }
}
`
const Podcast = props => {

  console.log(props)

  const podcastUrl = props.data.page.audio_url

  return (
    <Layout>
      {/* <SEO site={site} page={node} /> */}
      <PodHeader>
        <Container>
          <div className="pod-header-container">
          <h1>{props.data.page.title}</h1>
          </div>
        </Container>
      </PodHeader>
      <PodcastStyle>
        <Container>
          <div className="pod-container">
          <div className="pod-left">
          <div className="pod-date">
          {props.data.page.published_at}
          </div>
          <div className="pod-summary">
          {props.data.page.summary}
          </div>
          <AudioPlayer
            src={podcastUrl}
            onPlay={e => console.log("onPlay")}
          />
          <h2>Show Notes</h2>
          <div className="pod-image-desc">
  <img src={props.data.page.artwork_url} />
            <div
  className="pod-descs"
  dangerouslySetInnerHTML={{ __html: props.data.page.description }}
/>
          </div>

          </div>
          <div className="pod-right">

          </div>
          </div>



          {/* <RichText render={props.data.page.description} linkResolver={linkResolver} /> */}
        </Container>
      </PodcastStyle>
    </Layout>
  )
}

export default Podcast

export const podcastQuery = graphql`
  query PodcastById($id: String!) {
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
