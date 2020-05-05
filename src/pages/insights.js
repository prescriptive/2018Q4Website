import React, { useEffect, useRef } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import BlogPostTeaser from "../components/entities/blog_post/BlogPostTeaser"
import { Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import BgImage from "../images/blogbg.webp"
import SEO from "../components/seo"
import { getCursorFromDocumentIndex } from "gatsby-source-prismic-graphql"
import get from "lodash/get"

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
  .pager-container {
    display: flex;
    justify-content: center;
  }
  .next {
    margin: 0px 0px 40px 0px;
    display: inline-block;
    margin-left: 40px;
    cursor: pointer;
  }
  .prev {
    margin: 0px 0px 40px 0px;
    display: inline-block;
    cursor: pointer;
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

export const postQuery = graphql`
  query BlogIndex {
    prismic {
      allBlog_posts {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
        edges {
          cursor
          node {
            _meta {
              uid
            }
            author
            main_image
            main_imageSharp {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            release_date
            teaser
            title
          }
        }
      }
    }
  }
`

const Bloger = props => {
  // const limit = 2
  // const didMountRef = useRef(false)
  // const [page, setPage] = React.useState(-1)
  // const [data, setData] = React.useState(props.data.prismic)

  // const onPreviousClick = () => setPage(page - limit)
  // const onNextClick = () => setPage(page + limit)

  // useEffect(() => {
  //   if (!data) {
  //     return <div>no data</div>
  //   }
  //   if (!didMountRef.current) {
  //     didMountRef.current = true
  //     return
  //   }
  //   props.prismic
  //     .load({ variables: { after: getCursorFromDocumentIndex(page) } })
  //     .then(res => setData(res.data))
  // }, [page])

  return (
    <Layout>
      {/* <SEO site={site} page={page} /> */}
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
            {props.data.prismic.allBlog_posts.edges.map((post, index) => (
              <BlogPostTeaser post={post} key={index}></BlogPostTeaser>
            ))}
          </div>
          {/* <div className="pager-container">
            {console.log(data)}
            {console.log(page)}
            <div
              className="prev"
              disabled={page <= 0}
              onClick={onPreviousClick}
            >
              ← Previous
            </div>
            <div
              className="next"
              disabled={!data.allBlog_posts.pageInfo.hasNextPage}
              onClick={onNextClick}
            >
              Next Page →
            </div>
          </div> */}
          {/* {!isFirst && (
            <Link to={prevPage} className="prev" rel="prev">
              ← Previous Page
            </Link>
          )}
          {!isLast && (
            <Link to={nextPage} className="next" rel="next">
              Next Page →
            </Link>
          )} */}
        </BlogStyle>
      </Container>
    </Layout>
  )
}

export default Bloger
