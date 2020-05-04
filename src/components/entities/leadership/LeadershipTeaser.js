import React from "react"
import * as variable from "../../variables"
import styled from "styled-components"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { RichText } from "prismic-reactjs"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
  return (
    <LeadershipTeaserStyle>
      {console.log(post.node)}
      <div class="photo-name">
        <div class="leader-photo">
          <Img fixed={post.node.photoSharp.childImageSharp.fixed} />
        </div>
        <div class="leader-name-title">
          <div class="leader-name">{post.node.name[0].text}</div>
          <div class="leader-title">{post.node.title[0].text}</div>
        </div>
      </div>
      <div className="leader-bio">{RichText.render(post.node.bio)}</div>
      <div class="leader-social">
        {post.node.twitter && (
          <a target="_blank" href={post.node.twitter.url}>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        )}
        {post.node.linkedin && (
          <a target="_blank" href={post.node.linkedin.url}>
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        )}
      </div>
    </LeadershipTeaserStyle>
  )
}

export default LeadershipTeaser
