const linkResolver = doc => {
  // Route for blog posts
  if (doc.type === "blog_post") {
    return "/blog/" + doc.uid
  }
  if (doc.type === "pa") {
    return "/" + doc.uid
  }
  if (doc.type === "podcast") {
    return "/podcast/" + doc.uid
  }

  // Homepage route fallback
  return "/"
}
module.exports = linkResolver

