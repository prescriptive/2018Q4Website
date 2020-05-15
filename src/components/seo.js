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
  if (page.do_not_index) {
    if (page.do_not_index == true) {
      var noIndex = "noindex"
    }
  }
  var ogImage = ""
  if (page.main_image) {
    ogImage = page.main_image.url
  }
  var metaDescription = ""
  if (page.meta_description) {
    var metaDescription = page.meta_description
  }

  const title = page.meta_title || page.title[0].text
  const siteName = site.site_title[0].text
  const twitterAuthor = site.twitter_author[0].text
  const siteUrl = site.site_url[0].text
  var uid = page._meta.uid
  var path = "/"
  if (page._meta.type == "blog_post") {
    path = "/insights/"
  }
  if (page._meta.type == "job") {
    path = "/job-opportunity/"
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
