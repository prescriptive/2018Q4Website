import React, { useMemo } from "react"
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
import BasicSectionSlice from "../components/slices/BasicSectionSlice"
import BgImage from "../images/blogbg.png"
import { mergePrismicPreviewData } from "gatsby-source-prismic"

// Returns true if we're in a browser, false otherwise. This will help guard
// against SSR issues when building the site.
const IS_BROWSER = typeof window !== "undefined"

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
        default:
          return
      }
    })()
    return res
  })
}

const PageStyle = styled.div`
  padding-bottom: ${variable.sectionPadding};
  .blog-post-container {
    display: flex;
    justify-content: space-between;
    -webkit-box-pack: justify;
    @media (max-width: ${variable.mobileWidth}) {
      flex-direction: column;
    }
    .blog-post-left {
      width: 75%;
      @media (max-width: ${variable.tabletWidth}) {
        width: 65%;
      }
      @media (max-width: ${variable.mobileWidth}) {
        width: 100%;
      }
      .main-image {
        margin-bottom: 40px;
      }
    }
    .blog-post-right {
      width: calc(25% - 20px);
      top: 60px;
      position: sticky;
      align-self: flex-start;
      @media (max-width: ${variable.tabletWidth}) {
        width: calc(35% - 20px);
      }
      @media (max-width: ${variable.mobileWidth}) {
        width: 100%;
        margin-top: 40px;
      }
    }
  }
  h1 {
    margin-top: 0px;
  }
  h2 {
    margin-bottom: 0px;
  }
  img {
    border-radius: 4px;
    overflow: hidden;
  }
`

const BlogHeader = styled.div`
  background-image: url(${BgImage});
  margin-bottom: 40px;
  .blog-header-container {
    min-height: 360px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    .blog-post-image-title {
      color: white;
      font-family: "Libre Franklin";
      font-weight: 800;
      font-size: 54px;
      line-height: 72px;
      margin-bottom: 20px;
    }
  }
`
const Post = ({ data: staticData }) => {
  const { page } = staticData
  const { site } = staticData
  const { defaultBlock } = staticData
  const data = useMemo(() => {
    // If we're not in a browser (i.e. we're in SSR) or preview data has not been
    // set, use the non-preview static data.
    if (!IS_BROWSER || !window.__PRISMIC_PREVIEW_DATA__) return staticData

    return mergePrismicPreviewData({
      staticData,
      previewData: window.__PRISMIC_PREVIEW_DATA__,
    })
  }, [staticData])
  return (
    <Layout>
      <SEO site={site} page={page} />
      <BlogHeader>
        <Container>
          <div className="blog-header-container">
            <div className="blog-post-image-title">Insights</div>
          </div>
        </Container>
      </BlogHeader>
      <PageStyle>
        <Container>
          <div className="blog-post-container">
            <div className="blog-post-left">
              <div className="main-image">
                {page.data.main_image.localFile && (
                  <Img
                    fluid={page.data.main_image.localFile.childImageSharp.fluid}
                  />
                )}
              </div>
              <h1>{page.data.title.text}</h1>
              {page.data.body && <PostSlices slices={page.data.body} />}
            </div>
            {page.data.block_reference.document && (
              <div className="blog-post-right">
                <PostSlices
                  slices={page.data.block_reference.document.data.body}
                />
              </div>
            )}
            {!page.data.block_reference.document && (
              <div className="blog-post-right">
                <PostSlices slices={defaultBlock.data.body} />
              </div>
            )}
          </div>
        </Container>
      </PageStyle>
    </Layout>
  )
}
export default Post
export const postQuery = graphql`
  query PostBySlug($uid: String!) {
    defaultBlock: prismicBlock(
      id: { eq: "ec237610-ff7b-583b-9a83-076cc4920623" }
    ) {
      data {
        body {
          ... on PrismicBlockBodyBasicSection {
            id
            slice_type
            primary {
              background_color
              background_image {
                localFile {
                  childImageSharp {
                    fluid {
                      src
                    }
                  }
                }
              }
              background_video {
                url
              }
              content {
                html
              }
              font_color
              h1_title
              section_title {
                text
              }
              youtube_background {
                embed_url
              }
            }
          }
        }
      }
    }
    page: prismicBlogPost(uid: { eq: $uid }) {
      uid
      data {
        title {
          text
        }
        block_reference {
          document {
            ... on PrismicBlock {
              id
              data {
                body {
                  ... on PrismicBlockBodyBasicSection {
                    id
                    slice_type
                    primary {
                      background_color
                      background_image {
                        localFile {
                          childImageSharp {
                            fluid {
                              src
                            }
                          }
                        }
                      }
                      background_video {
                        url
                      }
                      content {
                        html
                      }
                      font_color
                      h1_title
                      section_title {
                        text
                      }
                      youtube_background {
                        embed_url
                      }
                    }
                  }
                }
              }
            }
          }
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
