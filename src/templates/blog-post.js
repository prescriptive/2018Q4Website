import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import '../../node_modules/font-awesome/css/font-awesome.min.css';

import blogindexheader from '../images/fancycrave-530798-unsplash.jpg'
import sidebarbg from '../images/pre-sidebar-rectangle.png'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  image,
  tags,
  date,
  author,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <Layout>
    <Helmet>
    <body class="innermenu" />
    </Helmet>

      {helmet || ''}
      <section className="section">
            <div className="content blog-index-header" style={{ backgroundImage: `url(${blogindexheader})` }}>
              <h2 className="header-title">Blog</h2>
            </div>
          <div class="blog-post-sidebar-container container">
          <div className="blog-post-container">

          <div><img src={image} /></div>
            <h1 className="thetitle">
              {title}
            </h1>
            <div class="who"><span class="blog-date"><i className="fa fa-calendar"></i>{date}</span> <span><i className="fa fa-user"></i>{author}</span></div>
            <PostContent content={content} />
            <div class="blog-share"><span>SHARE THIS ARTICLE WITH A FRIEND</span><i className="fa fa-facebook-f"></i> <i className="fa fa-twitter"></i> <i className="fa fa-linkedin"></i></div>
      </div>
      <div class="sidebar">
      <div class="cta-contact" style={{ backgroundImage: `url(${sidebarbg})` }}>
                <h3>Looking for Expert Advice?</h3>
                <p>We're here happy to help</p>
                <Link to="/#contact-us"className="btn">Contact Us</Link>
      </div>
      </div>
      </div>
      </section>
      </Layout>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  author: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        date={post.frontmatter.date}
        author={post.frontmatter.author}
      />
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        image
        author
      }
    }
  }
`
