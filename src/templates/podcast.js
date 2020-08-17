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

const { PlayPause, MuteUnmute } = controls
const PodcastStyle = styled.div`
.pod-image{
  img{
    max-width:300px;
  }
}
`

const Podcast = props => {
  // const prismicContent = props.data.prismic.allBlog_posts.edges[0]
  // if (!prismicContent) return null
  // const node = props.data.page.data
  // const site = props.data.site.data
  // const defaultBlock = props.data.defaultBlock.data

  console.log(props)

  const podcastUrl = props.data.page.audio_url
  // console.log(podcastUrl)

  // this.player = createRef()
  // const defaultBlock = props.data.prismic.allBlocks.edges[0].node
  // const site = props.data.prismic.allSite_informations.edges[0].node

  return (
    <Layout>
      {/* <SEO site={site} page={node} /> */}
      <PodcastStyle>
        <Container>
          <h1>{props.data.page.title}</h1>
          <div className="pod-image">
            <img src={props.data.page.artwork_url} />
          </div>
          <AudioPlayer
            src={podcastUrl}
            onPlay={e => console.log("onPlay")}
            // other props here
          />
          <div
  key={`body`}
  id="___gatsby"
  dangerouslySetInnerHTML={{ __html: props.data.page.description }}
/>
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
        season_number
        title
        id
    }
  }
`
