import React from "react"
import { RichText } from "prismic-reactjs"
import linkResolver from "../../utils/linkResolver"
import Container from "../container"
import prismicHtmlSerializer from "../../gatsby/htmlSerializer"

export const QuoteSlice = ({ slice }) => {
  return (
    <Container className="quote-slice">
      <RichText
        render={slice.primary.content.raw}
        linkResolver={linkResolver}
        htmlSerializer={prismicHtmlSerializer}
      />
    </Container>
  )
}

export default QuoteSlice
