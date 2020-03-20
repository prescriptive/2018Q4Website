import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import BlogPostTeaser from "../components/entities/blog_post/BlogPostTeaser"
import { Link } from "gatsby"

const BlogStyle = styled.div`
  .blog-container {
    display: flex;
    flex-wrap: wrap;
    article {
      margin-bottom: 40px;
      flex-basis: calc((100%) / 3 - 14px);
      margin-right: 20px;
      &:nth-child(3n + 3) {
        margin-right: 0px;
      }
    }
  }
`
class Blog extends React.Component {
  render() {
    const { blog } = this.props.data
    const { site } = this.props.data
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage =
      currentPage - 1 === 1 ? "/blog" : "/blog/" + (currentPage - 1).toString()
    const nextPage = "/blog/" + (currentPage + 1).toString()

    return (
      <Layout>
        <Container>
          <BlogStyle>
            <h1>Blog</h1>
            <div className="blog-container">
              {blog.nodes.map((post, index) => (
                <BlogPostTeaser post={post} key={index}></BlogPostTeaser>
              ))}
            </div>
            {!isFirst && (
              <Link to={prevPage} rel="prev">
                ← Previous Page
              </Link>
            )}
            {!isLast && (
              <Link to={nextPage} rel="next">
                Next Page →
              </Link>
            )}
          </BlogStyle>
        </Container>
      </Layout>
    )
  }
}
export default Blog
export const postQuery = graphql`
  query BlogIndex($skip: Int!, $limit: Int!) {
    blog: allPrismicBlogPost(
      sort: { fields: data___release_date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        uid
        data {
          release_date(formatString: "MMM D Y")
          teaser {
            html
          }
          author {
            text
          }
          main_image {
            fluid(maxWidth: 800) {
              ...GatsbyPrismicImageFluid
            }
          }
          title {
            text
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
