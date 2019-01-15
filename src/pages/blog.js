import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 

import blogindexheader from '../images/fancycrave-530798-unsplash.jpg'


export default class BlogPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        	<Helmet>
	        <body class="innermenu" />
  	      </Helmet>
        <section className="section">
            <div className="content blog-index-header" style={{ backgroundImage: `url(${blogindexheader})` }}>
              <h1 className="has-text-weight-bold is-size-2">Blog</h1>
            </div>
          <div className="container blog-index">

            {posts
              .map(({ node: post }) => (
                <div
                  className="content"
                  key={post.id}
                >
                <div class="blog-teaser-image"><img src={post.frontmatter.image} /></div>
                    <Link className="has-text-primary" to={post.fields.slug}>
                      {post.frontmatter.title}
                    </Link>
                    <div class="who">
                    <div class="blog-date" style={{marginBottom: "10px"}}><i className="fa fa-calendar"></i>{post.frontmatter.date}</div> 
                    <div><i className="fa fa-user"></i>{post.frontmatter.author}</div>
                    </div>
                    <div class="teaser-body">
                    {post.frontmatter.description}
                    </div>
                    <Link className="btn blog-btn" to={post.fields.slug}>
                      Read Full Article
                    </Link>

                </div>
              ))}
          </div>
        </section>
      </Layout>
    )
  }
}

BlogPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            description
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            image
            author
          }
        }
      }
    }
  }
`