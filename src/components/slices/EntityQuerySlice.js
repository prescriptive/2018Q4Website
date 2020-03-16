import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import BlogPostTeaser from "../entities/blog_post/BlogPostTeaser"

const EntityQueryStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  article {
    margin-bottom: 40px;
    flex-basis: calc((100%) / 3 - 14px);
    margin-right: 20px;
    &:nth-child(3n + 3) {
      margin-right: 0px;
    }
  }
`

export const BasicSectionSlice = ({ slice, blog }) => {
  var fluid = null

  var h1_title = false

  var bg_color = null

  var entityCount = null

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
                {blog.nodes.slice(0, entityCount).map((post, index) => (
                  <BlogPostTeaser post={post} key={index}></BlogPostTeaser>
                ))}
              </EntityQueryStyle>
            </section>
          </Container>
        </div>
      )}
    </React.Fragment>
  )
}

export default BasicSectionSlice
