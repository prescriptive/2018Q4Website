import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import SEO from "../components/seo"
import { RichText } from "prismic-reactjs"
import Img from "gatsby-image"
import Image from "../components/slices/ImageSlice"
import Text from "../components/slices/TextSlice"
import Quote from "../components/slices/QuoteSlice"
import Video from "../components/slices/VideoSlice"
import BasicSectionSlice from "../components/slices/BasicSectionSlice"
import BgImage from "../images/blogbg.png"

// Sort and display the different slice options
const PostSlices = ({ slices, id }) => {
  return slices.map((slice, index) => {
    const res = (() => {
      switch (slice.type) {
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
              id={"slice-id-" + id}
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

const Post = ({ data }) => {
  const prismicContent = data.page.allBlog_posts.edges[0]
  if (!prismicContent) return null
  const { node } = data.page.allBlog_posts.edges[0]
  // const { site } = data
  const defaultBlock = data.defaultBlock.allBlocks.edges[0].node
  const site = data.site.allSite_informations.edges[0].node
  return (
    <Layout>
      <SEO site={site} page={node} />
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
                {node.main_imageSharp && (
                  <Img fluid={node.main_imageSharp.childImageSharp.fluid} />
                )}
              </div>
              <h1>{node.title[0].text}</h1>
              <h2>{RichText.render(node.title)}</h2>
              {node.body && <PostSlices slices={node.body} />}
            </div>
            {/* {page.data.block_reference.document && (
              <div className="blog-post-right">
                <PostSlices
                  slices={page.data.block_reference.document.data.body}
                />
              </div>
            )} */}
            {!node.block_reference && (
              <div className="blog-post-right">
                <PostSlices
                  slices={defaultBlock.body}
                  id={defaultBlock._meta.id}
                />
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
  query PostBySlug($uid: String!, $lang: String) {
    site: prismic {
      allSite_informations {
        edges {
          node {
            description
            site_url
            site_title
            twitter_author
          }
        }
      }
    }
    defaultBlock: prismic {
      allBlocks(id: "XpeHQBIAACEArsdV") {
        edges {
          node {
            title
            _meta {
              id
            }
            body {
              ... on PRISMIC_BlockBodyBasic_section {
                type
                label
                primary {
                  background_color
                  background_imageSharp {
                    childImageSharp {
                      fluid(maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      }
                    }
                  }
                  background_image
                  content
                  font_color
                  h1_title
                  section_title
                  youtube_background
                  background_video {
                    ... on PRISMIC__ExternalLink {
                      _linkType
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    page: prismic {
      allBlog_posts(uid: $uid, lang: $lang) {
        edges {
          node {
            title
            _meta {
              uid
            }
            block_reference {
              ... on PRISMIC_Block {
                title
                _linkType
                body {
                  ... on PRISMIC_BlockBodyBasic_section {
                    type
                    label
                    primary {
                      background_color
                      background_imageSharp {
                        childImageSharp {
                          fluid(maxWidth: 1920) {
                            ...GatsbyImageSharpFluid_withWebp_tracedSVG
                          }
                        }
                      }
                      content
                      font_color
                      h1_title
                      section_title
                      youtube_background
                      background_video {
                        ... on PRISMIC__ExternalLink {
                          _linkType
                          url
                        }
                      }
                    }
                  }
                }
                _meta {
                  id
                  type
                }
              }
            }
            body {
              ... on PRISMIC_Blog_postBodyText {
                type
                label
                primary {
                  text
                }
              }
              ... on PRISMIC_Blog_postBodyQuote {
                type
                label
                primary {
                  quote
                }
              }
              ... on PRISMIC_Blog_postBodyImage {
                type
                label
                primary {
                  image
                  imageSharp {
                    childImageSharp {
                      fluid(maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      }
                    }
                  }
                }
              }
              ... on PRISMIC_Blog_postBodyVideo {
                type
                label
                primary {
                  video_embed
                }
              }
            }
            main_image
            main_imageSharp {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            release_date
            meta_title
            meta_description
          }
        }
      }
    }
  }
`
