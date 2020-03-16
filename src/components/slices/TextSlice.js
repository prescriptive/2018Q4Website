import React from "react"
import { RichText } from "prismic-reactjs"
import Container from "../container"

export const TextSlice = ({ slice }) => {
  return (
    <Container className="text-slice">
      <div dangerouslySetInnerHTML={{ __html: slice.primary.text.html }} />
    </Container>
  )
}

export default TextSlice
