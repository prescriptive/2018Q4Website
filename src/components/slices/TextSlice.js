import React from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../../utils/linkResolver"

const TextSlice = props => {
  return (
    <div>
      {console.log(props)}
      <RichText render={props.slice.primary.text} linkResolver={linkResolver} />
    </div>
  )
}

export default TextSlice
