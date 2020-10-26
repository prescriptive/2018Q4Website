import React from "react"
import Img from "gatsby-image"

export const ImageSlice = ({ slice }) => {
  return (
    <Img
      className="image-slice"
      fluid={slice.primary.image.localFile.childImageSharp.fluid}
    />
  )
}

export default ImageSlice
