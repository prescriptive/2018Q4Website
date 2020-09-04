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
    allPrismicBlogPost {
      nodes {
        uid
        data {
          main_image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
          author {
            text
          }
          release_date
          teaser {
            raw
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
  // const page = {
  //   data: {
  //     meta_title:
  //       props.data.prismic.allSite_informations.edges[0].node.meta_title[0]
  //         .text,
  //     meta_description:
  //       props.data.prismic.allSite_informations.edges[0].node
  //         .meta_description[0].text,
  //   },
  // }
  // const site = props.data.prismic.allSite_informations.edges[0].node
  const site = props.data.site
  const page = {
    data: {
      meta_title: site.nodes[0].data.meta_title.text,
      meta_description: site.nodes[0].data.meta_description.text,
      donotindex: false,
      _meta: {
        uid: "insights",
      },
    },
  }
  console.log(props)
  return (
    <Layout>
      <SEO site={site} page={page} />
      <BlogHeader>
        <Container>
          <div className="blog-header-container">
            <h1>The Blog</h1>
          </div>
        </Container>
      </BlogHeader>
      <Container>
        <BlogStyle>
          <div className="blog-container">
            {props.data.allPrismicBlogPost.nodes.map((post, index) => (
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
