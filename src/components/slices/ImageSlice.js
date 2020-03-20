import React from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../../utils/linkResolver"
import Img from "gatsby-image"
import Container from "../container"

export const ImageSlice = ({ slice }) => {
  return (
    <Container className="image-slice">
      <Img fluid={slice.primary.image.localFile.childImageSharp.fluid} />
    </Container>
  )
}

export default ImageSlice
