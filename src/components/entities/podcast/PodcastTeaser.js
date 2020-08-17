import React from "react"
import * as variable from "../../variables"
import styled from "styled-components"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { RichText } from "prismic-reactjs"

const PodcastTeaserStyle = styled.article`
  background-color: ${variable.lightGray};
  padding: 35px 25px;
  h2 {
    font-size: 27px;
    font-weight: 500;
    margin: 20px 0px 0px 0px;
  }
  p {
    font-size: 18px;
    margin: 5px 0px 0px 0px;
  }
  
  .pod-image{
    img{
      max-with:100%;
      width:100%;
    }
  }
`
export const PodcastTeaser = ({ post }) => {
  console.log(post)
  return (
    <PodcastTeaserStyle>
      <Link to={"/the-podcasts/" + post.slug}>
        <div className="pod-image"><img src={post.artwork_url} /></div>
        <h2>{post.title}</h2>
        <div
  key={`body`}
  id="___gatsby"
  dangerouslySetInnerHTML={{ __html: post.description }}
/>
      </Link>
    </PodcastTeaserStyle>
  )
}

export default PodcastTeaser
