import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import BlogPostTeaser from "../entities/blog_post/BlogPostTeaser"
import LeadershipTeaser from "../entities/leadership/LeadershipTeaser"
// import JobTeaser from "../entities/job/JobTeaser"
import PodcastTeaser from "../entities/podcast/PodcastTeaser"
import * as variable from "../variables"

const EntityQueryStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  article {
    margin-bottom: 40px;
    width: calc((100%) / 3 - 14px);
    margin-right: 20px;
    &:nth-child(3n + 3) {
      margin-right: 0px;
    }
    @media (max-width: ${variable.tabletWidth}) {
      width: calc((100%) / 2 - 10px);
      &:nth-child(3n + 3) {
        margin-right: 20px;
      }
      &:nth-child(2n + 2) {
        margin-right: 0px;
      }
    }
    @media (max-width: ${variable.mobileWidth}) {
      width: 100%;
      margin-right: 0px !important;
      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
`

// Sort and display the different slice options
const EntityResult = ({ slice, blog, leadership, job, podcast, podinfo }) => {
  if (slice.primary.entity_type === "Leadership") {
    return leadership.nodes
      .slice(0, slice.primary.entity_count)
      .map((post, index) => (
        <LeadershipTeaser post={post} key={index}></LeadershipTeaser>
      ))
  }

  if (slice.primary.entity_type === "Blog Post") {
    return blog.nodes
      .slice(0, slice.primary.entity_count)
      .map((post, index) => (
        <BlogPostTeaser post={post} key={index}></BlogPostTeaser>
      ))
  }

  // if (slice.primary.entity_type == "Job") {
  //   return job.nodes
  //     .slice(0, slice.primary.entity_count)
  //     .map((post, index) => <JobTeaser post={post} key={index}></JobTeaser>)
  // }

  if (slice.primary.entity_type === "Podcast") {
    return podinfo.nodes
      .slice(0, slice.primary.entity_count)
      .map((post, index) => (
        <PodcastTeaser
          post={post}
          key={index}
          podinfo={podcast.nodes}
        ></PodcastTeaser>
      ))
  }
}

export const EntityQuerySlice = ({
  slice,
  blog,
  leadership,
  job,
  podcast,
  podinfo,
}) => {
  var fluid = null

  var bg_color = null

  if (slice.primary.background_image.localFile !== null) {
    fluid = slice.primary.background_image.localFile.childImageSharp.fluid
  }

  if (slice.primary.background_color !== null) {
    bg_color = slice.primary.background_color
  }

  var theh2 = null
  if (slice.primary.section_title) {
    if (slice.primary.section_title.text !== "") {
      theh2 = slice.primary.section_title.text
    }
  }
  return (
    <React.Fragment>
      {fluid && (
        <BackgroundImage
          Tag="section"
          fluid={fluid}
          style={{ backgroundColor: bg_color }}
        >
          <Container>
            {/* <section>
              {h1_title && <h1>{slice.primary.section_title.text}</h1>}
              {!h1_title && <h2>{slice.primary.section_title.text}</h2>}
              <EntityResult
                slice={slice}
                blog={blog}
                leadership={leadership}
                job={job}
              />
              <EntityQueryStyle>
                {blog.nodes.slice(0, entityCount).map((post, index) => (
                  <BlogPostTeaser post={post} key={index}></BlogPostTeaser>
                ))}
              </EntityQueryStyle>
            </section> */}
          </Container>
        </BackgroundImage>
      )}
      {!fluid && (
        <div style={{ backgroundColor: bg_color }}>
          <Container>
            <section>
              {/* {console.log(theh2)} */}
              {theh2 && <h2>{slice.primary.section_title.text}</h2>}
              <EntityQueryStyle>
                <EntityResult
                  slice={slice}
                  blog={blog}
                  leadership={leadership}
                  job={job}
                  podcast={podcast}
                  podinfo={podinfo}
                />
              </EntityQueryStyle>
            </section>
          </Container>
        </div>
      )}
    </React.Fragment>
  )
}

export default EntityQuerySlice
