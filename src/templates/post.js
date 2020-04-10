import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import SEO from "../components/seo"
import { Link, RichText, Date } from "prismic-reactjs"
import Img from "gatsby-image"
import Image from "../components/slices/ImageSlice"
import Text from "../components/slices/TextSlice"
import Quote from "../components/slices/QuoteSlice"
import Video from "../components/slices/VideoSlice"

// Sort and display the different slice options
const PostSlices = ({ slices }) => {
  return slices.map((slice, index) => {
    const res = (() => {
      switch (slice.slice_type) {
        case "text":
          return (
            <div key={index} className="slice-wrapper slice-text">
              {<Text slice={slice} />}
            </div>
          )

        case "quote":
          return (
            <div key={index} className="slice-wrapper slice-quote">
              {<Quote slice={slice} />}
            </div>
          )

        case "image":
          return (
            <div key={index} className="slice-wrapper slice-image">
              {<Image slice={slice} />}
            </div>
          )
        case "video":
          return (
            <div key={index} className="slice-wrapper slice-video">
              {<Video slice={slice} />}
            </div>
          )

        default:
          return
      }
    })()
    return res
  })
}

const PageStyle = styled.div`
  section {
    padding: ${variable.sectionPadding};
  }
`
const Post = ({ data }) => {
  const { page } = data
  const { site } = data

  return (
    <Layout>
      {/* <SEO site={site} page={page} /> */}
      <PageStyle>
        <Container>
          {console.log(page)}
          <div className="main-image">
            {page.data.main_image && (
              <Img
                fluid={page.data.main_image.localFile.childImageSharp.fluid}
              />
            )}
          </div>
          <h1>{page.data.title.text}</h1>
        </Container>
        {page.data.body && <PostSlices slices={page.data.body} />}
      </PageStyle>
    </Layout>
  )
}
export default Post
export const postQuery = graphql`
  query PostBySlug($uid: String!) {
    page: prismicBlogPost(uid: { eq: $uid }) {
      uid
      data {
        title {
          text
        }
        main_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        body {
          ... on PrismicBlogPostBodyVideo {
            slice_type
            id
            primary {
              video_embed {
                embed_url
              }
            }
          }
          ... on PrismicBlogPostBodyImage {
            slice_type
            id
            primary {
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
          ... on PrismicBlogPostBodyText {
            slice_type
            id
            primary {
              text {
                html
              }
            }
          }
        }
      }
    }
    site: allPrismicSiteInformation {
      nodes {
        data {
          description {
            text
          }
          site_url {
            text
          }
          site_title {
            text
          }
          twitter_author {
            text
          }
        }
      }
    }
  }
`
