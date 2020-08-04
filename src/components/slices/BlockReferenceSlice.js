import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import { Link, RichText, Date } from "prismic-reactjs"
import YouTube from "react-youtube"
import ResponsiveEmbed from "react-responsive-embed"
import "../scss/blocks/globalContact.scss"
import "../scss/blocks/dirContact.scss"
import { linkResolver } from "../../utils/linkResolver"
import BasicSectionSlice from "../slices/BasicSectionSlice"
import LeftRightSlice from "../slices/LeftRightSlice"

const BlockReferenceStyle = styled.div``

// Sort and display the different slice options
const PostSlices = ({ slices, blog, leadership, job }) => {
  return slices.map((slice, index) => {
    var sliceID = ""
    if (slice.primary) {
      if (slice.primary.slice_id != undefined) {
        var sliceID = slice.primary.slice_id.text
      }
    }
    const res = (() => {
      switch (slice.slice_type) {
        case "basic_section":
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-basic"
            >
              {<BasicSectionSlice slice={slice} />}
            </div>
          )

        case "left_right_section":
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-left-right"
            >
              {<LeftRightSlice slice={slice} />}
            </div>
          )

        default:
          return
      }
    })()
    return res
  })
}

export const BlockReferenceSlice = ({ slice }) => {
  slice = slice.primary.block_reference.document.data.body
  return (
    <BlockReferenceStyle>
      <Container className="block-reference-slice-container">
        <PostSlices slices={slice} />
      </Container>
    </BlockReferenceStyle>
  )
}

export default BlockReferenceSlice
