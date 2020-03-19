import React from "react"
import * as variable from "../../variables"
import styled from "styled-components"
import { Link } from "gatsby"
import Img from "gatsby-image"

const LeadershipTeaserStyle = styled.article`
  display: flex;
`
export const LeadershipTeaser = ({ post }) => {
  return (
    <LeadershipTeaserStyle>
      {console.log(post)}
      <div class="photo-name">
        <div class="leader-photo">
          <img src={post.data.photo.url} />
        </div>
        <div class="leader-name-title">
          <div class="leader-name">{post.data.name[0].text}</div>
          <div class="leader-title">{post.data.title[0].text}</div>
        </div>
        <div class="leader-bio">{post.data.bio[0].text}</div>
      </div>
    </LeadershipTeaserStyle>
  )
}

export default LeadershipTeaser
