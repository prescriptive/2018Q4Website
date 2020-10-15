import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import "../components/scss/page/home.scss"
import "../components/scss/page/about.scss"
import "../components/scss/page/solutions.scss"
import "../components/scss/page/careers.scss"
import "../components/scss/page/contact.scss"
import "../components/scss/page/phase2.scss"
import "../components/scss/page/dir.scss"
import "../components/scss/page/podcasts.scss"
import "../components/scss/page/insights.scss"
import "../components/scss/page/microsoft365.scss"
import SEO from "../components/seo"
import BasicSectionSlice from "../components/slices/BasicSectionSlice"
import ColumnSectionSlice from "../components/slices/ColumnsSectionSlice"
import LeftRightSlice from "../components/slices/LeftRightSlice"
import EntityQuerySlice from "../components/slices/EntityQuerySlice"
import HeroSlice from "../components/slices/HeroSlice"
import BlockReferenceSlice from "../components/slices/BlockReferenceSlice"

// Sort and display the different slice options
const PostSlices = ({ slices, blog, leadership, job, podcast, podinfo }) => {
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
                  podcast={podcast}
                  podinfo={podinfo}
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
  const podcast = data.podcast
  const job = data.job
  const site = data.site
  const podinfo = data.podinfo
  //   const site = data.site.allSite_informations.edges[0].node
  return (
    <Layout slug={node.uid}>
      <SEO site={site} page={node} />
      <PageStyle>
        {node.data.body && (
          <PostSlices
            slices={node.data.body}
            job={job}
            leadership={leadership}
            podcast={podcast}
            podinfo={podinfo}
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
                  ...GatsbyImageSharpFluid
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
                  ...GatsbyImageSharpFixed_withWebp_noBase64
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
                      ...GatsbyImageSharpFluid
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
                                    ...GatsbyImageSharpFluid
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
                      ...GatsbyImageSharpFluid
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
                      ...GatsbyImageSharpFluid
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
                                    ...GatsbyImageSharpFluid
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
                                                  ...GatsbyImageSharpFluid
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
                                    ...GatsbyImageSharpFluid
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
                                    ...GatsbyImageSharpFluid
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
                      ...GatsbyImageSharpFluid
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
                      ...GatsbyImageSharpFluid
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
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              right_background_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920) {
                      ...GatsbyImageSharpFluid
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
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
