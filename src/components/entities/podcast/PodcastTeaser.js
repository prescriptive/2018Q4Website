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
`
export const PodcastTeaser = ({ post }) => {
  console.log(post)
  return (
    <PodcastTeaserStyle>
      <Link to={"/podcast/" + post.uid}>
        <Img fluid={post.data.image.localFile.childImageSharp.fluid} />
        <h2>{post.data.title.text}</h2>
        <p>{post.data.teaser.text}</p>
      </Link>
    </PodcastTeaserStyle>
  )
}

export default PodcastTeaser
