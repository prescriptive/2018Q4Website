import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import SEO from "../components/seo"
import Img from "gatsby-image"
import Image from "../components/slices/ImageSlice"
import Text from "../components/slices/TextSlice"
import Quote from "../components/slices/QuoteSlice"
import Video from "../components/slices/VideoSlice"
import BasicSectionSlice from "../components/slices/BasicSectionSlice"
import BgImage from "../images/blogbg.png"
import linkResolver from "../utils/linkResolver"
import { RichText, Date } from "prismic-reactjs"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withPreview } from "gatsby-source-prismic"

// Sort and display the different slice options
const PostSlices = ({ slices, id }) => {
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
  .release-date {
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 18px;
  }
  .blog-author {
    font-weight: 700;
    font-size: 18px;
  }
  svg {
    margin-right: 7px;
    font-size: 20px;
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

const Post = props => {
  // const prismicContent = props.data.prismic.allBlog_posts.edges[0]
  // if (!prismicContent) return null
  const node = props.data.page.data
  const site = props.data.site.data
  const defaultBlock = props.data.defaultBlock.data

  console.log(node)

  // const defaultBlock = props.data.prismic.allBlocks.edges[0].node
  // const site = props.data.prismic.allSite_informations.edges[0].node

  return (
    <Layout>
      {/* <SEO site={site} page={node} /> */}
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
                {node.main_image && (
                  <Img
                    fluid={node.main_image.localFile.childImageSharp.fluid}
                  />
                )}
              </div>
              <h1>{node.title.text}</h1>
              {node.release_date && (
                <div className="release-date">
                  <FontAwesomeIcon icon={faCalendar} />
                  {node.release_date}
                </div>
              )}
              {node.author && (
                <div className="blog-author">
                  <FontAwesomeIcon icon={faUser} />
                  {node.author.text}
                </div>
              )}
              {node.body && <PostSlices slices={node.body} />}
            </div>
            {node.block_reference && (
              <div className="blog-post-right">
                <PostSlices slices={node.block_reference.body} />
              </div>
            )}
            {!node.block_reference && (
              <div className="blog-post-right">
                <PostSlices
                  slices={defaultBlock.body}
                  id={defaultBlock.body[0].id}
                />
              </div>
            )}
          </div>
        </Container>
      </PageStyle>
    </Layout>
  )
}

export default withPreview(Post)

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
                    fluid(maxWidth: 800) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              background_video {
                url
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
              youtube_background {
                embed_url
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
    page: prismicBlogPost(uid: { eq: $uid }) {
      uid
      type
      data {
        title {
          text
        }
        author {
          text
        }
        meta_description
        meta_title
        release_date(formatString: "MMM D ,Y")
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
                raw
              }
            }
          }
        }
      }
    }
  }
`
