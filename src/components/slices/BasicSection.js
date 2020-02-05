import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import { Link, RichText, Date } from "prismic-reactjs"
import { linkResolver } from "../../utils/linkResolver"
import htmlSerializer from "../../utils/htmlSerializer"

export const BasicSection = ({ slice }) => {
  console.log(slice)
  var fluid = null
  if (slice.primary.background_image != null) {
    fluid = slice.primary.background_image.localFile.childImageSharp.fluid
  }
  // const content = slice.primary.content.raw.map(function(slice, index) {
  //   if (slice.type === "heading1") {
  //     console.log(slice)
  //     return <h1>{RichText.render(slice)}</h1>
  //   }
  // })
  return (
    <div id={slice.prismicId}>
      {fluid && (
        <BackgroundImage Tag="section" fluid={fluid}>
          <Container>{RichText.asText(slice)}</Container>
        </BackgroundImage>
      )}
      {!fluid && (
        <Container>
          <div
            className="section-content"
            dangerouslySetInnerHTML={{ __html: slice.primary.content.html }}
          />
        </Container>
      )}
    </div>
  )
}

export default BasicSection
