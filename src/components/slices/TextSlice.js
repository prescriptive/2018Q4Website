import React from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../../utils/linkResolver"
import Container from "../container"

export const TextSlice = ({ slice }) => {
  return (
    <div className="text-slice">

      {RichText.render(slice.primary.text.html, linkResolver)}
      </div>
  )
}

export default TextSlice
