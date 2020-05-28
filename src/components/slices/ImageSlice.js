import React from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../../utils/linkResolver"
import Img from "gatsby-image"
import Container from "../container"

export const ImageSlice = ({ slice }) => {
  return (
    <Img
      className="image-slice"
      fluid={slice.primary.imageSharp.childImageSharp.fluid}
    />
  )
}

export default ImageSlice
