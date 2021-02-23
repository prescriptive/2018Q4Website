import React from "react"
import * as variable from "../../variables"
import styled from "styled-components"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const LeadershipTeaserStyle = styled.article`
  background-color: white;
  padding: 30px;
  padding-bottom: 90px;
  position: relative;
  border-radius: 4px;
  .gatsby-image-wrapper {
    border-radius: 4px;
  }
  .photo-name {
    display: flex;
    align-items: center;
    .leader-photo {
      position: relative;
      top: -50px;
      margin-right: 20px;
    }
  }
  .leader-name {
    font-weight: 900;
    font-size: 24px;
    line-height: 28px;
    color: ${variable.darkGray};
  }
  .leader-title {
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    color: ${variable.medGray};
    margin-top: 5px;
  }
  .leader-bio {
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    color: ${variable.medGray};
    p {
      margin-top: 0px;
    }
  }
  .leader-social {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 30px;
    right: 30px;
    a {
      color: white;
      background: ${variable.darkGray};
      border-radius: 50%;
      height: 48px;
      width: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      svg,
      path {
        color: white;
      }
      &:hover {
        background: ${variable.medGray};
        transition: all 0.3s ease;
      }
      &:nth-child(1) {
        margin-right: 8px;
      }
    }
  }
`
export const LeadershipTeaser = ({ post }) => {
  const data = useStaticQuery(graphql`
    query queryleader {
      linkedinicon: file(relativePath: { eq: "linkedinwhite.png" }) {
        childImageSharp {
          fixed(width: 25, height: 25) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
      twittericon: file(relativePath: { eq: "tweeticon.png" }) {
        childImageSharp {
          fixed(width: 32, height: 25) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
    }
  `)
  return (
    <LeadershipTeaserStyle>
      <div className="photo-name">
        <div className="leader-photo">
          <Img fixed={post.data.photo.localFile.childImageSharp.fixed} />
        </div>
        <div className="leader-name-title">
          <div className="leader-name">{post.data.name.text}</div>
          <div className="leader-title">{post.data.title.text}</div>
        </div>
      </div>
      <div
        className="leader-bio"
        dangerouslySetInnerHTML={{ __html: post.data.bio.html }}
      />
      <div className="leader-social">
        {post.data.twitter && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={post.data.twitter.url}
          >
            <Img fixed={data.twittericon.childImageSharp.fixed} />
          </a>
        )}
        {post.data.linkedin && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={post.data.linkedin.url}
          >
            <Img fixed={data.linkedinicon.childImageSharp.fixed} />
          </a>
        )}
      </div>
    </LeadershipTeaserStyle>
  )
}

export default LeadershipTeaser
