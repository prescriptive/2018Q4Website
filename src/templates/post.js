import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import SEO from "../components/seo"
import Img from "gatsby-image"
// import Image from "../components/slices/ImageSlice"
// import Text from "../components/slices/TextSlice"
// import Quote from "../components/slices/QuoteSlice"
// import Video from "../components/slices/VideoSlice"
// import BasicSectionSlice from "../components/slices/BasicSectionSlice"
import BackgroundImage from "gatsby-background-image"
import loadable from "@loadable/component"
import { withPreview } from 'gatsby-source-prismic'

// Sort and display the different slice options
const PostSlices = ({ slices, id }) => {
  return slices.map((slice, index) => {
    const res = (() => {
      switch (slice.slice_type) {
        case "text":
          const Text = loadable(() => import(`../components/slices/TextSlice`))
          return (
            <div key={index} className="slice-wrapper slice-text">
              {<Text slice={slice} />}
            </div>
          )

        case "quote":
          const Quote = loadable(() =>
            import(`../components/slices/QuoteSlice`)
          )
          return (
            <div key={index} className="slice-wrapper slice-quote">
              {<Quote slice={slice} />}
            </div>
          )

        case "image":
          const Image = loadable(() =>
            import(`../components/slices/ImageSlice`)
          )
          return (
            <div key={index} className="slice-wrapper slice-image">
              {<Image slice={slice} />}
            </div>
          )
        case "video":
          const Video = loadable(() =>
            import(`../components/slices/VideoSlice`)
          )
          return (
            <div key={index} className="slice-wrapper slice-video">
              {<Video slice={slice} />}
            </div>
          )
        case "basic_section":
          const BasicSectionSlice = loadable(() =>
            import(`../components/slices/BasicSectionSlice`)
          )
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
  .image-slice {
    > div {
      padding: 0px !important;
    }
    img {
      width: auto !important;
      position: relative !important;
    }
  }
`

const BlogHeader = styled.div`
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
  const site = props.data.site
  const defaultBlock = props.data.defaultBlock.data

  // const defaultBlock = props.data.prismic.allBlocks.edges[0].node
  // const site = props.data.prismic.allSite_informations.edges[0].node

  return (
    <Layout>
      <SEO site={site} page={props.data.page}></SEO>

      <BlogHeader>
        <BackgroundImage fluid={props.data.blogbg.childImageSharp.fluid}>
          <Container>
            <div className="blog-header-container">
              <div className="blog-post-image-title">Insights</div>
            </div>
          </Container>
        </BackgroundImage>
      </BlogHeader>
      <PageStyle>
        <Container>
          <div className="blog-post-container">
            <div className="blog-post-left">
              <div className="main-image">
                {node.main_image.localFile && (
                  <Img
                    fluid={node.main_image.localFile.childImageSharp.fluid}
                  />
                )}
              </div>
              <h1>{node.title.text}</h1>
              {node.release_date && (
                <div className="release-date">
                  <Img
                    fixed={props.data.calendaricon.childImageSharp.fixed}
                    style={{ marginRight: "10px" }}
                  />
                  {node.release_date}
                </div>
              )}
              {node.author && (
                <div className="blog-author">
                  <Img
                    fixed={props.data.usericon.childImageSharp.fixed}
                    style={{ marginRight: "10px" }}
                  />
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
    blogbg: file(relativePath: { eq: "blogbg.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    usericon: file(relativePath: { eq: "user-gray.png" }) {
      childImageSharp {
        fixed(width: 20, height: 20) {
          ...GatsbyImageSharpFixed_withWebp_tracedSVG
        }
      }
    }
    calendaricon: file(relativePath: { eq: "calendar-gray.png" }) {
      childImageSharp {
        fixed(width: 20, height: 22) {
          ...GatsbyImageSharpFixed_withWebp_tracedSVG
        }
      }
    }
    defaultBlock: prismicBlock(uid: { eq: "blog-sidebar-contact" }) {
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
                    fluid(maxWidth: 900) {
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
        donotindex
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
                    fluid(maxWidth: 800) {
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
                text
              }
            }
          }
        }
      }
    }
  }
`
