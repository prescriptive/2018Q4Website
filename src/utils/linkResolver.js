const linkResolver = doc => {
  // Route for blog posts
  console.log(doc)
  if (doc.type === "blog_post") {
    return "/blog/" + doc.uid
  }
  if (doc.type === "pa") {
    return "/" + doc.uid
  }
  // Homepage route fallback
  return "/"
}
module.exports = linkResolver
