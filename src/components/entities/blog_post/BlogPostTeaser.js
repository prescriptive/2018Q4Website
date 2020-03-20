import React from "react"
import * as variable from "../../variables"
import styled from "styled-components"
import { Link } from "gatsby"
import Img from "gatsby-image"

const BlogPostTeaserStyle = styled.article`
  a {
    padding: ${variable.sectionPadding};
    background-color: ${variable.lightgray};
    display: block;
    height: 100%;
    color: ${variable.darkgray};
    text-decoration: none;
  }
`
export const BlogPostTeaser = ({ post }) => {
  return (
    <BlogPostTeaserStyle>
      <Link to={"/blog/" + post.uid}>
        {post.data.main_image.localFile && (
          <Img fluid={post.data.main_image.localFile.childImageSharp.fluid} />
        )}
        {post.data.title.text && <h2>{post.data.title.text}</h2>}
        {post.data.release_date && (
          <div className="release-date">{post.data.release_date}</div>
        )}
        {post.data.author && (
          <div className="blog-author">{post.data.author.text}</div>
        )}
        {post.data.teaser && (
          <div
            className="blog-teaser"
            dangerouslySetInnerHTML={{ __html: post.data.teaser.html }}
          />
        )}
      </Link>
    </BlogPostTeaserStyle>
  )
}

export default BlogPostTeaser
