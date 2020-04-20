import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import BlogPostTeaser from "../components/entities/blog_post/BlogPostTeaser"
import { Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import BgImage from "../images/blogbg.png"
import SEO from "../components/seo"

const BlogStyle = styled.div`
  .blog-container {
    display: flex;
    flex-wrap: wrap;
    article {
      margin-bottom: 40px;
      @media (min-width: ${variable.tabletWidth}) {
        width: calc((100%) / 3 - 14px);
        margin-right: 20px;
        &:nth-child(3n + 3) {
          margin-right: 0px;
        }
      }
      @media (max-width: ${variable.tabletWidth}) {
        width: calc((100%) / 2 - 10px);
        margin-right: 20px;
        &:nth-child(2n + 2) {
          margin-right: 0px;
        }
      }
      @media (max-width: ${variable.mobileWidth}) {
        width: 100%;
        margin-right: 0px;
      }
    }
  }
  .next {
    margin: 0px 0px 40px 0px;
    display: block;
  }
  .prev {
    margin: 0px 0px 40px 0px;
    display: block;
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
    h1 {
      color: white;
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
    const page = {data:{meta_title:"Insights", meta_description:""}};
    return (
      <Layout>
              <SEO site={site} page={page} />
        <BlogHeader>
          <Container>
            <div className="blog-header-container">
              <h1>Insights</h1>
            </div>
          </Container>
        </BlogHeader>
        <Container>
          <BlogStyle>
            <div className="blog-container">
              {blog.nodes.map((post, index) => (
                <BlogPostTeaser post={post} key={index}></BlogPostTeaser>
              ))}
            </div>
            {!isFirst && (
              <Link to={prevPage} className="prev" rel="prev">
                ← Previous Page
              </Link>
            )}
            {!isLast && (
              <Link to={nextPage} className="next" rel="next">
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
            localFile {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
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
