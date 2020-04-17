import React from "react"
import * as variable from "../../variables"
import styled from "styled-components"
import { Link } from "gatsby"
import Img from "gatsby-image"

var FA = require("react-fontawesome")

const JobTeaserStyle = styled.article`
  border-radius:4px;
  background-color: white;
  a{
    display:block;
    padding: 48px 24px;
    position:relative;
    &:hover{
      box-shadow: 5px 5px 10px 7px ${variable.lightGray};
    }
  }
  h2 {
    margin-top: 0px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 27px;
    line-height: 36px;
    text-align: center;
    width: 100%;
    margin-bottom: 12px;
    color:${variable.darkGray};
  }
  .job-location {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    color: ${variable.red};
    text-align: center;
  }
  }
`
export const JobTeaser = ({ post }) => {
  return (
    <JobTeaserStyle>
      <Link to={"/job-opportunity/" + post.uid}>
        <h2>{post.data.title.text}</h2>
        <div className="job-location">{post.data.location.text}</div>
        <div
          className="job-teaser"
          dangerouslySetInnerHTML={{
            __html: post.data.teaser_description.html,
          }}
        />
      </Link>
    </JobTeaserStyle>
  )
}

export default JobTeaser
