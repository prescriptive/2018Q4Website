import React from "react"
import loadable from "@loadable/component"
import { graphql } from "gatsby"
// import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import SEO from "../components/seo"

const LoadableBasicSliceComponent = loadable(() =>
  import("../components/slices/BasicSectionSlice")
)

const LoadableColumnSliceComponent = loadable(() =>
  import("../components/slices/ColumnsSectionSlice")
)

const LoadableLeftRightSliceComponent = loadable(() =>
  import("../components/slices/LeftRightSlice")
)

const LoadableEntityQuerySliceComponent = loadable(() =>
  import("../components/slices/EntityQuerySlice")
)

const LoadableHeroSliceComponent = loadable(() =>
  import("../components/slices/HeroSlice")
)
const LoadableBlockRefSliceComponent = loadable(() =>
  import("../components/slices/BlockReferenceSlice")
)

// Sort and display the different slice options
// const PostSlices = ({ slices, blog, leadership, job, podcast, podinfo }) => {
//   return slices.map((slice, index) => {
//     var sliceID = ""
//     if (slice.primary) {
//       if (slice.primary.slice_id != undefined) {
//         var sliceID = slice.primary.slice_id.text
//       }
//     }
//     const res = (() => {
//       switch (slice.slice_type) {
//         case "basic_section":
//           // return <LoadableBasicSliceComponent slice={slice}/>;
//           return (
//             <div
//               id={"slice-id-" + sliceID}
//               key={index}
//               className="slice-wrapper slice-basic"
//             >
//               {<LoadableBasicSliceComponent slice={slice} />}
//             </div>
//           )

//         case "hero":
//           return (
//             <div
//               id={"slice-id-" + sliceID}
//               key={index}
//               className="slice-wrapper slice-hero"
//             >
//               {<LoadableHeroSliceComponent slice={slice} />}
//             </div>
//           )

//         case "block_reference":
//           return (
//             <div
//               id={"slice-id-" + sliceID}
//               key={index}
//               className="slice-wrapper slice-block-reference"
//             >
//               {<LoadableBlockRefSliceComponent slice={slice} />}
//             </div>
//           )

//         case "entity_query":
//           return (
//             <div
//               id={"slice-id-" + sliceID}
//               key={index}
//               className="slice-wrapper slice-entity-query"
//             >
//               {
//                 <LoadableEntityQuerySliceComponent
//                   slice={slice}
//                   blog={blog}
//                   leadership={leadership}
//                   job={job}
//                   podcast={podcast}
//                   podinfo={podinfo}
//                 />
//               }
//             </div>
//           )

//         // case "slideshow":
//         //   return (
//         //     <div
//         //       id={"slice-id-" + slice.id}
//         //       key={index}
//         //       className="slice-wrapper slice-slideshow"
//         //     >
//         //       {/* {<EntityQuerySlice slice={slice} blog={blog} />} */}
//         //     </div>
//         //   )

//         case "columns_section":
//           return (
//             <div
//               id={"slice-id-" + sliceID}
//               key={index}
//               className="slice-wrapper slice-columns"
//             >
//               {<LoadableColumnSliceComponent slice={slice} />}
//             </div>
//           )

//         case "left_right_section":
//           return (
//             <div
//               id={"slice-id-" + sliceID}
//               key={index}
//               className="slice-wrapper slice-left-right"
//             >
//               {<LoadableLeftRightSliceComponent slice={slice} />}
//             </div>
//           )

