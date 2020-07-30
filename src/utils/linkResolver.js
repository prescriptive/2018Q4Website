const linkResolver = doc => {
  // Route for blog posts
  if (doc.type === "blog_post") {
    return "/blog/" + doc.uid
  }
  // Homepage route fallback
  return "/"
}
module.exports = linkResolver
