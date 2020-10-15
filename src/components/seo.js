import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

function SEO({ site, page, lang, meta }) {
  var noIndex = "index"
  if (page.data.donotindex) {
    if (page.data.donotindex == true) {
      var noIndex = "noindex"
    }
  }
  var ogImage = ""
  if (page.data.main_image) {
    ogImage = page.data.main_image.url
  }
  if (page.podimage) {
    ogImage = page.podimage
  } else if (page.data.artwork_url) {
    ogImage = page.data.artwork_url
  }
  var metaDescription = ""
  if (page.type == "pa") {
    if (page.data.meta_description) {
      metaDescription = page.data.meta_description
    }
  }
  if (page.type == "blog_post") {
    if (page.data.meta_description) {
      metaDescription = page.data.meta_description
    } else {
      metaDescription = page.data.body[0].primary.text.text.replace(
        /<[^>]*>/g,
        ""
      )
      metaDescription = metaDescription.substring(0, 400) + "..."
    }
  }
  var twitterPlayer = ""
  if (page.data.audio_url) {
    var twitterCard = "summary_large_image"
    var twitterPlayer = {
      name: `twitter:player`,
      content: page.data.audio_url,
    }
  } else {
    var twitterCard = "summary_large_image"
  }

  if (page.desc) {
    metaDescription = page.desc
  }
  const appID = "3199073900141955"
  const title = page.data.meta_title || page.data.title.text || page.data.title
  const siteName = site.nodes[0].data.site_title.text
  const twitterAuthor = site.nodes[0].data.twitter_author.text
  const siteUrl = site.nodes[0].data.site_url.text
  var uid = page.uid
  var path = "/"
  if (page.type == "blog_post") {
    path = "/blog/"
  }
  if (page.type == "job") {
    path = "/job-opportunity/"
  }
  if (page.uid == "home") {
    uid = ""
    path = ""
  }
  if (page.data.webinar == true) {
    path = "/webinars/"
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
          property: `fb:app_id`,
          content: appID,
        },
        {
          property: `og:image`,
          content: ogImage,
        },
        {
          property: `og:description`,
          content: metaDescription,
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
          content: twitterCard,
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
