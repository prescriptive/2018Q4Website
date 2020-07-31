import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import "../components/scss/page/home.scss"
import "../components/scss/page/about.scss"
import "../components/scss/page/solutions.scss"
import "../components/scss/page/careers.scss"
import "../components/scss/page/contact.scss"
import "../components/scss/page/phase2.scss"
import "../components/scss/page/dir.scss"
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
import HeroSlice from "../components/slices/HeroSlice"
import BlockReferenceSlice from "../components/slices/BlockReferenceSlice"

// Sort and display the different slice options
const PostSlices = ({ slices, blog, leadership, job }) => {
  return slices.map((slice, index) => {
    var sliceID = ""
    if (slice.primary) {
      if (slice.primary.slice_id != undefined) {
        var sliceID = slice.primary.slice_id.text
      }
    }
    const res = (() => {
      switch (slice.slice_type) {
        // case "text":
        //   return (
        //     <div key={index} className="slice-wrapper slice-text">
        //       {<Text slice={slice} />}
        //     </div>
        //   )

        // case "quote":
        //   return (
        //     <div key={index} className="slice-wrapper slice-quote">
        //       {<Quote slice={slice} />}
        //     </div>
        //   )

        // case "image":
        //   return (
        //     <div key={index} className="slice-wrapper slice-image">
        //       {<Image slice={slice} />}
        //     </div>
        //   )
        // case "video":
        //   return (
        //     <div key={index} className="slice-wrapper slice-video">
        //       {<Video slice={slice} />}
        //     </div>
        //   )

        case "basic_section":
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-basic"
            >
              {<BasicSectionSlice slice={slice} />}
            </div>
          )

        case "hero":
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-hero"
            >
              {<HeroSlice slice={slice} />}
            </div>
          )

        case "block_reference":
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-block-reference"
            >
              {<BlockReferenceSlice slice={slice} />}
            </div>
          )

        case "entity_query":
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-entity-query"
            >
              {
                <EntityQuerySlice
                  slice={slice}
                  blog={blog}
                  leadership={leadership}
                  job={job}
                />
              }
            </div>
          )

        // case "slideshow":
        //   return (
        //     <div
        //       id={"slice-id-" + slice.id}
        //       key={index}
        //       className="slice-wrapper slice-slideshow"
        //     >
        //       {/* {<EntityQuerySlice slice={slice} blog={blog} />} */}
        //     </div>
        //   )

        case "columns_section":
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-columns"
            >
              {<ColumnSectionSlice slice={slice} />}
            </div>
          )

        case "left_right_section":
          return (
            <div
              id={"slice-id-" + sliceID}
              key={index}
              className="slice-wrapper slice-left-right"
            >
              {<LeftRightSlice slice={slice} />}
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
  //   const prismicContent = data.page.allPas.edges[0]
  //   if (!prismicContent) return null
  const node = data.page
  const leadership = data.leadership
  const job = data.job
  const site = data.site
  //   const site = data.site.allSite_informations.edges[0].node
  return (
    <Layout>
      <SEO site={site} page={node} />
      <PageStyle>
        {node.data.body && (
          <PostSlices
            slices={node.data.body}
            job={job}
            leadership={leadership}
          />
        )}
      </PageStyle>
    </Layout>
  )
}
export default Page
export const postQuery = graphql`
  query PageBySlug($uid: String!) {
    job: allPrismicJob {
      nodes {
        uid
        data {
          description {
            html
          }
          location {
            text
          }
          teaser_description {
            html
          }
          title {
            text
          }
        }
      }
    }
    leadership: allPrismicLeadership {
      nodes {
        data {
          bio {
            raw
          }
          linkedin {
            url
          }
          name {
            text
          }
          photo {
            url
            localFile {
              childImageSharp {
                fixed(width: 98, height: 98) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
          }
          title {
            text
          }
          twitter {
            url
          }
        }
      }
    }
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
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
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
              slice_id {
                text
              }
              background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
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
                raw
              }
            }
          }
          ... on PrismicPaBodyEntityQuery {
            id
            slice_type
            primary {
              entity_type
              number_of_entities
              slice_id {
                text
              }
              section_title {
                text
              }
              background_color
              background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
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
              slice_id {
                text
              }
              background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
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
                raw
              }
            }
          }
          ... on PrismicPaBodyLeftRightSection {
            id
            slice_type
            primary {
              slice_id {
                text
              }
              embed {
                text
              }
              right_embed {
                text
              }
              active_campaign_form_number
              left_background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              right_background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              right_content {
                html
                raw
              }
              left_content {
                html
                raw
              }
            }
          }
        }
      }
    }
    site: allPrismicSiteInformation {
      nodes {
        data {
          meta_title {
            text
          }
          meta_description {
            text
          }
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
            url
            localFile {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
