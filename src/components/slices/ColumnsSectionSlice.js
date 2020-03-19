import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import HtmlRender from "../../utils/htmlSerializer"
import linkResolver from "../../utils/linkResolver"
import { RichText } from "prismic-reactjs"
import * as variable from "../variables"
import Masonry from "react-masonry-component"
const masonryOptions = {
  transitionDuration: 0,
}

const PrismicDOM = require("prismic-dom")
const ColumnStyle = styled.div`
  .column {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    img {
      max-width: 100%;
    }
    .column-item {
      padding: 20px;
      border: 1px solid white;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:nth-child(even) {
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
      }
      &:nth-child(odd) {
        border-top-left-radius: 20px;
        border-bottom-right-radius: 20px;
      }
    }
  }
  .column-count-2 {
    .column-item {
      width: calc(100% / 2 - 10px);
    }
  }
  .column-count-3 {
    .column-item {
      width: calc(100% / 3 - 10px);
    }
  }
  .column-count-4 {
    .column-item {
      width: calc(100% / 4 - 10px);
    }
  }
  .column-count-5 {
    .column-item {
      width: calc(100% / 5 - 10px);
    }
  }
  .column-count-6 {
    .column-item {
      width: calc(100% / 6 - 10px);
    }
  }
  @media (max-width: ${variable.mobileWidth}) {
    .column-item {
      width: 100% !important;
      margin-bottom: 40px;
    }
  }
`

function ColumnsSectionSlice({ slice }) {
  var fluid = null
  var bgColor = null
  var columnCount = null
  var items = null
  if (slice.primary.background_image != null) {
    fluid = slice.primary.background_image.fluid
  }
  if (slice.primary.background_color != null) {
    bgColor = slice.primary.background_color
  }
  if (slice.primary.column_count != null) {
    columnCount = slice.primary.column_count
  }
  if (slice.items != null) {
    items = slice.items
  }
  const spans = []

  // items = slice.items
  return (
    <div>
      {fluid && (
        <BackgroundImage Tag="section" fluid={fluid}>
          <ColumnStyle>
            <Container>
              <section>
                {slice.primary.section_title.text && (
                  <h2>{slice.primary.section_title.text}</h2>
                )}
                <div className={"column column-count-" + columnCount}>
                  {slice.items &&
                    slice.items.map((item, index) => (
                      <li
                        key={index}
                        className="column-item"
                        dangerouslySetInnerHTML={{
                          __html: item.content.html,
                        }}
                      />
                    ))}
                </div>
              </section>
            </Container>
          </ColumnStyle>
        </BackgroundImage>
      )}
      {!fluid && (
        <ColumnStyle
          style={{ backgroundColor: slice.primary.background_color }}
        >
          <Container>
            <section>
              {slice.primary.section_title.text && (
                <h2>{slice.primary.section_title.text}</h2>
              )}
              <div className={"column column-count-" + columnCount}>
                {slice.items &&
                  slice.items.map((item, index) => (
                    <div
                      key={index}
                      className="column-item"
                      dangerouslySetInnerHTML={{ __html: item.content.html }}
                    />
                  ))}
              </div>
            </section>
            ``
          </Container>
        </ColumnStyle>
      )}
    </div>
  )
}

export default ColumnsSectionSlice
