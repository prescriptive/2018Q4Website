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
const PostSlices = ({ slices, blog, leadership, job }) => {
  return slices.map((slice, index) => {
    var sliceID = ""
    if (slice.primary.slice_id) {
      var sliceID = slice.primary.slice_id[0].text
    }
    const res = (() => {
      switch (slice.type) {
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
  const prismicContent = data.page.allPas.edges[0]
  if (!prismicContent) return null
  const { node } = data.page.allPas.edges[0]
  const leadership = data.leadership.allLeaderships.edges
  const job = data.job.allJobs.edges
  return (
    <Layout>
      {/* <SEO site={site} page={page} /> */}
      <PageStyle>
        {node.body && (
          <PostSlices slices={node.body} job={job} leadership={leadership} />
        )}
      </PageStyle>
    </Layout>
  )
}
export default Page
export const postQuery = graphql`
  query PageQuery($uid: String!, $lang: String) {
    leadership: prismic {
      allLeaderships {
        edges {
          node {
            _meta {
              uid
            }
            bio
            linkedin {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
            }
            name
            photoSharp {
              childImageSharp {
                fixed(width: 98, height: 98) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
            photo
            title
            twitter {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
            }
          }
        }
      }
    }
    job: prismic {
      allJobs {
        edges {
          node {
            title
            teaser_description
            location
            description
            _meta {
              uid
            }
          }
        }
      }
    }
    page: prismic {
      allPas(uid: $uid, lang: $lang) {
        edges {
          node {
            _meta {
              uid
            }
            meta_description
            meta_title
            title
            do_not_index
            body {
              ... on PRISMIC_PaBodyBasic_section {
                type
                label
                primary {
                  background_color
                  background_image
                  background_imageSharp {
                    childImageSharp {
                      fluid(maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      }
                    }
                  }
                  background_video {
                    ... on PRISMIC__FileLink {
                      _linkType
                      url
                    }
                  }
                  content
                  font_color
                  h1_title
                  section_title
                  youtube_background
                  slice_id
                }
              }
              ... on PRISMIC_PaBodyColumns_section {
                type
                label
                fields {
                  content
                }
                primary {
                  background_color
                  background_image
                  background_imageSharp {
                    childImageSharp {
                      fluid(maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      }
                    }
                  }
                  column_count
                  font_color
                  h1_title
                  section_title
                  slice_id
                }
              }
              ... on PRISMIC_PaBodyLeft_right_section {
                type
                label
                primary {
                  active_campaign_form_number
                  embed
                  slice_id
                  left_background_image
                  left_background_imageSharp {
                    childImageSharp {
                      fluid(maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      }
                    }
                  }
                  left_content
                  right_background_image
                  right_background_imageSharp {
                    childImageSharp {
                      fluid(maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      }
                    }
                  }
                  right_content
                  right_embed
                }
              }
              ... on PRISMIC_PaBodyEntity_query {
                type
                label
                primary {
                  background_color
                  background_image
                  background_imageSharp {
                    childImageSharp {
                      fluid(maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      }
                    }
                  }
                  entity_type
                  number_of_entities
                  section_title
                  slice_id
                }
              }
              ... on PRISMIC_PaBodySlideshow {
                type
                label
                fields {
                  image
                  imageSharp {
                    childImageSharp {
                      fluid(maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      }
                    }
                  }
                  image_copy
                  image_copySharp {
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
      }
    }
  }
`
