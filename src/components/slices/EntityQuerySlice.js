import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import BlogPostTeaser from "../entities/blog_post/BlogPostTeaser"
import LeadershipTeaser from "../entities/leadership/LeadershipTeaser"
import JobTeaser from "../entities/job/JobTeaser"
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
    }
  }
`

// Sort and display the different slice options
const EntityResult = ({ slice, blog, leadership, job, podcast }) => {
  // return slices.map((slice, index) => {
  //   const res = () => {
  //     switch (slice.slice_type) {
  //       case "text":
  //         return (
  //           <div key={index} className="slice-wrapper slice-text">
  //             {<Text slice={slice} />}
  //           </div>
  //         )
  //     }
  //   }
  // })
  if (slice.primary.entity_type == "Leadership") {
    return leadership.nodes
      .slice(0, slice.primary.entity_count)
      .map((post, index) => (
        <LeadershipTeaser post={post} key={index}></LeadershipTeaser>
      ))
  }

  if (slice.primary.entity_type == "Podcast") {
    return podcast.nodes
      .slice(0, slice.primary.entity_count)
      .map((post, index) => (
        <h3>Podcast</h3>
      ))
  }

  if (slice.primary.entity_type == "Blog Post") {
    return blog.nodes
      .slice(0, slice.primary.entity_count)
      .map((post, index) => (
        <BlogPostTeaser post={post} key={index}></BlogPostTeaser>
      ))
  }

  if (slice.primary.entity_type == "Job") {
    return job.nodes
      .slice(0, slice.primary.entity_count)
      .map((post, index) => <JobTeaser post={post} key={index}></JobTeaser>)
  }

  if (slice.primary.entity_type == "Podcast") {
    return podcast.nodes
      .slice(0, slice.primary.entity_count)
      .map((post, index) => (
        <PodcastTeaser post={post} key={index}></PodcastTeaser>
      ))
  }

  // {blog.nodes.slice(0, entityCount).map((post, index) => (
  //   <BlogPostTeaser post={post} key={index}></BlogPostTeaser>
  // ))}
}

export const EntityQuerySlice = ({ slice, blog, leadership, job, podcast }) => {
  var fluid = null

  var h1_title = false

  var bg_color = null

  var entityCount = null

  var entity = null

  var entityType = null

  if (slice.primary.type == "e") {
    entity = leadership
    entityType = "leadership"
  }
  if (slice.primary.type == "Leadership") {
    entity = leadership
    entityType = "leadership"
  }
  if (slice.primary.type == "Blog Post") {
    entity = blog
    entityType = "leadership"
  }

  if (slice.primary.background_imageSharp != null) {
    fluid = slice.primary.background_image.localFile.childImageSharp.fluid
  }

  if (slice.primary.background_color != null) {
    bg_color = slice.primary.background_color
  }

  if (slice.primary.number_of_entities != null) {
    var entityCount = slice.primary.number_of_entities
  }

  // if (slice.primary.h1_title != null) {
  //   h1_title = slice.primary.h1_title
  // }
  var theh1Title = null
  var theh2Title = null
  if(slice.primary.section_title && slice.primary.h1_title == true){
    var theh1Title = slice.primary.section_title.text
  }
  else if(slice.primary.section_title && slice.primary.h1_title == false){
    var theh2Title = slice.primary.section_title.text
  }
  else if(slice.primary.section_title && slice.primary.h1_title == false){
    var theh2Title = slice.primary.section_title[0].text
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
              {theh1Title && <h1>{theh1Title}</h1>}
              {theh2Title && <h2>{theh2Title}</h2>}
              <EntityQueryStyle>
                <EntityResult
                  slice={slice}
                  blog={blog}
                  leadership={leadership}
                  job={job}
                  podcast={podcast}
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
