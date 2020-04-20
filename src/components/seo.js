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
  const metaDescription =
    page.data.meta_description || ''
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
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
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
