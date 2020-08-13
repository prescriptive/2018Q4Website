/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ site, page, lang, meta }) {
  var noIndex = "index"
  console.log(page)
  console.log(site)
  if (page.data.donotindex) {
    if (page.data.donotindex == true) {
      var noIndex = "noindex"
    }
  }
  var ogImage = ""
  if (page.data.main_image) {
    ogImage = page.data.main_image.url
  }
  var metaDescription = ""
  if (page.data.meta_description) {
    var metaDescription = page.data.meta_description
  }

  const title = page.data.meta_title || page.data.title.text
  const siteName = site.nodes[0].data.site_title.text
  const twitterAuthor = site.nodes[0].data.twitter_author.text
  const siteUrl = site.nodes[0].data.site_url.text
  var uid = page.data.uid
  var path = "/"
  if (page.data.type == "blog_post") {
    path = "/blog/"
  }
  if (page.data.type == "job") {
    path = "/job-opportunity/"
  }
  if (page.data.uid == "home") {
    uid = ""
    path = ""
  }
  const canonical = siteUrl + path + uid
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteName}`}
      link={[
        {
          rel: "canonical",
          href: canonical,
        },
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `robots`,
          content: noIndex,
        },
        {
          property: `og:image`,
          content: ogImage,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:type`,
          content: "article",
        },
        {
          property: `og:url`,
          content: canonical,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: twitterAuthor,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
}

export default SEO
