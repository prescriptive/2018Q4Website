import React from "react"
import * as variable from "../../variables"
import styled from "styled-components"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { RichText } from "prismic-reactjs"

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
export const PodcastTeaser = ({ post }) => {
  return (
    <PodcastTeaserStyle>
      <Link to={"/the-podcast/" + post.slug}>
        <div className="pod-image">
          <img src={post.artwork_url} />
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
