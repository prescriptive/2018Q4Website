import React from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../../utils/linkResolver"

const TextSlice = props => {
  return (
    <div>
      <RichText render={props.slice.primary.text.raw} linkResolver={linkResolver} />
    </div>
  )
}

export default TextSlice
