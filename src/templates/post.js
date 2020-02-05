import React from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../utils/linkResolver"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Text from "../components/slices/TextSlice"
import Quote from "../components/slices/QuoteSlice"
import Image from "../components/slices/ImageSlice"
export const query = graphql`
  query BlogPostQuery($uid: String) {
    prismic {
      allBlog_posts(uid: $uid) {
        edges {
          node {
            _meta {
              uid
              id
            }
            body {
              ... on PRISMIC_Blog_postBodyQuote {
                type
                label
                primary {
                  quote
                }
              }
              ... on PRISMIC_Blog_postBodyText {
                type
                label
                primary {
                  text
                }
              }
              ... on PRISMIC_Blog_postBodyImage {
                type
                label
                primary {
                  image
                  caption
                  imageSharp {
                    childImageSharp {
                      fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
            main_imageSharp {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            main_image
            release_date
            teaser
            title
          }
        }
      }
    }
  }
`
const PostSlices = ({ slices }) => {
  return slices.map((slice, index) => {
    const res = (() => {
      switch (slice.type) {
        case "text":
          return (
            <div key={index} className="slice-wrapper">
              {<Text slice={slice} />}
            </div>
          )

        case "quote":
          return (
            <div key={index} className="slice-wrapper">
              {<Quote slice={slice} />}
            </div>
          )

        case "image":
          return (
            <div key={index} className="slice-wrapper">
              {<Image slice={slice} />}
            </div>
          )

        default:
          return
      }
    })()
    return res
  })
}
const RenderBody = ({ blogPost }) => (
  <React.Fragment>
    <article className="blog-post-article">
      {RichText.render(blogPost.title, linkResolver)}
      {blogPost.main_imageSharp && (
        <Img fluid={blogPost.main_imageSharp.childImageSharp.fluid} />
      )}
      {blogPost.body && <PostSlices slices={blogPost.body} />}
    </article>

    <div data-wio-id={blogPost._meta.id}></div>
  </React.Fragment>
)

const BlogPost = props => {
  const doc = props.data.prismic.allBlog_posts.edges.slice(0, 1).pop()
  if (!doc) return null

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{RichText.asText(doc.node.title)}</title>
      </Helmet>
      <RenderBody blogPost={doc.node} />
    </Layout>
  )
}

export default BlogPost
