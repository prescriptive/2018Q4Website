import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import BlogPostTeaser from "../entities/blog_post/BlogPostTeaser"
import LeadershipTeaser from "../entities/leadership/LeadershipTeaser"
import * as variable from "../variables"

const EntityQueryStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  article {
    margin-bottom: 40px;
    width: calc((100%) / 3 - 14px);
    margin-right: 20px;
    @media (max-width: ${variable.mobileWidth}) {
      width: 100%;
    }
    &:nth-child(3n + 3) {
      margin-right: 0px;
    }
  }
`

// Sort and display the different slice options
const EntityResult = ({ slice, blog, leadership }) => {
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

  if (slice.primary.entity_type == "Blog Post") {
    return blog.nodes
      .slice(0, slice.primary.entity_count)
      .map((post, index) => (
        <BlogPostTeaser post={post} key={index}></BlogPostTeaser>
      ))
  }

  // {blog.nodes.slice(0, entityCount).map((post, index) => (
  //   <BlogPostTeaser post={post} key={index}></BlogPostTeaser>
  // ))}
  // console.log("te" + slice)
}

export const EntityQuerySlice = ({ slice, blog, leadership }) => {
  var fluid = null

  var h1_title = false

  var bg_color = null

  var entityCount = null

  var entity = null

  var entityType = null

  if (slice.primary.entity_type == "Leadership") {
    entity = leadership
    entityType = "leadership"
  }
  if (slice.primary.entity_type == "Blog Post") {
    entity = blog
    entityType = "leadership"
  }
  console.log(slice)

  if (slice.primary.background_image != null) {
    fluid = slice.primary.background_image.fluid
  }

  if (slice.primary.background_color != null) {
    bg_color = slice.primary.background_color
  }

  if (slice.primary.number_of_entities != null) {
    var entityCount = slice.primary.number_of_entities
  }

  if (slice.primary.h1_title != null) {
    h1_title = slice.primary.h1_title
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
            <section>
              {h1_title && <h1>{slice.primary.section_title.text}</h1>}
              {!h1_title && <h2>{slice.primary.section_title.text}</h2>}
              <EntityResult slice={slice} blog={blog} leadership={leadership} />
              <EntityQueryStyle>
                {blog.nodes.slice(0, entityCount).map((post, index) => (
                  <BlogPostTeaser post={post} key={index}></BlogPostTeaser>
                ))}
              </EntityQueryStyle>
            </section>
          </Container>
        </BackgroundImage>
      )}
      {!fluid && (
        <div style={{ backgroundColor: bg_color }}>
          <Container>
            <section>
              {h1_title && <h1>{slice.primary.section_title.text}</h1>}
              {!h1_title && <h2>{slice.primary.section_title.text}</h2>}
              <EntityQueryStyle>
                <EntityResult
                  slice={slice}
                  blog={blog}
                  leadership={leadership}
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