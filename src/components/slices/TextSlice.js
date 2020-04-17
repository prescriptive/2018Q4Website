import React from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../../utils/linkResolver"
import Container from "../container"

export const TextSlice = ({ slice }) => {
  return (
    <div
      className="text-slice"
      dangerouslySetInnerHTML={{ __html: slice.primary.text.html }}
    />
  )
}

export default TextSlice
