import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import "../components/scss/page/home.scss"
import { Link, RichText, Date } from "prismic-reactjs"
import SEO from "../components/seo"
import Img from "gatsby-image"
import Image from "../components/slices/ImageSlice"
import Text from "../components/slices/TextSlice"
import Quote from "../components/slices/QuoteSlice"
import Video from "../components/slices/VideoSlice"
import BasicSectionSlice from "../components/slices/BasicSectionSlice"
import ColumnSectionSlice from "../components/slices/ColumnsSectionSlice"
import LeftRightSlice from "../components/slices/LeftRightSlice"
import EntityQuerySlice from "../components/slices/EntityQuerySlice"

// Sort and display the different slice options
const PostSlices = ({ slices, blog }) => {
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

        case "basic_section":
          return (
            <div
              id={"slice-id-" + slice.id}
              key={index}
              className="slice-wrapper slice-basic"
            >
              {<BasicSectionSlice slice={slice} />}
            </div>
          )

        case "entity_query":
          return (
            <div
              id={"slice-id-" + slice.id}
              key={index}
              className="slice-wrapper slice-entity-query"
            >
              {<EntityQuerySlice slice={slice} blog={blog} />}
            </div>
          )

        case "slideshow":
          return (
            <div
              id={"slice-id-" + slice.id}
              key={index}
              className="slice-wrapper slice-slideshow"
            >
              {/* {<EntityQuerySlice slice={slice} blog={blog} />} */}
            </div>
          )

        case "columns_section":
          return (
            <div
              id={"slice-id-" + slice.id}
              key={index}
              className="slice-wrapper slice-columns"
            >
              {<ColumnSectionSlice slice={slice} />}
            </div>
          )

        case "left_right_section":
          return (
            <div key={index} className="slice-wrapper slice-left-right">
              {<LeftRightSlice key={index} slice={slice} />}
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
    padding: ${variable.sectionPadding} 0px;
  }
`
const Page = ({ data }) => {
  const { page } = data
  const { site } = data
  const { blog } = data
  return (
    <Layout>
      <SEO site={site} page={page} />
      <PageStyle>
        {page.data.body && <PostSlices slices={page.data.body} blog={blog} />}
      </PageStyle>
    </Layout>
  )
}
export default Page
export const postQuery = graphql`
  query PageBySlug($uid: String!) {
    page: prismicPa(uid: { eq: $uid }) {
      uid
      id
      type
      data {
        meta_title
        meta_description
        title {
          text
        }
        body {
          ... on PrismicPaBodySlideshow {
            id
            primary {
              background_color
              section_title {
                text
              }
            }
            slice_type
            items {
              image {
                fluid {
                  srcWebp
                  srcSetWebp
                  srcSet
                  src
                  sizes
                  base64
                  aspectRatio
                }
              }
              image_copy {
                html
              }
            }
          }
          ... on PrismicPaBodyBasicSection {
            id
            slice_type
            primary {
              section_title {
                text
              }
              h1_title
              font_color
              background_color
              background_image {
                fluid(maxWidth: 1920) {
                  srcWebp
                  srcSetWebp
                  srcSet
                  src
                  sizes
                  base64
                  aspectRatio
                }
              }
              background_video {
                url
              }
              youtube_background {
                embed_url
              }
              content {
                html
              }
            }
          }
          ... on PrismicPaBodyEntityQuery {
            id
            slice_type
            primary {
              entity_type
              number_of_entities
              section_title {
                text
              }
              background_color
              background_image {
                fluid(maxWidth: 1920) {
                  srcWebp
                  srcSetWebp
                  srcSet
                  src
                  sizes
                  base64
                  aspectRatio
                }
              }
            }
          }
          ... on PrismicPaBodyColumnsSection {
            id
            slice_type
            primary {
              background_color
              column_count
              background_image {
                fluid(maxWidth: 1920) {
                  srcWebp
                  srcSetWebp
                  srcSet
                  src
                  sizes
                  base64
                  aspectRatio
                }
              }
              section_title {
                text
              }
              h1_title
              font_color
            }
            items {
              content {
                html
              }
            }
          }
          ... on PrismicPaBodyLeftRightSection {
            id
            slice_type
            primary {
              left_background_image {
                fluid(maxWidth: 1920) {
                  srcWebp
                  srcSetWebp
                  srcSet
                  src
                  sizes
                  base64
                  aspectRatio
                }
              }
              right_background_image {
                fluid(maxWidth: 1920) {
                  srcWebp
                  srcSetWebp
                  srcSet
                  src
                  sizes
                  base64
                  aspectRatio
                }
              }
              right_content {
                html
              }
              left_content {
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
    blog: allPrismicBlogPost(sort: { fields: data___release_date }) {
      nodes {
        uid
        data {
          release_date(formatString: "MMM D Y")
          teaser {
            html
          }
          title {
            text
          }
          main_image {
            fluid(maxWidth: 1920) {
              srcWebp
              srcSetWebp
              srcSet
              src
              sizes
              base64
              aspectRatio
            }
          }
        }
      }
    }
  }
`
