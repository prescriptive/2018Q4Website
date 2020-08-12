const linkResolver = doc => {
  // Route for blog posts
  console.log(doc)
  if (doc.type === "blog_post") {
    console.log("/blog/" + doc.uid)
    return "/blog/" + doc.uid
  }
  if (doc.type === "pa") {
    console.log("/" + doc.uid)
    return "/" + doc.uid
  }
  // Homepage route fallback
  return "/"
}
module.exports = linkResolver
