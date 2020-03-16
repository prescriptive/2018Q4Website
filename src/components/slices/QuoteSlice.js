import React from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../../utils/linkResolver"
import Container from "../container"

export const QuoteSlice = ({ slice }) => {
  return (
    <Container className="quote-slice">
      {RichText.render(slice.primary.text, linkResolver)}
    </Container>
  )
}

export default QuoteSlice
