import React from "react"
import { RichText } from "prismic-reactjs"

export const TextSlice = ({ slice }) => {
  return <div>{RichText.render(slice.primary.text)}</div>
}

export default TextSlice
