import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import { Link, RichText, Date } from "prismic-reactjs"
import * as variable from "../variables"
import { linkResolver } from "../../utils/linkResolver"

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
      border-radius: 4px;
      overflow: hidden;
    }
  }
  .column-count-2 {
    .column-item {
      width: calc(100% / 2 - 10px);
      overflow: hidden;
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
  @media (max-width: ${variable.tabletWidth}) {
    .column-item {
      width: calc(100% / 2 - 10px) !important;
      margin-bottom: 20px;
    }
  }
  @media (max-width: ${variable.mobileWidthSmall}) {
    .column-item {
      width: 100% !important;
      margin-bottom: 20px;
    }
  }
`

function ColumnsSectionSlice({ slice }) {
  var fluid = null
  var bgColor = null
  var columnCount = null
  var items = null
  if (slice.primary.background_imageSharp != null) {
    fluid = slice.primary.background_imageSharp.childImageSharp.fluid
  }
  if (slice.primary.background_color != null) {
    bgColor = slice.primary.background_color
  }
  if (slice.primary.column_count != null) {
    columnCount = slice.primary.column_count
  }
  if (slice.fields != null) {
    items = slice.fields
  }

  // items = slice.items
  return (
    <div>
      {fluid && (
        <BackgroundImage Tag="section" fluid={fluid}>
          <ColumnStyle>
            <Container>
              <section>
                {slice.primary.section_title[0].text && (
                  <h2>{slice.primary.section_title[0].text}</h2>
                )}
                <div className={"column column-count-" + columnCount}>
                  {items &&
                    items.map((item, index) => (
                      <div key={index} className="column-item">
                        {console.log(item)}
                        <RichText
                          render={item.content}
                          linkResolver={linkResolver}
                        />
                      </div>
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
              {slice.primary.section_title && (
                <h2>{slice.primary.section_title[0].text}</h2>
              )}
              <div className={"column column-count-" + columnCount}>
                {console.log(items)}
                {items &&
                  items.map((item, index) => (
                    <div key={index} className="column-item">
                      <RichText
                        render={slice.primary.content}
                        linkResolver={linkResolver}
                      />
                    </div>
                  ))}
              </div>
            </section>
          </Container>
        </ColumnStyle>
      )}
    </div>
  )
}

export default ColumnsSectionSlice
