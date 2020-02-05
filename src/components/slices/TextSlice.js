import React from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../../utils/linkResolver"

export const TextSlice = ({ slice }) => {
  return (
    <div className="text-slice">
      {RichText.render(slice.primary.text, linkResolver)}
    </div>
  )
}

export default TextSlice