//         default:
//           return
//       }
//     })()
//     return res
//   })
// }

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
  const podcast = data.podcast
  const job = data.job
  const site = data.site
  const podinfo = data.podinfo
  //   const site = data.site.allSite_informations.edges[0].node
  console.log(node)
  if (node.uid == "home") {
    require("../components/scss/page/home.scss")
  }
  if (node.uid == "about") {
    require("../components/scss/page/about.scss")
  }
  if (node.uid == "services-solutions") {
    require("../components/scss/page/solutions.scss")
  }
  if (node.uid == "insights") {
    require("../components/scss/page/insights.scss")
  }
  if (node.uid == "careers-culture") {
    require("../components/scss/page/careers.scss")
  }
  if (node.uid == "contact-offices") {
    require("../components/scss/page/contact.scss")
  }
  if (node.uid == "welcome-to-phase-2-new") {
    require("../components/scss/page/phase2.scss")
  }
  if (node.uid == "government-contracts-texas") {
    require("../components/scss/page/dir.scss")
  }
  if (node.uid == "podcast") {
    require("../components/scss/page/podcasts.scss")
  }
  if (node.uid == "learn-how-to-protect-microsoft-365-data") {
    require("../components/scss/page/microsoft365.scss")
  }

  return (
    // <Layout slug={node.uid}>
    <PageStyle>
      <SEO site={site} page={node} />
      {/* {node.data.body && (
        <PostSlices
          slices={node.data.body}
          job={job}
          leadership={leadership}
          podcast={podcast}
          podinfo={podinfo}
        />
      )} */}
    </PageStyle>
    // </Layout>
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
    podinfo: allPrismicPodcast {
      nodes {
        data {
          buzzsprout_id {
            text
          }
          podcast_image {
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
    podcast: allBuzzsproutPodcastEpisode {
      nodes {
        title
        slug
        artwork_url
        artist
        description
        summary
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
        donotindex
        webinar
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
            items {
              sidebar_block_reference {
                document {
                  ... on PrismicBlocks {
                    id
                    data {
                      block_title {
                        text
                      }
                      body {
                        ... on PrismicBlocksBodyBasicSection {
                          id
                          slice_type
                          primary {
                            background_color
                            background_video {
                              url
                            }
                            youtube_background {
                              embed_url
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
                            content {
                              raw
                            }
                            font_color
                            h1_title
                            section_title {
                              text
                            }
                            slice_id {
                              text
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
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
          ... on PrismicPaBodyBlockReference {
            id
            primary {
              block_reference {
                document {
                  ... on PrismicBlocks {
                    id
                    data {
                      body {
                        ... on PrismicBlocksBodyColumnsSection {
                          id
                          slice_type
                          primary {
                            background_color
                            slice_id {
                              text
                            }
                            background_image {
                              localFile {
                                url
                              }
                            }
                            column_count
                            font_color
                            h1_title
                            section_title {
                              text
                            }
                          }
                          items {
                            content {
                              raw
                            }
                          }
                        }
                        ... on PrismicBlocksBodyBasicSection {
                          id
                          slice_type
                          primary {
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
                          items {
                            sidebar_block_reference {
                              document {
                                ... on PrismicBlocks {
                                  id
                                  data {
                                    body {
                                      ... on PrismicBlocksBodyBasicSection {
                                        id
                                        slice_type
                                        primary {
                                          background_color
                                          background_video {
                                            url
                                          }
                                          youtube_background {
                                            embed_url
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
                                          content {
                                            html
                                            raw
                                          }
                                          font_color
                                          h1_title
                                          section_title {
                                            text
                                          }
                                          slice_id {
                                            text
                                          }
                                        }
                                      }
                                    }
                                    block_title {
                                      text
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                        ... on PrismicBlocksBodyLeftRightSection {
                          id
                          slice_type
                          primary {
                            active_campaign_form_number
                            embed {
                              raw
                            }
                            left_background_image {
                              localFile {
                                childImageSharp {
                                  fluid(maxWidth: 1920) {
                                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                  }
                                }
                              }
                            }
                            left_content {
                              html
                              raw
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
                            right_embed {
                              raw
                            }
                            section_title {
                              text
                            }
                            slice_id {
                              text
                            }
                          }
                        }
                      }
                      block_title {
                        text
                      }
                    }
                  }
                }
              }
            }
            slice_type
          }
          ... on PrismicPaBodyHero {
            id
            slice_type
            primary {
              background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              font_color
              min_height
              hero_title {
                text
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
              left_width
              right_width
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
              right_active_campaign_form_number
              right_content_above_form {
                raw
              }
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
