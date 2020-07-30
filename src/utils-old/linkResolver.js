const linkResolver = doc => {
  // The "doc" object contains three things: lang, type and uid
  // The "dict" is an object that enables us to look up parts of the url, based on the type.
  // The "baseUrl" is the i18n root url.

  const baseUrl = "" // Is either empty string or 'en'

  let urlParts = ""

  switch (doc.type) {
    // Add a URL pattern for each doc.type that should result in a page.
    // E.g. if blog posts should be accessible on /blog
    case "pa":
      urlParts = `/${doc.uid}`
      break
    case "blog_post":
      urlParts = `/insights/${doc.uid}`
      break
    case "job":
      urlParts = `/job-opportunity/${doc.uid}`
      break
    default:
      urlParts = `/`
  }

  return urlParts
}

module.exports = { linkResolver }
