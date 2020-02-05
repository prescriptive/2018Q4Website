import React from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../../utils/linkResolver"
import Img from "gatsby-image"

export const ImageSlice = ({ slice }) => {
  return (
    <div className="image-slice">
      <Img fluid={slice.primary.imageSharp.childImageSharp.fluid} />
    </div>
  )
}

export default ImageSlice
