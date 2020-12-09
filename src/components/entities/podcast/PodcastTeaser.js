import React from "react"
import * as variable from "../../variables"
import styled from "styled-components"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

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
      max-width: 100%;
      width: 100%;
      border-radius: 4px;
    }
  }
`
const PodImage = ({ podinfo, post, placeholder }) => {
  var podImg = <Img fluid={placeholder.childImageSharp.fluid} />
  podinfo.map((pod, index) => {
    var podcastId = "Buzzsprout__PodcastEpisode__" + pod.data.buzzsprout_id.text
    if (podcastId == post.id) {
      podImg = (
        <Img fluid={pod.data.podcast_image.localFile.childImageSharp.fluid} />
      )
    }
  })
  return podImg
}

export const PodcastTeaser = ({ post, podinfo }) => {
  const data = useStaticQuery(graphql`
    query querypodcastteaser {
      placeholder: file(relativePath: { eq: "placeholder-img.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `)
  return (
    <PodcastTeaserStyle>
      <Link to={"/podcast/" + post.slug}>
        <div className="pod-image">
          <PodImage
            podinfo={podinfo}
            post={post}
            placeholder={data.placeholder}
          />
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
