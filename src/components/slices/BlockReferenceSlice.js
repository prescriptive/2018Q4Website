import styled from "styled-components"
import React from "react"
import Container from "../container"
import "../scss/blocks/globalContact.scss"
import "../scss/blocks/dirContact.scss"
import "../scss/blocks/podSubscribe.scss"
import loadable from '@loadable/component'
// import BasicSectionSlice from "../slices/BasicSectionSlice"
// import LeftRightSlice from "../slices/LeftRightSlice"
// import ColumnsSectionSlice from "../slices/ColumnsSectionSlice"

const BasicSectionSlice = loadable(() => import(`../slices/BasicSectionSlice`))

const LeftRightSlice = loadable(() => import(`../slices/LeftRightSlice`))

const ColumnsSectionSlice = loadable(() => import(`../slices/ColumnsSectionSlice`))

const BlockReferenceStyle = styled.div``

// Sort and display the different slice options
const PostSlices = ({ slices }) => {
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
              <Container>{<LeftRightSlice slice={slice} />}</Container>
            </div>
          )

        case "columns_section":
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-left-right"
            >
              {<ColumnsSectionSlice slice={slice} />}
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
      <PostSlices slices={slice} />
    </BlockReferenceStyle>
  )
}

export default BlockReferenceSlice
