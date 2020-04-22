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
  if (page.data.do_not_index) {
    if (page.data.do_not_index == true) {
      var noIndex = "noindex"
    }
  }
  var ogImage = ""
  if (page.data.main_image) {
    ogImage = page.data.main_image.url
  }
  const metaDescription = page.data.meta_description || ""
  const title = page.data.meta_title || page.data.title.text
  const siteName = site.nodes[0].data.site_title[0].text
  const twitterAuthor = site.nodes[0].data.twitter_author[0].text
  const siteUrl = site.nodes[0].data.site_url[0].text
  var uid = page.uid
  var path = "/"

  if (page.type == "blog_post") {
    path = "/blog/"
  }
  if (page.uid == "home") {
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
          property: `og:title`,
          content: title,
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
