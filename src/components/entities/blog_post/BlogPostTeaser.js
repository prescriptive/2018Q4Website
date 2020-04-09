import React from "react"
import * as variable from "../../variables"
import styled from "styled-components"
import { Link } from "gatsby"
import Img from "gatsby-image"

const BlogPostTeaserStyle = styled.article`
  padding: 35px;
  padding-bottom: 85px;
  background-color: ${variable.lightGray};
  color: ${variable.darkGray};
  text-decoration: none;
  position: relative;
  .blog-teaser-title {
    display: block;
    h2 {
      font-size: 26px;
      line-height: 1.3;
      font-weight: 700;
      margin-top: 0px;
    }
  }
  p {
    font-size: 18px;
    line-height: 23px;
    margin-bottom: 30px;
  }
  .blog-teaser-image {
    margin-bottom: 20px;
  }
  .blog-teaser-links {
    display: inline-block;
    text-decoration: none;
    color: #fff;
    background-color: ${variable.red};
    font-weight: 700;
    text-align: center;
    font-size: 18px;
    min-width: 124px;
    padding: 12px 20px;
    border: 1px solid transparent;
    -webkit-transition: background-color 0.3s ease-in-out;
    transition: background-color 0.3s ease-in-out;
    position: absolute;
    bottom: 35px;
    &:hover {
      background-color: ${variable.darkGray};
    }
  }
  .release-date {
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 18px;
  }
  .blog-author {
    font-weight: 700;
    font-size: 18px;
  }
  i {
    margin-right: 7px;
    font-size: 20px;
  }
`
export const BlogPostTeaser = ({ post }) => {
  return (
    <BlogPostTeaserStyle>
      {post.data.main_image.localFile && (
        <Img
          className="blog-teaser-image"
          fluid={post.data.main_image.localFile.childImageSharp.fluid}
        />
      )}
      <Link className="blog-teaser-title" to={"/blog/" + post.uid}>
        {post.data.title.text && <h2>{post.data.title.text}</h2>}
      </Link>
      {post.data.release_date && (
        <div className="release-date">
          <i class="fa fa-calendar"></i>
          {post.data.release_date}
        </div>
      )}
      {post.data.author && (
        <div className="blog-author">
          <i class="fa fa-user"></i>
          {post.data.author.text}
        </div>
      )}
      {post.data.teaser && (
        <div
          className="blog-teaser"
          dangerouslySetInnerHTML={{ __html: post.data.teaser.html }}
        />
      )}
      <Link className="blog-teaser-links" to={"/blog/" + post.uid}>
        Read Full Article
      </Link>
    </BlogPostTeaserStyle>
  )
}

export default BlogPostTeaser
