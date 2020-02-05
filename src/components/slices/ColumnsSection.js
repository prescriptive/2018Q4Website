import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import { Link, RichText, Date } from "prismic-reactjs"

const ColumnStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  &.column-count-4 {
  }
`

export const ColumnsSection = ({ slice }) => {
  var fluid = null
  var bgColor = null
  var columnCount = null
  var items = null
  if (slice.primary.background_image != null) {
    fluid = slice.primary.background_image.localFile.childImageSharp.fluid
  }
  if (slice.primary.background_color != null) {
    bgColor = slice.primary.background_color
  }
  if (slice.primary.column_count != null) {
    columnCount = slice.primary.column_count
  }
  // if (slice.items != null) {
  //   items = slice.items
  // }
  items = slice.items
  return (
    <div id={slice.prismicId}>
      {fluid && (
        <BackgroundImage Tag="section" fluid={fluid}>
          <Container>
            <ColumnStyle
              className={"column-count-" + columnCount}
              dangerouslySetInnerHTML={{ __html: slice.primary.content.html }}
            />
          </Container>
        </BackgroundImage>
      )}
      {!fluid && (
        <ColumnStyle>
          <Container className={"column-count-" + columnCount}>
            {items.map((item, index) => (
              <div>{/* {RichText.render(item.content)} */}</div>
            ))}
          </Container>
        </ColumnStyle>
      )}
    </div>
  )
}

export default ColumnsSection
