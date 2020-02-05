import React from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../../utils/linkResolver"

export const QuoteSlice = ({ slice }) => {
  return (
    <div className="quote-slice">
      {RichText.render(slice.primary.text, linkResolver)}
    </div>
  )
}

export default QuoteSlice
