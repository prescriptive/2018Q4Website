import React from "react"
import * as variable from "../../variables"
import styled from "styled-components"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { RichText } from "prismic-reactjs"
import placeholder from "../../../images/placeholder-img.jpg"

const PodcastTeaserStyle = styled.article`
  background-color: ${variable.lightGray};
  padding: 35px 25px;
  border-radius: 4px;
  h2 {
    font-size: 27px;
    font-weight: 500;
    line-height: 36px;
    margin: 20px 0px 0px 0px;
  }
  .pod-summary {
    font-size: 18px;
    margin: 10px 0px 0px 0px;
  }

  .pod-image {
    img {
      max-with: 100%;
      width: 100%;
    }
  }
`
const PodImage = ({ podinfo, post }) => {
  return podinfo.map((pod, index) => {
    var podcastId = "Buzzsprout__PodcastEpisode__" + pod.data.buzzsprout_id.text
    if (podcastId == post.id) {
      return (
        <Img fluid={pod.data.podcast_image.localFile.childImageSharp.fluid} />
      )
    } else {
      return <img src={placeholder} />
    }
  })
}

export const PodcastTeaser = ({ post, podinfo }) => {
  return (
    <PodcastTeaserStyle>
      <Link to={"/the-podcast/" + post.slug}>
        <div className="pod-image">
          <PodImage podinfo={podinfo.nodes} post={post} />
        </div>
        <h2>{post.title}</h2>
        <div
          key={`body`}
          className="pod-summary"
          dangerouslySetInnerHTML={{ __html: post.summary }}
        />
      </Link>
    </PodcastTeaserStyle>
  )
}

export default PodcastTeaser
