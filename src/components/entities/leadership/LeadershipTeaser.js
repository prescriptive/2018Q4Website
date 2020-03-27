import React from "react"
import * as variable from "../../variables"
import styled from "styled-components"
import { Link } from "gatsby"
import Img from "gatsby-image"

var FA = require("react-fontawesome")

const LeadershipTeaserStyle = styled.article`
  background-color: white;
  padding: 30px;
  padding-bottom: 90px;
  position: relative;
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
      .fa {
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
      {console.log(post)}
      <div class="photo-name">
        <div class="leader-photo">
          <Img fixed={post.data.photo.localFile.childImageSharp.fixed} />
        </div>
        <div class="leader-name-title">
          <div class="leader-name">{post.data.name.text}</div>
          <div class="leader-title">{post.data.title.text}</div>
        </div>
      </div>
      <div
        className="leader-bio"
        dangerouslySetInnerHTML={{ __html: post.data.bio.html }}
      />
      <div class="leader-social">
        <a target="_blank" href={post.data.twitter.url}>
          <FA name="twitter" />
        </a>
        <a target="_blank" href={post.data.linkedin.url}>
          <FA name="linkedin" />
        </a>
      </div>
    </LeadershipTeaserStyle>
  )
}

export default LeadershipTeaser
