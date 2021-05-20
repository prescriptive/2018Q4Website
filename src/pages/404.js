import React from "react"
import Container from "../components/container"
import Layout from "../components/layout"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { withUnpublishedPreview } from 'gatsby-source-prismic'
import { pageTemplate } from '../templates/page'
import { postTemplate } from '../templates/post'
import { podcastTemplate } from '../templates/podcast'

const Style404 = styled.div`
  padding: 60px 0px;
  text-align: center;
  p {
    margin: 20px 0px 40px 0px;
  }
  h1 {
    margin: 0px;
  }
   .gatsby-image-wrapper{
     max-width:600px;
     margin:0 auto;
   }
`
export const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
  query querynotfound{
    notfound: file(relativePath: { eq: "pre_404.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`)
return(
  <Layout>
    <Container>
      <Style404>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <Img fluid={data.notfound.childImageSharp.fluid} />
      </Style404>
    </Container>
  </Layout>
)

}

export default withUnpublishedPreview(NotFoundPage, {
  templateMap: {
    page: pageTemplate,
    podcast: podcastTemplate,
    post: postTemplate,
    prismicPage: pageTemplate,
    prismicPodcast: podcastTemplate,
    prismicPost: postTemplate,
  },
})