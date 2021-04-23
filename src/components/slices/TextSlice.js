import React from "react"
import { RichText } from "prismic-reactjs"
import linkResolver from "../../utils/linkResolver"
import prismicHtmlSerializer from "../../gatsby/htmlSerializer"
import { withPreview } from 'gatsby-source-prismic'

const TextSlice = props => {
  return (
    <div>
      <RichText
        render={props.slice.primary.text.raw}
        linkResolver={linkResolver}
        htmlSerializer={prismicHtmlSerializer}
      />
    </div>
  )
}
export default withPreview(TextSlice)